import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import imgLogo from '../../assets/logo.png';
import "./Header.css";
import { LOGIN, LOGOUT, MENU_ITEMS, NOW_SHOWING } from '../../constants/common-constants';
import { handleImageError } from '../../utils/common-utils';
import { getUsername, handleLogout } from '../../utils/login-utils';
import { ROUTES } from '../../constants/route-constants';
import Image from '../../common/Image/Image';

const Header = () => {
  console.log('COMPONENT :: Header')

  const [username, setUsername] = useState('');

  useEffect(() => {
    const username = getUsername();
    setUsername(username);
  }, []);

 
  return (
    <section className='header'>            
        <Link to={ROUTES.HOME}>
          <Image src={imgLogo} className='app-logo' alt='cine-plex' onError={handleImageError} />
        </Link>
          <div className='header-options'>
            <div className='menu-items'>
            {MENU_ITEMS.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <NavLink 
                    to={item === 'ALL MOVIES' ? ROUTES.ALL_MOVIES : ROUTES.HOME}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    {item.toUpperCase()} 
                  </NavLink>                  
                </React.Fragment>
              );
            })}
                {username && <NavLink to={ROUTES.NOW_SHOWING} className={({ isActive }) => (isActive ? 'active' : '')}><p className='now-showing'>{NOW_SHOWING}</p></NavLink>}
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