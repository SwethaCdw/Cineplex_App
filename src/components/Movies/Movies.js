import React, { useEffect, useState } from 'react';
import './Movies.css';
import { getMovies } from '../../services/getMovies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import withAdvertisement from '../withAdvertisement/withAdvertisement';
import AdvImage from '../../assets/advertisements/large-promos/adv-2.png';


const Movies = ({ moviePageCounter, showImage, imageCounter, setMoviePageCounter }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState(6); 
    const [totalMoviesLength, setTotalMoviesLength] = useState(0);
    const [likedMovies, setLikedMovies] = useState([]); 

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
    
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    useEffect(() => {
        setMoviePageCounter(5); 
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const { movies, totalLength } = await getMovies(visibleMovies); // Fetch initial set of movies
            setMovies(movies);
            setSelectedMovie(movies[0]);
            setTotalMoviesLength(totalLength);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const loadMoreMovies = async () => {
        try {
            const { movies } = await getMovies(visibleMovies + 6); // Fetch additional movies
            setMovies(movies);
            setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 6); // Increase the number of visible movies
        } catch (error) {
            console.error('Error loading more movies:', error);
        }
    };

    return (
        <div className='movies-list-section'>
            <section className='all-movies'>
                <p className='all-movies-title'>All Movies</p>
                <div className='movie-list'>
                    {movies.map((movie, index) => (
                        <div className='movie' key={index}>  
                            <img src={movie.movie_poster} alt={movie.movie_name} onClick={() => handleMovieClick(movie)}/>
                            <div className='movie-details-container'>
                                <div className='movie-details'>
                                    <p className='movie-name'>{movie.movie_name}</p>
                                    <p className='movie-likes'>{movie.movie_likes} likes</p>
                                </div>
                                <button className={`thumbs-up-button ${likedMovies.includes(movie.movie_name) ? 'liked' : ''}`} onClick={() => handleLikeClick(movie.movie_name)}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {totalMoviesLength > visibleMovies && (<button className='load-more-btn' onClick={loadMoreMovies}>
                    LOAD MORE
                </button>)}
                
            </section>
            <section className='movies-description'>
                {(selectedMovie && !showImage )&& (
                    <div className='selected-movie-details'>
                        <div className='selected-movie'>
                            <h2 className='selected-movie-name'>{selectedMovie.movie_name}</h2>
                            <button className={`thumbs-up-button ${likedMovies.includes(selectedMovie.movie_name) ? 'liked' : ''}`} onClick={() => handleLikeClick(selectedMovie.movie_name)}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                            </button>
                        </div>
                        <p className='selected-movie-likes'>{selectedMovie.movie_likes} likes</p>
                        <img className='selected-movie-poster' src={selectedMovie.movie_poster} alt={selectedMovie.movie_name} />
                        <p className='selected-movie-description'>{selectedMovie.movie_description}</p>
                        <h2 className='actors-title'>Actors</h2>
                        <ul className='actors-list'>
                            {selectedMovie.movie_actors.map((actor, index) => (
                                <li className='actor' key={index}>{actor}</li>
                            ))}
                        </ul>
                     
                    </div>
                  
                )}
                <div className='notification'>
                    {showImage ? (
                        <div>
                        <img src={AdvImage} alt='advertisement' className='advertisement'/>
                        {imageCounter > 0 && <p>Resumes in {imageCounter}</p>}
                        </div>
                        ) : (
                        moviePageCounter > 0 && <p>Advertisement in {moviePageCounter}</p>
                        )}
                </div> 
            </section>
        </div>
    );
};
export default withAdvertisement(Movies);