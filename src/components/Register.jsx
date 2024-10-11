// Register.jsx
import React, { useState } from 'react';


const Register = ({ onRegister, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user credentials to local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find(user => user.username === username);

    if (userExists) {
      setErrorMessage('User already exists. Please choose another username.');
      setSuccessMessage('');
    } else {
      existingUsers.push({ username, password });
      localStorage.setItem('users', JSON.stringify(existingUsers));
      setSuccessMessage('Registration successful! You can now log in.');
      setErrorMessage('');
      onRegister(username); // Optionally call this if you want to handle registration state
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <p>Already have an account? <span onClick={onSwitchToLogin} className="login-link">Login here</span></p>
    </div>
  );
};

export default Register;
