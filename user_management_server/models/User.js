// Import the mongoose library
const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    // Last name of the user
    lastName: {
        type: String,
        required: true
    },
    // First name of the user
    firstName: {
        type: String,
        required: true
    },
    // Date of birth of the user
    dateOfBirth: {
        type: Date,
        required: true
    },
    // First line of the user's address
    address1: {
        type: String,
        required: true
    },
    // Second line of the user's address (optional, default is an empty string)
    address2: {
        type: String,
        default: ''
    },
    // City of residence for the user
    city: {
        type: String,
        required: true
    },
    // Postal code of the user's address
    postalCode: {
        type: String,
        required: true
    },
    // Country of residence for the user
    country: {
        type: String,
        required: true
    },
    // Phone number of the user
    phoneNumber: {
        type: String,
        required: true
    },
    // Email address of the user
    email: {
        type: String,
        required: true
    },
    // Additional notes about the user (optional, default is an empty string)
    userNotes: {
        type: String,
        default: ''
    }
});


// Create a User model based on the schema
const UserModel = mongoose.model('User', userSchema);

// Export the User model for use in other files
module.exports = UserModel;
