import React from 'react';
import "./NowShowing.css";
import Header from '../../components/Header/Header';
import { NOW_SHOWING_TITLE, TRAILERS_DESCRIPTION, TRAILERS_NAME, TRAILER_VIDEO_URL } from '../../constants/common-constants';

const NowShowing = () => {
  console.log('COMPONENT :: Now Showing')

  return (
    <>
        <Header/>
        <div className='now-showing-container'>
            <h2 className='now-showing-title'>{NOW_SHOWING_TITLE}</h2>
            <h1 className='sintel-title'>{TRAILERS_NAME}</h1>
            <video 
                className="video-player"
                src={TRAILER_VIDEO_URL}
                controls
                ></video>
            <p className='sintel-description'>
              {TRAILERS_DESCRIPTION}
            </p>
        </div>
    </>
  )
}

export default NowShowing;