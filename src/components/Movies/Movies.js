import React, { useEffect, useState } from 'react';
import './Movies.css';
import { getMovies } from '../../services/getMovies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import withAdvertisement from '../withAdvertisement/withAdvertisement';
import  AdvImage1  from '../../assets/advertisements/large-promos/adv1.png';
import  AdvImage2  from '../../assets/advertisements/large-promos/adv-2.png';
import { formatCounter, getRandomItem, handleImageError } from '../../utils/common-utils';
import { ACTORS, LIKES, LOAD_MORE } from '../../constants/common-constants';
import { ADVERTISEMENT_IN, DESCRIPTION_COUNTER, RESUMES_IN, TITLE, VISIBLE_MOVIES_COUNTER } from '../../constants/movie-constants';
import Button from '../../common/Button/Button';
import Image from '../../common/Image/Image';

const Movies = React.memo(({ moviePageCounter, showImage, imageCounter, setMoviePageCounter }) => {
    console.log('COMPONENT :: Movies')
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState(VISIBLE_MOVIES_COUNTER); 
    const [totalMoviesLength, setTotalMoviesLength] = useState(0);
    const [likedMovies, setLikedMovies] = useState([]); 
    const [randomAdvertisementImage, setRandomAdvertisementImage] = useState('');

    /**
     * Handle Like click
     * @param {*} movieName 
     */
    const handleLikeClick = (movieName) => {
        const updatedMovies = [...movies];
        const movieToUpdate = updatedMovies.find(movie => movie.movie_name === movieName);
    
        if (movieToUpdate) {
            if (likedMovies.includes(movieName)) {
                movieToUpdate.movie_likes -= 1;
                setLikedMovies(likedMovies.filter(name => name !== movieName));
            } else {
                movieToUpdate.movie_likes += 1;
                setLikedMovies([...likedMovies, movieName]);
            }
            setMovies(updatedMovies);
        }
    };
    
    /**
     * Handle movie click
     * @param {*} movie 
     */
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setMoviePageCounter([DESCRIPTION_COUNTER]);      
    };

    useEffect(() => {
        setMoviePageCounter([DESCRIPTION_COUNTER]); 
        fetchMovies();
        const advertisementImages = [AdvImage1, AdvImage2];
        const adImage = getRandomItem(advertisementImages);
        setRandomAdvertisementImage(adImage);
    }, []);

    /**
     * Fetch movies from API
     */
    const fetchMovies = async () => {
        try {
            const response = await getMovies(visibleMovies);
            if (!response || !response.movies) {
                throw new Error('Movies not found in API response');
            }
            const { movies, totalLength } = response;
            setMovies(movies);
            setSelectedMovie(movies[0]);
            setTotalMoviesLength(totalLength);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    /**
     * Load more movies on click of Load more button
     */
    const loadMoreMovies = async () => {
        try {
            const { movies } = await getMovies(visibleMovies + VISIBLE_MOVIES_COUNTER); // Fetch additional movies
            setMovies(movies);
            setVisibleMovies(prevVisibleMovies => prevVisibleMovies + VISIBLE_MOVIES_COUNTER); // Increase the number of visible movies
        } catch (error) {
            console.error('Error loading more movies:', error);
        }
    };

    return (
        <div className='movies-list-section'>
            <section className='all-movies'>
                <p className='all-movies-title'>{TITLE}</p>
                <div className='movie-list'>
                    {movies.map((movie, index) => (
                        <div className='movie' key={index}>  
                            <Image  src={movie.movie_poster} alt={movie.movie_name} onError={handleImageError} onClick={() => handleMovieClick(movie)}/>
                            <div className='movie-details-container'>
                                <div className='movie-details'>
                                    <p data-testid='movie-name' className='movie-name'>{movie.movie_name}</p>
                                    <p className='movie-likes'>{movie.movie_likes} {LIKES}</p>
                                </div>
                                <Button  className={`thumbs-up-button ${likedMovies.includes(movie.movie_name) ? 'liked' : ''}`} onClick={() => handleLikeClick(movie.movie_name)} children={ <FontAwesomeIcon icon={faThumbsUp} />} />
                            </div>
                        </div>
                    ))}
                </div>
                {totalMoviesLength > visibleMovies && (<Button className='load-more-btn' onClick={loadMoreMovies} children={LOAD_MORE}></Button> )}

                
            </section>
            <section className='movies-description'>
                {(selectedMovie && !showImage[0] )&& (
                    <div className='selected-movie-details'>
                        <div className='selected-movie'>
                            <h2 className='selected-movie-name'>{selectedMovie.movie_name}</h2>
                            <Button data-testid='like-button'  className={`thumbs-up-button description ${likedMovies.includes(selectedMovie.movie_name) ? 'liked' : ''}`} onClick={() => handleLikeClick(selectedMovie.movie_name)} children={ <FontAwesomeIcon icon={faThumbsUp} />}  />
                        </div>
                        <p className='selected-movie-likes'>{selectedMovie.movie_likes} {LIKES}</p>
                        <Image className='selected-movie-poster' src={selectedMovie.movie_poster} alt={selectedMovie.movie_name} onError={handleImageError} />
                        <p className='selected-movie-description'>{selectedMovie.movie_description}</p>
                        <h2 className='actors-title'>{ACTORS}</h2>
                        <ul className='actors-list'>
                            {selectedMovie.movie_actors.map((actor, index) => (
                                <li className='actor' key={index}>{actor}</li>
                            ))}
                        </ul>
                     
                    </div>
                  
                )}
                <div className='notification'>
                    {showImage[0] ? (
                        <div className='ad-notify-container'>
                        <Image src={randomAdvertisementImage} alt='advertisement' className='advertisement' onError={handleImageError}/>
                        {imageCounter > 0 && <p>{RESUMES_IN} {formatCounter(imageCounter)}</p>}
                        </div>
                        ) : (
                        moviePageCounter > 0 && <p>{ADVERTISEMENT_IN} {formatCounter(moviePageCounter)}</p>
                        )}
                </div> 
            </section>
        </div>
    );
});
export default withAdvertisement(Movies, false);