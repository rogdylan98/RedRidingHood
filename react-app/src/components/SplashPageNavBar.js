
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './SplashPageNavbar.css'

const SplashPageNavBar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='website-name-container'>
          <h2 className='website-name'>Red Riding Hood</h2>
        </div>
        <div className='login-signup-container'>
          <NavLink className='login-navlink' to='/login' exact={true} activeClassName='active'>
            <span className='login-span'>Log In</span>
          </NavLink>
          <NavLink className='signup-navlink' to='/signup' exact={true} activeClassName='active'>
            <span className='signup-span'>Sign Up</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default SplashPageNavBar;
