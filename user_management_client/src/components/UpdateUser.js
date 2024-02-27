// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import component-specific styles
import '../styles/AddUser.css';

// Functional component for updating user details
function UpdateUser() {
  // React Router navigate function
  const navigate = useNavigate();

  // Retrieve the user ID from the URL parameters
  const { id } = useParams();

  // State to manage user details
  const [user, setUser] = useState({
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
    userNotes: '',
  });

  // Fetch user details when the component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Function to fetch user details from the server
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Event handler for input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Event handler for updating user details
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      // Make a PUT request to update user details
      await axios.put(`http://localhost:3001/update/users/${id}`, user);
      console.log('User updated successfully!');
      // Navigate to the user list page after successful update
      navigate('/view');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // JSX rendering of the UpdateUser component
  return (
    <div className="add-user-container">
      <h2>Update User</h2>
      {/* Form for updating user details */}
      <form onSubmit={handleUpdateUser}>
        <div className="form-group">
          <label className="form-label">
            Last Name:
            <input className="form-input" type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />
          </label>
          <label className="form-label">
            First Name:
            <input className="form-input" type="text" name="firstName" value={user.firstName} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Date of Birth:
            <input className="form-input" type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Address 1:
            <input className="form-input" type="text" name="address1" value={user.address1} onChange={handleInputChange} />
          </label>
          <label className="form-label">
            Address 2:
            <input className="form-input" type="text" name="address2" value={user.address2} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            City:
            <input className="form-input" type="text" name="city" value={user.city} onChange={handleInputChange} />
          </label>
          <label className="form-label">
            Postal Code:
            <input className="form-input" type="text" name="postalCode" value={user.postalCode} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Country:
            <input className="form-input" type="text" name="country" value={user.country} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Phone Number:
            <input className="form-input" type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Email:
            <input className="form-input" type="text" name="email" value={user.email} onChange={handleInputChange} />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            User Notes:
            <input className="form-input" type="text" name="userNotes" value={user.userNotes} onChange={handleInputChange} />
          </label>
        </div>
        {/* Button to submit the form and update user details */}
        <button className="submit-button" type="submit">Update User</button>
      </form>
    </div>
  );
}

// Export the UpdateUser component for use in other parts of the application
export default UpdateUser;
