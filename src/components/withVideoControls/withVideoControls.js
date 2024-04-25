import React, { useRef, useState } from "react";

const withVideoControls = (WrappedComponent) => {

    return () => {
        const [showAd, setShowAd] = useState([]);
        const videoRefs = useRef([]);
        const [showControls, setShowControls] = useState([]);

        const handlePlay = (index) => {
            const video = videoRefs.current[index];
            if (video.paused) {
                video.play();
                setShowControls((prev) => ({ ...prev, [index]: true }));
                setTimeout(() => {
                    setShowAd((prev) => ({ ...prev, [index]: true }));
                }, 5000);
            } else {
                video.pause();
                setShowControls((prev) => ({ ...prev, [index]: false }));
                setShowAd((prev) => ({ ...prev, [index]: false }));
            }
        };

        return (
            <WrappedComponent
                videoRefs={videoRefs}
                showControls={showControls}
                handlePlay={handlePlay}
                showAd={showAd}
            />
        );
    };
};

export default withVideoControls;