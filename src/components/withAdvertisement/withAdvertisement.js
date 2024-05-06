
import React, { useState, useEffect } from 'react';

const withAdvertisement = (WrappedComponent, isShortTeasers) => {
  return () => {
    const [teasers, setTeasers] = useState([]);
    const [moviePageCounter, setMoviePageCounter] = useState(isShortTeasers ? [] : [null]);
    const [showImage, setShowImage] = useState(isShortTeasers ? [] : [false]);
    const [imageCounter, setImageCounter] = useState(isShortTeasers ? []: [null]);
    useEffect(() => {
      const fetchTeasers = async () => {
        try {
          const response = await fetch('/resources/shortTeasers.json'); 
          const data = await response.json();
          setTeasers(data.teasers);

          if(data.teasers) {
            if(isShortTeasers) {
              setMoviePageCounter(Array.from({ length: data.teasers.length }, () => null));
              setShowImage(Array.from({ length: data.teasers.length }, () => false));
              setImageCounter(Array.from({ length: data.teasers.length }, () => 2) );
            } else {
              setMoviePageCounter([null]);
              setShowImage([false]);
              setImageCounter([null]);
            }
          }
        } catch (error) {
          console.error('Error fetching short teasers:', error);
        }
      };
  
      fetchTeasers();
    }, [teasers.length]);

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
