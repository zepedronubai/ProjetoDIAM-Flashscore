import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);
  
    const handleLogin = () => {
      axios.post('http://127.0.0.1:8000/api/login/', { email, password })
        .then(response => {
          console.log(response.data);
          // Handle successful login
        })
        .catch(error => {
          console.error(error);
          // Handle login error
        });
    };
  
    const handleRegister = () => {
      axios.post('http://127.0.0.1:8000/api/register/', { username, email, password })
        .then(response => {
          console.log(response.data);
          // Handle successful registration
        })
        .catch(error => {
          console.error(error);
          // Handle registration error
        });
    };
  
  return (
    <div className="login-container">
      <h2>{isLoginForm ? 'Login' : 'Register'}</h2>
      <form>
        {!isLoginForm && (
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={isLoginForm ? handleLogin : handleRegister}>
          {isLoginForm ? 'Login' : 'Register'}
        </button>
      </form>
      <p onClick={() => setIsLoginForm(!isLoginForm)}>
        {isLoginForm ? 'New User? Register here' : 'Already have an account? Login here'}
      </p>
    </div>
  );
};
Login.displayName = 'Login';
export default Login;
