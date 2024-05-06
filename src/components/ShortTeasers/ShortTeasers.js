
import React, { useRef, useState, useEffect } from "react";
import './ShortTeasers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import withAdvertisement from '../withAdvertisement/withAdvertisement';
import AdvImage from '../../assets/advertisements/small-promos/AdvertisementSmall1.png';
import { ADVERTISEMENT_IN, SHORT_TEASERS, TEASER_COUNTER, VIDEO_RESUMES_IN } from "../../constants/movie-constants";
import Image from "../../common/Image/Image";
import { formatCounter, handleImageError } from "../../utils/common-utils";


const ShortTeasers = ({ moviePageCounter, setMoviePageCounter, showImage, imageCounter }) => {
    console.log('COMPONENT :: Short teasers')
    const [teasers, setTeasers] = useState([]);
    const [showControls, setShowControls] = useState([]);
    const videoRefs = useRef([]);

    /**
     * Fetch Teasers from json
     */
    useEffect(() => {
      const fetchTeasers = async () => {
        try {
          const response = await fetch('/resources/shortTeasers.json'); 
          const data = await response.json();
          setTeasers(data.teasers);

          if(data.teasers) {
            setShowControls(Array(teasers.length).fill(false))
            videoRefs.current = Array(teasers.length).fill(null)
          }
        } catch (error) {
          console.error('Error fetching short teasers:', error);
        }
      };
  
      fetchTeasers();
    }, [teasers.length]);


    /**
     * Handle click on play button
     * @param {*} index 
     */
    const handlePlayClick = (index) => {
        //Update show controls
        setShowControls(prevControls => prevControls.map((control, i) => i === index ? true : control));
        setMoviePageCounter(prevCounter => {
            const updatedCounter = [...prevCounter];
            updatedCounter[index] = TEASER_COUNTER;
            return updatedCounter;
        });        
        videoRefs.current[index].play();
    };

    /**
     * Handle Video pause click
     * @param {*} index 
     */
    const handlePauseClick = (index) => {
        const video = videoRefs.current[index];
        if (!video.paused) {
            video.pause();
            setShowControls(prevControls => prevControls.map((control, i) => i === index ? false : control));
        } 
    };

    /**
     * Handle when video ends
     * @param {*} index 
     */
    const handleVideoEnded = (index) => {
        setShowControls(prevControls => prevControls.map((control, i) => i === index ? false : control));

    };

    /**
     * Pause the video when Ad is shown
     */
    useEffect(() => {
        if (showImage) {
            videoRefs.current.forEach((video, index) => {
                if (!video.paused) {
                    video.pause();
                }
            });
        }
    }, [showImage]);

    /**
     * Play after the Ad is shown
     */
    useEffect(() => {
        imageCounter.forEach((counter, index) => {
            if (counter === 0 && showControls[index]) {
                if (videoRefs.current[index] && videoRefs.current[index].paused) {
                        videoRefs.current[index].play();
                }
            }
        });
    }, [imageCounter, showImage, showControls]);

    return ( 
        <section className="short-teasers-section">
            <h1 className='short-teasers-heading' data-testid="short-teasers-title">{SHORT_TEASERS}</h1>
            <div className="videos-container">
                {teasers.map((teaser, index) => (
                    <div key={index} className="video-wrapper">
                       <>
                            <div className="video-overlay" style={{ display: showControls[index]  ? 'none' : 'flex' }}>
                                <FontAwesomeIcon data-testid='play-button' icon={faPlay} className="play-icon" onClick={() => handlePlayClick(index)} />
                            </div>
                            <video
                                ref={el => videoRefs.current[index] = el}
                                src={teaser.video_link}
                                className="video-player"
                                controls={showControls[index]}
                                onClick={() => handlePauseClick(index)}
                                onEnded={() => handleVideoEnded(index)}
                                data-testid='video'
                            />
                            <h2>{teaser.title}</h2> 
                        </>
                        <div className='notification'>
                            {(showControls[index] === true && showImage[index]) ? (
                            <div>
                                <Image src={AdvImage} alt='advertisement' className='advertisement' onError={handleImageError}/>
                                {imageCounter[index] > 0 && <p>{VIDEO_RESUMES_IN} {formatCounter(imageCounter[index])}</p>}
                            </div>
                            ) : ( (showControls[index] === true &&
                            moviePageCounter[index] > 0) && <p>{ADVERTISEMENT_IN} {formatCounter(moviePageCounter[index])}</p>
                            )}
                        </div> 
                    </div>
                ))}
            </div>
        </section>
    );
}

export default withAdvertisement(ShortTeasers, true); 

