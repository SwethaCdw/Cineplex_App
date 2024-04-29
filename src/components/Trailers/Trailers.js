import React, { useEffect, useState } from "react"; 
import './Trailers.css';
import TrailerImage from '../../assets/background.png';
import { handleImageError } from "../../utils/common-utils";
import { getItemFromLocalStorage } from "../../utils/local-storage-utils";
import { useNavigate } from "react-router-dom";

const Trailers = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = getItemFromLocalStorage('loggedIn');
        setIsLoggedIn(loggedIn);

    }, [])
  
    const handleClick = () => {
        console.log(isLoggedIn);
      if (isLoggedIn) {
        navigate('/now-watching');
      } else {
        console.log('login')
        navigate('/login');
      }
    };

    return ( 
        <section className="trailers">
        <h1 className="title">Trailers</h1>
        <p className="caption">You need to sign in to view Trailers. <a href="#">Sign In Now</a></p>
        <div className="trailer-section">
            <img className="trailer-image" src={TrailerImage} onError={handleImageError} alt="trailer"/>
            <div className="description">
                <p className="title">Sintel</p>
                <p className="description-caption"> Sintel tells the story of a friendship between a girl named Sintel, a baby dragon and the desperate lengths she will go to when that friendship is taken from her
                    Sintel is created by Blender in 2010 as a pet project to demonstrate Blender capabilities.
                </p>
                <button className="watch-button" onClick={handleClick}> WATCH NOW </button>
            </div>

        </div>
        </section>
    );
}
 
export default Trailers;