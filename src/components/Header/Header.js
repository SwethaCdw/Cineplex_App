import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import imgLogo from '../../assets/logo.png';
import "./Header.css";
import { LOGIN, LOGOUT, MENU_ITEMS, NOW_SHOWING } from '../../constants/common-constants';
import { handleImageError } from '../../utils/common-utils';
import { setItemInLocalStorage } from '../../utils/local-storage-utils';
import { getUsername } from '../../utils/login-utils';
import { ROUTES } from '../../constants/route-constants';

const Header = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = getUsername();
    setUsername(username);
  }, []);

  const handleLogout = () => {
    setItemInLocalStorage('username', '');
    navigate(ROUTES.LOGIN);

  }
  return (
    <section className='header'>            
        <Link to={ROUTES.HOME}>
          <img src={imgLogo} className='app-logo' onError={handleImageError} alt='cine-plex'></img>
        </Link>
          <div className='header-options'>
            <div className='menu-items'>
                {MENU_ITEMS.map((item) => {
                      return (
                        <>
                          <NavLink 
                            to={item === 'ALL MOVIES' ? ROUTES.ALL_MOVIES : ROUTES.HOME}
                          >
                            {item.toUpperCase()}
                          </NavLink>                  
                        </>
                      );
                })}
                {username && <Link to={ROUTES.NOW_SHOWING}><p className='now-showing'>{NOW_SHOWING}</p></Link>}
            </div>
            {
              username?.length ? (
                <p className='profile-user'>
                  {username} | <Link to={ROUTES.LOGIN}><span onClick={handleLogout}>{LOGOUT}</span></Link>
                </p>
              ) : (
                <p className='profile-user'>
                  <Link to={ROUTES.LOGIN}>{LOGIN}</Link>
                </p>
              )
            }
          </div> 
        
    </section>
  )
}

export default Header;