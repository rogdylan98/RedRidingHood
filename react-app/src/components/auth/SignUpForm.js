import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
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
    setErrors([])
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, name));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['password: Passwords must match'])
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
    <div className='test'>
    <div className='main-container-signup'>
      <div className='left-half-container-signup'>
          <div className='left-half-text-div'>
            <div className='signup-logo'>
              <NavLink className='signup-logo-span' to='/'> Red Riding Hood</NavLink>
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
                  <span key={ind} className="error-div">{error}</span>
                ))}
              </div>
              <div className='legal-name-warning-container'>
                  <span className='legal-name-warning'>Please enter your name so Red Riding Hood can deliver you goodies.</span>
              </div>
              <div className='signup-form-label-container'>
                <label className='signup-label'>
                  <div>
                    <input className='signup-input'
                      type='text'
                      name='username'
                      placeholder='Your Name'
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
                    placeholder='Username (6-12 characters)'
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
      <div className='signup-right-side-container'>
        <div className='signup-right-text-container'>
            <div className='right-trading'>
                <span className='right-title-span'>Commission-free trading</span>
            </div>
            <div>
              <span className='right-text-span'>Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. Other fees may apply.</span>
            </div>
            <div className='account-protection-container'>
                <span className='right-title-span'>Account Protection</span>
            </div>
            <div>
              <span className='right-text-span'>No wolfs around here! Red Riding Hood Financial is a member of SIPC. Securities in your account protected up to $500,000. For details, please see www.sipc.org.</span>
              {/* <a className='sipc' href='www.sipc.org'>www.sipc.org</a> */}
              {/* <span>www.sipc.org.</span> */}
            </div>
            <div className='account-protection-container'>
                <span className='right-title-span'>Stay on top of your portfolio</span>
            </div>
            <div>
              <span className='right-text-span'>Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</span>
            </div>
        </div>

      </div>
    </div>
    </div>
  </form>


  );
};

export default SignUpForm;
