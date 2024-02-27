/*
Name - Suyash Saxena
CNumber - c0878943
Description: This file represents the main entry point of client side of the MERN stack application for User Management.
*/
// Import React and ReactDOM for rendering the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main styling for the application
import './index.css';

// Import the main App component
import App from './App';

// Create a root using ReactDOM.createRoot for concurrent mode rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within a React.StrictMode for additional development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
