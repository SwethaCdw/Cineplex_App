import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import imgLogo from '../../assets/logo.png';
import "./Header.css";
import { MENU_ITEMS } from '../../constants/constants';
import { handleImageError } from '../../utils/common-utils';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils/local-storage-utils';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const loggedIn = getItemFromLocalStorage('loggedIn');
    setIsLoggedIn(loggedIn);
    console.log(loggedIn);
    const profileUser = getItemFromLocalStorage('username');
    setUsername(profileUser);
  }, []);

  const handleLogout = () => {
    setItemInLocalStorage('loggedIn', 'false');
    setItemInLocalStorage('username', '');

  }
  return (
    <section className='header'>            
        <Link to="/">
          <img src={imgLogo} className='app-logo' onError={handleImageError} alt='cineplex'></img>
        </Link>
          <div className='header-options'>
            <div className='menu-items'>
                {MENU_ITEMS.map((item) => {
                      return (
                        <>
                          <NavLink 
                            to={item === 'ALL MOVIES' ? '/all-movies' : '/'}
                          >
                            {item.toUpperCase()}
                          </NavLink>                  
                        </>
                      );
                })}
                {isLoggedIn === true && <p>Now Showing</p>}
            </div>
            {
              isLoggedIn === true ? (
                <p className='profile-user'>
                {username} | <Link to='/login'><span onClick={handleLogout}>Logout</span></Link>
              </p>
              ) : (
                 <p className='profile-user'>
                 <Link to='/login'>LOGIN</Link>
               </p>
              )
            }
          </div> 
        
    </section>
  )
}

export default Header;