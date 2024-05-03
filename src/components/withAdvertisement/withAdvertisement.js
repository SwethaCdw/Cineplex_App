
import React, { useState, useEffect } from 'react';
import { getShortTeasers } from '../../services/getShortTeasers';

const withAdvertisement = (WrappedComponent, isShortTeasers) => {
  return () => {
    const [moviePageCounter, setMoviePageCounter] = useState(isShortTeasers ? Array.from({ length: getShortTeasers.teasers.length }, () => null) : [null]);
    const [showImage, setShowImage] = useState(isShortTeasers ? Array.from({ length: getShortTeasers.teasers.length }, () => false) : [false]);
    const [imageCounter, setImageCounter] = useState(isShortTeasers ? Array.from({ length: getShortTeasers.teasers.length }, () => 2) : [null]);

    useEffect(() => { 
      const countdownIntervals = moviePageCounter?.map((counter, i) => {
          if (counter > 0) {
              return setInterval(() => {
                  setMoviePageCounter(prevCounter => {
                      const updatedCounter = [...prevCounter];
                      updatedCounter[i] = Math.max(0, updatedCounter[i] - 1); // Decrease counter by 1, but ensure it doesn't go below 0
                      if (updatedCounter[i] === 0) {
                        setShowImage(prevShowImage => {
                            const updatedShowImage = [...prevShowImage];
                            updatedShowImage[i] = true; // Set showImage to true for the corresponding index
                            return updatedShowImage;
                        });
                      if(!isShortTeasers) {
                        setImageCounter([2]);
                      }
                    }
                      return updatedCounter;
                  });
              }, 1000);
          }
          return null; // If counter is already 0, return null for this index
      });

  
      return () => {
          // Clear all countdown intervals when component unmounts or when moviePageCounter changes
          countdownIntervals.forEach(interval => clearInterval(interval));
      };
  }, [moviePageCounter]);

  useEffect(() => {
    const imageCountdownIntervals = showImage.map((isImageShown, i) => {
        if (isImageShown) {
            return setInterval(() => {
                setImageCounter(prevImageCounter => {
                    const updatedImageCounter = [...prevImageCounter];
                    updatedImageCounter[i] = Math.max(0, updatedImageCounter[i] - 1); // Decrease counter by 1, but ensure it doesn't go below 0
                    if (updatedImageCounter[i] === 0) {
                      setShowImage(prevShowImage => {
                          const updatedShowImage = [...prevShowImage];
                          updatedShowImage[i] = false; // Set showImage to true for the corresponding index
                          return updatedShowImage;
                      });
                  }
                    return updatedImageCounter;
                });
            }, 1000);
        }
        return null; // If image is not shown, return null for this index
    });

    return () => {
        // Clear all countdown intervals for image counter when component unmounts or when showImage changes
        imageCountdownIntervals.forEach(interval => clearInterval(interval));
    };
}, [showImage, imageCounter]);

    return (
      <WrappedComponent
        moviePageCounter={moviePageCounter}
        setMoviePageCounter={setMoviePageCounter}
        showImage={showImage}
        imageCounter={imageCounter}
      />
    );
  };
};

export default withAdvertisement;
