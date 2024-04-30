import React, { useState } from 'react';
import "./Login.css";
import { setItemInLocalStorage } from '../../utils/local-storage-utils';
import { useNavigate } from 'react-router-dom';
import { LOGIN_BUTTON, LOGIN_DESCRIPTION, LOGIN_TITLE, PASSWORD, USERNAME, USERNAME_TITLE } from '../../constants/login-constants';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      setItemInLocalStorage('username', username);
      setUsername('');
      setPassword('');
      setError('');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };


  return (
     <div className='login-container'>
      <form class="login-form" onSubmit={handleSubmit}>
        <h2>{LOGIN_TITLE}</h2>
        <p>{LOGIN_DESCRIPTION}</p>
        <div class="input-floating-label">
          <input 
            className="input" 
            type="text" 
            id="input" 
            name="input" 
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <label for="input">{USERNAME_TITLE}</label>
          <span class="focus-bg"></span>
        </div>
        <div class="input-floating-label">
          <input 
            className="input" 
            type="password" 
            id="input" 
            name="input" 
            placeholder="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <label for="input">{PASSWORD}</label>
          <span class="focus-bg"></span>
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit' class="btn-submit">{LOGIN_BUTTON}</button>
      </form>
    </div>
  )
}

export default Login;