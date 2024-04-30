
import React, { useRef, useState, useEffect } from "react";
import './ShortTeasers.css';
import { getShortTeasers } from "../../services/getShortTeasers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import withAdvertisement from '../withAdvertisement/withAdvertisement';
import AdvImage from '../../assets/advertisements/small-promos/AdvertisementSmall1.png';
import { ADVERTISEMENT_IN, MOVIE_COUNTER, SHORT_TEASERS, VIDEO_RESUMES_IN } from "../../constants/movie-constants";


const ShortTeasers = ({ moviePageCounter, setMoviePageCounter, showImage, imageCounter }) => {
    const [showControls, setShowControls] = useState(Array(getShortTeasers.teasers.length).fill(false));
    const videoRefs = useRef(Array(getShortTeasers.teasers.length).fill(null));

    const handlePlayClick = (index) => {
        //Update show controls
        setShowControls(prevControls => prevControls.map((control, i) => i === index ? true : control));
        setMoviePageCounter(MOVIE_COUNTER); 
        videoRefs.current[index].play();
    };

    const handlePauseClick = (index) => {
        const video = videoRefs.current[index];
        if (!video.paused) {
            video.pause();
            //Update show controls
            setShowControls(prevControls => prevControls.map((control, i) => i === index ? false : control));

        } 
    };

    const handleVideoEnded = (index) => {
        //Update show controls on video end
        setShowControls(prevControls => prevControls.map((control, i) => i === index ? false : control));

    };

    useEffect(() => {
        if (showImage) {
            videoRefs.current.forEach(video => {
                if (!video.paused) {
                    video.pause();
                    setTimeout(() => {
                        video.play();
                    }, 2000);                
                }
            });
        } 
    }, [showImage]);

    return ( 
        <section className="short-teasers-section">
            <h1 className='short-teasers-heading'>{SHORT_TEASERS}</h1>
            <div className="videos-container">
                {getShortTeasers.teasers.map((teaser, index) => (
                    <div key={index} className="video-wrapper">
                       <>
                            <div className="video-overlay" style={{ display: showControls[index]  ? 'none' : 'flex' }}>
                                <FontAwesomeIcon icon={faPlay} className="play-icon" onClick={() => handlePlayClick(index)} />
                            </div>
                            <video
                                ref={el => videoRefs.current[index] = el}
                                src={teaser.video_link}
                                className="video-player"
                                controls={showControls[index]}
                                onClick={() => handlePauseClick(index)}
                                onEnded={() => handleVideoEnded(index)}
                            />
                            <h2>{teaser.title}</h2> 
                        </>
                        <div className='notification'>
                            {(showControls[index] === true && showImage) ? (
                            <div>
                                <img src={AdvImage} alt='advertisement' className='advertisement'/>
                                {imageCounter > 0 && <p>{VIDEO_RESUMES_IN} {imageCounter}</p>}
                            </div>
                            ) : ( (showControls[index] === true &&
                            moviePageCounter > 0) && <p>{ADVERTISEMENT_IN} {moviePageCounter}</p>
                            )}
                        </div> 
                    </div>
                ))}
            </div>
        </section>
    );
}

export default withAdvertisement(ShortTeasers); 
