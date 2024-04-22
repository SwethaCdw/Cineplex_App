import React, { useEffect, useState } from "react"; 
import './ShortTeasers.css';
import { getShortTeasers } from "../../services/getMovies";
import withVideoControls from "../withVideoControls/withVideoControls";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Advertisement from '../../assets/advertisements/small-promos/AdvertisementSmall1.png';


const ShortTeasers = ({ videoRefs, showControls, handlePlay, showAd}) => {

    const [playClicked, setPlayClicked] = useState(false);
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        let intervalId;
        if (playClicked && counter > 0) {
            intervalId = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId); // Clean up the interval when component unmounts or when playClicked is false
    }, [playClicked, counter]);

    const handlePlayerPause =() => {
        console.log('player is paused')
    }

    return ( 
        <section className="short-teasers-section">
            <h1>Short Teasers</h1>
            <div className="videos-container">
                {getShortTeasers.teasers.map((teaser, index) => (
                    <div key={index}>
                         {!showAd[index] && <VideoPlayer
                            ref={(el) => videoRefs.current[index] = el}
                            src={teaser.video_link}
                            onClick={() => {
                                handlePlay(index);
                                setPlayClicked(true);
                            }}

                            onPause={handlePlayerPause}
                            controls={showControls[index]}
                            className="video-player"
                        />}
                        {showAd[index] && <img src={Advertisement} alt="Advertisement" className="advertisement" />}
                        {playClicked && !showAd[index] && <p>Advertisement in {counter}</p>}
                        <h2>{teaser.title}</h2>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default withVideoControls(ShortTeasers);