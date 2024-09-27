import React, { useState } from 'react';
import "./Login.css";
import { setItemInLocalStorage } from '../../utils/local-storage-utils';
import { useNavigate } from 'react-router-dom';
import { LOGIN_BUTTON, LOGIN_DESCRIPTION, LOGIN_TITLE, PASSWORD, PASSWORD_TITLE, USERNAME, USERNAME_TITLE } from '../../constants/login-constants';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const Login = () => {
  console.log('COMPONENT :: login')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handle Login 
   * @param {*} e 
   */
  const handleLogin = (e) => {
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
      <form className="login-form" onSubmit={handleLogin}>
        <h2>{LOGIN_TITLE}</h2>
        <p>{LOGIN_DESCRIPTION}</p>
        <div className="input-floating-label">
          <Input 
            className="input" 
            type="text" 
            name="input" 
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <label htmlFor="input">{USERNAME_TITLE}</label>
          <span className="focus-bg"></span>
        </div>
        <div className="input-floating-label">
          <Input 
            className="input" 
            type="password" 
            name="input" 
            placeholder="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <label htmlFor="input">{PASSWORD_TITLE}</label>
          <span className="focus-bg"></span>
        </div>
        {error && <p className='error'>{error}</p>}
        <Button type='submit' className="btn-submit" children={LOGIN_BUTTON} />
      </form>
    </div>
  )
}

export default Login;