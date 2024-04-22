import React from 'react';
import { Link } from 'react-router-dom';
import imgLogo from '../../assets/logo.png';
import "./Header.css";
import { MENU_ITEMS } from '../../constants/constants';
import { handleImageError } from '../../utils/common-utils';

const Header = () => {
  return (
    <section className='header'>            
        <Link to="/">
          <img src={imgLogo} className='app-logo' onError={handleImageError} alt='cineplex'></img>
        </Link>
        <ul>
        {MENU_ITEMS.map((item) => {
                return (
                    <li key={item}>{item.toUpperCase()}</li>
                );
            })} 
        </ul>
        <p className='profile-user'>LOGIN</p>
        
    </section>
  )
}

export default Header;