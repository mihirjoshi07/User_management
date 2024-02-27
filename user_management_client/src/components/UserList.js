// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Import component-specific styles
import '../styles/UserList.css';

// Functional component for displaying the list of users
function UserList() {
  // State to manage the list of users
  const [users, setUsers] = useState([]);

  // Fetch users from the server when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to handle the deletion of a user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/users/${id}`);
      // Fetch users again after deletion to update the list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // JSX rendering of the UserList component
  return (
    <div>
      <h1>User List</h1>
      {/* Table to display user information */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>User Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the users array to render each user's information */}
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.address1}</td>
              <td>{user.city}</td>
              <td>{user.postalCode}</td>
              <td>{user.country}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>{user.userNotes}</td>
              {/* Action buttons for deleting and updating a user */}
              <td>
                <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
                {/* Link to navigate to the update page for a specific user */}
                <Link to={`/update/${user._id}`}>
                  <button className="update-btn">Update</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Export the UserList component for use in other parts of the application
export default UserList;
