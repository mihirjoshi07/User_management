// Import necessary dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Importing components
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  // State to manage user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handler function for user login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handler function for user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Handler function to populate the database
  const handlePopulateDatabase = async () => {
    try {
      // Making a GET request to the server to populate the database
      await fetch('http://localhost:3001/populate', {
        method: 'GET',
      });
      // Alerting the user about successful database population
      alert('Database populated successfully');
    } catch (error) {
      // Handling errors and alerting the user
      console.error('Error populating database:', error);
      alert('Error populating database');
    }
  };

  // Main component rendering the entire application
  return (
    <Router>
      <div className="app-container">
        {/* Render the navigation bar only if the user is authenticated */}
        {isAuthenticated && <NavBar onPopulateDatabase={handlePopulateDatabase} onLogout={handleLogout} />}

        {/* Define application routes */}
        <Routes>
          {/* Route for adding a user */}
          <Route path="/add" element={isAuthenticated ? <AddUser /> : <Navigate to="/" />} />

          {/* Route for viewing user list */}
          <Route path="/view" element={isAuthenticated ? <UserList /> : <Navigate to="/" />} />

          {/* Route for updating user information */}
          <Route path="/update/:id" element={isAuthenticated ? <UpdateUser /> : <Navigate to="/" />} />

          {/* Route for the login page */}
          <Route path="/" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/home" />} />

          {/* Route for the registration page */}
          <Route path="/register" element={<Register />} />

          {/* Route for the home page, accessible only when authenticated */}
          <Route path="/home" element={isAuthenticated ? <Home onPopulateDatabase={handlePopulateDatabase} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the main App component
export default App;
