// Login.jsx
import React, { useState } from 'react';


const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve user credentials from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(user => user.username === username && user.password === password);

    if (user) {
      setIsLoggedIn(true);
      setErrorMessage('');
      onLogin(username); // Call the onLogin function passed as props
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className={isLoggedIn ? 'success' : ''}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <p>Don't have an account? <span onClick={onSwitchToRegister} className="register-link">Register here</span></p>
    </div>
  );
};

export default Login;
