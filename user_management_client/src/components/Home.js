// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Import icons from react-icons library
import { FaList, FaUserPlus, FaDatabase } from 'react-icons/fa';

// Import component-specific styles
import '../styles/Home.css';

// Functional component representing the Home page
function Home({ onPopulateDatabase }) {
    // Event handler for the "Populate Database" button click
    const handlePopulateClick = async () => {
        try {
          // Call the provided onPopulateDatabase function to trigger database population
          await onPopulateDatabase();
        } catch (error) {
            // Handle errors if any occur during the database population
        }
    };

    // JSX rendering of the Home component
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <div className="jumbotron">
                        <h1 className="display-4">Welcome to User Management</h1>
                        <p className="lead">This is a simple user management system.</p>
                        <hr className="my-4" />
                        <p>Click below to explore functionalities:</p>
                        <div className="row justify-content-around">
                            {/* Link to the "View User List" page */}
                            <div className="col-md-5">
                                <Link to="/view" className="btn btn-primary btn-lg btn-block">
                                    <FaList /> View User List
                                </Link>
                            </div>
                            {/* Link to the "Add New User" page */}
                            <div className="col-md-5">
                                <Link to="/add" className="btn btn-success btn-lg btn-block">
                                    <FaUserPlus /> Add New User
                                </Link>
                            </div>
                        </div>
                        <div className="mt-3">
                            {/* Button to trigger database population */}
                            <Link to="#" onClick={handlePopulateClick} className="btn btn-secondary btn-lg">
                                <FaDatabase /> Populate Database with Random Users
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the Home component for use in other parts of the application
export default Home;
