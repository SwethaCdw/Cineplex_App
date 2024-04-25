
import React, { useState, useEffect } from 'react';

const withAdvertisement = (WrappedComponent) => {
  return () => {
    const [moviePageCounter, setMoviePageCounter] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [imageCounter, setImageCounter] = useState(null);

    useEffect(() => {
      setImageCounter(2);
      const countdown = setInterval(() => {
        if (moviePageCounter > 0) {
          setMoviePageCounter(moviePageCounter - 1);
        }
      }, 1000);

      if (moviePageCounter === 0) {
            setShowImage(true);
            clearTimeout(countdown);
        }

      return () => clearInterval(countdown);
    }, [moviePageCounter]);

    useEffect(() => {
      if (showImage) {
        const imageCountdown = setTimeout(() => {
          if (imageCounter > 0) {
            setImageCounter(imageCounter - 1);
          }
        }, 1000);

        if (imageCounter === 0) {
          setShowImage(false);
          clearTimeout(imageCountdown);
        }

        return () => clearTimeout(imageCountdown);
      }
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