import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import './styles.css';
import './Message.css'; 
import './Auth.css'; 
// import './Chat.css';


const App = () => {
  const [user, setUser] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
  };

  const switchToRegister = () => {
    setIsLoginMode(false);
  };

  const switchToLogin = () => {
    setIsLoginMode(true);
  };

  return (
    <div className="app-container">
      {!user ? (
        <div className="form-container">
          {isLoginMode ? (
            <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
          ) : (
            <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
          )}
        </div>
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
};

export default App;



