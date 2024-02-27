// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import the component-specific styles
import '../styles/AddUser.css';

// Functional component to add a new user
function AddUser({ onUserAdded }) {
  // Initialize the React Router navigate function
  const navigate = useNavigate();

  // State to manage the form input values for the new user
  const [newUser, setNewUser] = useState({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    email: '',
    userNotes: ''
  });

  // Event handler for input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Event handler for submitting the form to add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the server to add the new user
      await axios.post('http://localhost:3001/add/users', newUser);

      // Clear the form after successful user addition
      setNewUser({
        lastName: '',
        firstName: '',
        dateOfBirth: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        country: '',
        phoneNumber: '',
        email: '',
        userNotes: ''
      });

      // Navigate to the user list view after adding the user
      navigate('/view');
    } catch (error) {
      // Log and handle errors related to adding a user
      console.error('Error adding user:', error);
    }
  };

  // JSX rendering of the AddUser component
  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      {/* User input form */}
      <form onSubmit={handleAddUser}>
        {/* Form groups for user information */}
        <div className="form-group">
          <label className="form-label">
            Last Name:
            <input className="form-input" type="text" name="lastName" value={newUser.lastName} onChange={handleInputChange} />
          </label>
          <label className="form-label">
            First Name:
            <input className="form-input" type="text" name="firstName" value={newUser.firstName} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Date of Birth:
            <input className="form-input" type="date" name="dateOfBirth" value={newUser.dateOfBirth} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Address 1:
            <input className="form-input" type="text" name="address1" value={newUser.address1} onChange={handleInputChange} />
          </label>
          <label className="form-label">
            Address 2:
            <input className="form-input" type="text" name="address2" value={newUser.address2} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            City:
            <input className="form-input" type="text" name="city" value={newUser.city} onChange={handleInputChange} />
          </label>
          <label className="form-label">
            Postal Code:
            <input className="form-input" type="text" name="postalCode" value={newUser.postalCode} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Country:
            <input className="form-input" type="text" name="country" value={newUser.country} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Phone Number:
            <input className="form-input" type="text" name="phoneNumber" value={newUser.phoneNumber} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Email:
            <input className="form-input" type="text" name="email" value={newUser.email} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            User Notes:
            <input className="form-input" type="text" name="userNotes" value={newUser.userNotes} onChange={handleInputChange} />
          </label>
        </div>
        {/* Submit button to add the user */}
        <button className="submit-button" type="submit">Add User</button>
      </form>
    </div>
  );
}

// Export the AddUser component for use in other parts of the application
export default AddUser;
