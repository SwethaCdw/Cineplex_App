import React, { useState, useEffect } from "react";

const withAdvertisement = (WrappedComponent) => {
    return () => {
        const [showAd, setShowAd] = useState(false);

        useEffect(() => {
            console.log('With Advertisment',showAd);
            let adTimeout;
            if (showAd) {
                adTimeout = setTimeout(() => {
                    setShowAd(false);
                }, 2000); // Show advertisement for 2 seconds
            }
            return () => clearTimeout(adTimeout);
        }, [showAd]);

        return (
            <WrappedComponent
                showAd={showAd}
            />
        );
    };
};

export default withAdvertisement;