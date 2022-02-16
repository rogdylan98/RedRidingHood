import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
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
          <div>
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
                    // placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                </label>
              </div>
            </div>
            <div className='login-password'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
          </div>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default LoginForm;
