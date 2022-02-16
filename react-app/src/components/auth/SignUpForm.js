import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'
const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, name));
      if (data) {
        setErrors(data)
      }
    }
  };
  const updateName = (e) => {
    setName(e.target.value)
  }
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
    <div className='main-container-signup'>
      <div className='left-half-container-signup'>
          <div className='left-half-text-div'>
            <div className='signup-logo'>
              <span className='signup-logo-span'>Red Riding Hood</span>
            </div>
            <div className='money-moves-container'>
              <div>
                <span className='money-moves-span'>Make your Money Move</span>
              </div>
              <div className='commission-free-container-space'>
                <div className='commission-free-container'>
                  <span className='commission-free'>Red Riding Hood lets you invest in companies you love, commission-free.</span>
                </div>
              </div>
            </div>
            <div className='form-fields-container'>
              <div className='errors-signup'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className='legal-name-warning-container'>
                  <span className='legal-name-warning'>Please enter your full legal name. Your legal name should match any form of government ID.</span>
              </div>
              <div className='signup-form-label-container'>
                <label className='signup-label'>
                  <div>
                    <input className='signup-input'
                      type='text'
                      name='username'
                      placeholder='Full Legal Name'
                      onChange={updateName}
                      value={name}
                    ></input>
                  </div>
                </label>
              </div>
              <div className='signup-form-label-container'>
                <label className='signup-label'>
                  <input className='signup-input'
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={updateUsername}
                    value={username}
                  ></input>
                </label>
              </div>
              <div className='signup-form-label-container'>
                <label className='signup-label'>
                  <input className='signup-input'
                    type='text'
                    name='email'
                    placeholder='Email address'
                    onChange={updateEmail}
                    value={email}
                  ></input>
                </label>
              </div>
              <div className='signup-form-label-container'>
                <label className='signup-label'>
                  <input className='signup-input'
                    type='password'
                    name='password'
                    placeholder='Password (min 8 characters)'
                    onChange={updatePassword}
                    value={password}
                  ></input>
                </label>
              </div>
              <div className='signup-form-label-container'>
                <label className='signup-label'>
                  <input className='signup-input'
                    type='password'
                    name='repeat_password'
                    placeholder='Confirm your password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                  ></input>
                </label>
              </div>
              <div className='signup-button-container'>
                <button className='signup-button' type='submit'>
                  <span className='signup-button-span'> Continue</span>
                </button>
              </div>
          </div>
          </div>
        </div>
      <div>

      </div>
    </div>
  </form>


  );
};

export default SignUpForm;
