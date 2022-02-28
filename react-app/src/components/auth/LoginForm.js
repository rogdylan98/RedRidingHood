import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    const demo_email = "demo@aa.io"
    const demo_password = "password"
    const data = await dispatch(login(demo_email, demo_password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className='login-container'>
      <div className='login-image-container'>
        <img className='login-img' src='https://cdn.robinhood.com/assets/generated_assets/web-bundle-lazy-route-prod-experiment/member/632fcb3e7ed928b2a960f3e003d10b44.jpg' alt='login-img' />
      </div>
      <div className='login-form-container'>
          <form className='login-form' onSubmit={onLogin}>
          <header className='form-header'>
            <span className='login-header-span'>Log in to Red Riding Hood</span>
          </header>
          <div className="error-div">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='login-email-password'>
            <div className='login-email-container'>
              <div className='email-label-input-container'>
                <label className='login-email-label' htmlFor='email'>
                <div>
                  <span className='login-email-span'>Email</span>
                </div>
                <div className='login-email-input-container'>
                  <input className='login-email-input'
                    name='email'
                    type='text'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                </label>
              </div>
            </div>
            <div className='login-email-container'>
              <div className='email-label-input-container'>
                <label className='login-email-label' htmlFor='email'>
                <div>
                  <span className='login-email-span'>Password</span>
                </div>
                <div className='login-email-input-container'>
                  <input className='login-email-input'
                    name='password'
                    type='password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
                </label>
              </div>
            </div>
            <footer className='login-footer'>
              <div className='footer-buttons'>
                <div>
                  <button className='login-submit' type='submit'>
                    <span className='login-form-span'>Log In</span>
                  </button>
                </div>
                <div>
                  <button onClick={handleDemo} className='demo-login-button' >
                      <span className='login-form-span'>Demo Log In</span>
                  </button>
                </div>
              </div>
              <div className='login-signup-navlink-container'>
                  <span className='no-account'>No goodies for Grandma?</span>
                  <NavLink className='login-signup-navlink' to='/signup'>
                    <span className='login-signup-span'>Create an account</span>
                  </NavLink>
              </div>
            </footer>
          </div>
        </form>
      </div>
    </div>

  );
};

export default LoginForm;
