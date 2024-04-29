import React, { useState } from 'react';
import "./Login.css";
import { setItemInLocalStorage } from '../../utils/local-storage-utils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: Validate username and password
    if (username === 'Swetha' && password === '123') {
      setItemInLocalStorage('loggedIn', 'true');
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
        <h2>Login</h2>
        <p>Logging into CineFLEX will give you access to full videos and movies. You can sit back and relax and watch at your home</p>
        <div class="input-floating-label">
          <input 
            className="input" 
            type="text" 
            id="input" 
            name="input" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <label for="input">Username</label>
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
          <label for="input">Password</label>
          <span class="focus-bg"></span>
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit' class="btn-submit">LOGIN</button>
      </form>
    </div>
  )
}

export default Login;