import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {

      axios.post('http://127.0.0.1:8000/login/', { username, password })
        .then(response => {
          console.log(response.data);
            setIsLoggedIn(true);
            localStorage.setItem('token' , response.data.token)
            localStorage.setItem('username', username)
            window.dispatchEvent(new Event("storage"));
            console.log(username)
            alert("Login efetuado com sucesso!")
            window.location.href = '/';
        })
        .catch(error => {
          console.error(error);
          alert("Credenciais erradas!")
        });
    };
  
    const handleRegister = () => {
      axios.post('http://127.0.0.1:8000/register/', { username, email, password })
        .then(response => {
          console.log(response.data);
          alert("User registado com sucesso!")
          window.location.href = '/Login';
        })
        .catch(error => {
          console.error(error);
          alert("Erro ao registar!")
        });
    };
  
  return (
    <div className="login-container">
      <h2>{isLoginForm ? 'Login' : 'Register'}</h2>
      <form>

          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

        {!isLoginForm && (
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        )}
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
