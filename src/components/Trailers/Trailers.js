import React from "react"; 
import './Trailers.css';
import TrailerImage from '../../assets/background.png';
import { handleImageError } from "../../utils/common-utils";

const Trailers = () => {
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
                <button className="watch-button"> WATCH NOW </button>
            </div>

        </div>
        </section>
    );
}
 
export default Trailers;