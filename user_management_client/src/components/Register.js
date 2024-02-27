// Import necessary dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import component-specific styles
import '../styles/Register.css';

// Functional component for user registration
const Register = () => {
  // State to manage input fields and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // React Router navigate function
  const navigate = useNavigate();

  // Event handler for user registration
  const handleRegister = async () => {
    try {
      // Make a POST request to the server for user registration
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      // Check if the registration is successful
      if (response.ok) {
        console.log('Registration successful');
        // Navigate to the login page after successful registration
        navigate('/');
      } else {
        // If registration fails, handle the error and display an error message
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      // Log and handle errors related to user registration
      console.error('Error registering user:', error);
      setError('Internal Server Error');
    }
  };

  // JSX rendering of the Register component
  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        {/* User registration form */}
        <form className="register-form">
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
          {/* Input field for email */}
          <label>
            Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          {/* Button to trigger user registration */}
          <button type="button" onClick={handleRegister}>
            Register
          </button>
          {/* Display error message if there is an error */}
          {error && <p className="error-message">{error}</p>}
        </form>
        {/* Link to redirect to the login page if the user already has an account */}
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

// Export the Register component for use in other parts of the application
export default Register;
