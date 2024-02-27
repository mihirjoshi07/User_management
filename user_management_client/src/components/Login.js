// Import necessary dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import component-specific styles
import '../styles/Login.css';

// Functional component for user login
const Login = ({ onLogin }) => {
  // State to manage input fields and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // React Router navigate function
  const navigate = useNavigate();

  // Event handler for user login
  const handleLogin = async () => {
    try {
      // Make a POST request to the server for user login
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if the login is successful
      if (response.ok) {
        // Call the provided onLogin function and navigate to the home page
        onLogin();
        navigate('/home');
      } else {
        // If login fails, handle the error and display an alert
        const data = await response.json();
        setError(data.error || 'Invalid username or password');
        alert('Invalid username or password');
      }

    } catch (error) {
      // Log and handle errors related to user login
      console.error('Error logging in:', error);
      setError('Internal Server Error');
    }
  };

  // Event handler to redirect to the registration page
  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  // JSX rendering of the Login component
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {/* User login form */}
        <form>
          {/* Input field for username */}
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          {/* Input field for password */}
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          {/* Login button */}
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          {/* Display error message if there is an error */}
          {error && <p className="error-message">{error}</p>}
        </form>
        {/* Link to redirect to the registration page */}
        <p>
          Don't have an account? <button type="button" onClick={handleRegisterRedirect}>Register</button>
        </p>
      </div>
    </div>
  );
};

// Export the Login component for use in other parts of the application
export default Login;
