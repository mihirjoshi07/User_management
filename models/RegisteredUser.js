// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Define the schema for the registered user
const registeredUserSchema = new mongoose.Schema({
    // Username field with type String, required, and unique constraint
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Password field with type String and required constraint
    password: {
        type: String,
        required: true
    },
    // Email field with type String, required, and unique constraint
    email: {
        type: String,
        required: true,
        unique: true
    },
});

// Create a model using the schema, named 'RegisteredUser'
const RegisteredUser = mongoose.model('RegisteredUser', registeredUserSchema);

// Export the model to use it in other parts of the application
module.exports = RegisteredUser;
