/*
Name - Suyash Saxena
CNumber - c0878943
Description: This file represents the main entry point of server side of the MERN stack application for User Management.
*/
// Import necessary libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const faker = require('faker');

// Create an Express application
const app = express();

// Middleware for method override
app.use(methodOverride('_method'));

// Middleware for parsing URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/UserList", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
  .catch(console.error);

// Import the User model
const User = require('./models/User');
const RegisteredUser = require('./models/RegisteredUser');

// Route for user registration
app.post('/register', async (req, res) => {
  try {
      const { username, password, email } = req.body;

      // Check if the username is already taken
      const existingUser = await RegisteredUser.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ error: 'Username already taken' });
      }

      // Create a new RegisteredUser instance for registration
      const newRegisteredUser = new RegisteredUser({
          username,
          password, // TODO: Hash the password before saving it to the database
          email,
      });

      await newRegisteredUser.save();

      // Respond with the registered user in JSON format
      res.json(newRegisteredUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find the registered user by username
      const registeredUser = await RegisteredUser.findOne({ username });

      // Check if the user exists and if the password is correct
      if (!registeredUser || registeredUser.password !== password) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      // TODO: Implement token generation and return it in the response

      // Respond with a success message or status
      res.json({ message: 'Login successful' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to populate the database with random users
app.get('/populate', async (req, res) => {
  try {
    // Generate and save 5 random users to the database
    for (let i = 0; i < 5; i++) {
      const newUser = new User({
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        dateOfBirth: faker.date.past(),
        address1: faker.address.streetAddress(),
        city: faker.address.city(),
        postalCode: faker.address.zipCode(),
        country: faker.address.country(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        userNotes: faker.lorem.sentence(),
      });

      await newUser.save();
    }

    // Respond with a success message or status
    res.json({ message: 'Database populated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get the list of users
app.get('/users', async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Format the dateOfBirth field before sending it to the client
    const formattedUsers = users.map((user) => ({
      ...user.toObject(),
      dateOfBirth: user.dateOfBirth.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
    }));

    // Respond with the list of users in JSON format
    res.json(formattedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new user
app.post('/add/users', async (req, res) => {
  try {
    // Extract user data from the request body
    const { lastName, firstName, dateOfBirth, address1, address2, city, postalCode, country, phoneNumber, email, userNotes } = req.body;

    // Create a new User instance and save it to the database
    const newUser = new User({
      lastName,
      firstName,
      dateOfBirth,
      address1,
      address2,
      city,
      postalCode,
      country,
      phoneNumber,
      email,
      userNotes
    });

    await newUser.save();

    // Respond with the added user in JSON format
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a user
app.delete('/delete/users/:id', async (req, res) => {
  try {
    // Find and delete a user by ID
    const result = await User.findByIdAndDelete(req.params.id);
    
    // Respond with a success message or status
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/users/:id', async (req, res) => {
  try {
    // Find a user by ID
    const user = await User.findById(req.params.id);

    // If user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Format the dateOfBirth property to a string in "yyyy-MM-dd" format
    const formattedUser = {
      ...user.toObject(), // Convert Mongoose document to plain JavaScript object
      dateOfBirth: user.dateOfBirth.toISOString().split('T')[0],
    };

    // Respond with the formatted user details in JSON format
    res.json(formattedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to update a user
app.put('/update/users/:id', async (req, res) => {
  try {
    // Extract user ID and updated fields from the request
    const userId = req.params.id;
    const updatedUserFields = req.body;

    // Find and update the user by ID
    const user = await User.findByIdAndUpdate(userId, updatedUserFields, { new: true });

    // If user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the updated user in JSON format
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
