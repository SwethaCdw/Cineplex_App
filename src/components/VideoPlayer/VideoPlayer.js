import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const VideoPlayer = React.forwardRef(({ src, onClick, controls, className, onPause }, ref) => {
    return (
        <div className="video-container">
            <video
                ref={ref}
                src={src}
                onClick={onClick}
                onPause={onPause}
                controls={controls}
                className={className}
            />
            {!controls && (
                <div className="play-button" onClick={onClick}>
                    <FontAwesomeIcon icon={faPlay} />
                </div>
            )}
        </div>
    );
});

export default VideoPlayer;