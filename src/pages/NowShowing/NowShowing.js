import React from 'react';
import "./NowShowing.css";
import Header from '../../components/Header/Header';
const NowShowing = () => {
  return (
    <>
        <Header/>
        <div className='now-showing-container'>
            <h2 className='now-showing-title'>Now Showing</h2>
            <h1 className='sintel-title'>Sintel</h1>
            <video 
                className="video-player"
                src='https://tympanus.net/Development/SeatPreview/media/sintel.mp4'
                controls
                ></video>
            <p className='sintel-description'>
                Sintel tells the story of a friendship between a girl named Sintel, a baby dragon and the desperate lengths she will go to when that friendship is taken from her
                Sintel is created by Blender in 2010 as a pet project to demonstrate Blender capabilities.
            </p>
        </div>
    </>
  )
}

export default NowShowing;