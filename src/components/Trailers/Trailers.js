import React, { useEffect, useState } from "react"; 
import './Trailers.css';
import TrailerImage from '../../assets/background.png';
import { handleImageError } from "../../utils/common-utils";
import { Link, useNavigate } from "react-router-dom";
import { getUsername } from "../../utils/login-utils";
import { ROUTES } from "../../constants/route-constants";
import { TRAILERS_DESCRIPTION, TRAILERS_HEADING, TRAILERS_NAME, TRAILERS_NOTIFICATION, TRAILERS_SIGN_IN, WATCH_NOW } from "../../constants/common-constants";

const Trailers = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const name = getUsername();
        setUsername(name);
    }, [])
  
    const handleClick = () => {
        username?.length ? navigate(ROUTES.NOW_SHOWING) : navigate(ROUTES.LOGIN);
    };

    return ( 
        <section className="trailers">
        <h1 className="title">{TRAILERS_HEADING}</h1>
        <p className="caption">{TRAILERS_NOTIFICATION}<Link to={ROUTES.LOGIN}>{TRAILERS_SIGN_IN}</Link></p>
        <div className="trailer-section">
            <img className="trailer-image" src={TrailerImage} onError={handleImageError} alt="trailer"/>
            <div className="description">
                <p className="title">{TRAILERS_NAME}</p>
                <p className="description-caption">{TRAILERS_DESCRIPTION}</p>
                <button className="watch-button" onClick={handleClick}> {WATCH_NOW} </button>
            </div>

        </div>
        </section>
    );
}
 
export default Trailers;