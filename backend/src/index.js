const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Import models
const User = require('./models/user');

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
async function testConnection() {
  try {
    await User.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    await User.sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Booking App API',
    environment: process.env.NODE_ENV
  });
});

// User routes
app.post('/api/users', async (req, res) => {
  try {
    console.log('Received user data:', req.body);
    
    if (!req.body.firstname || !req.body.lastname) {
      return res.status(400).json({ 
        error: 'firstname and lastname are required fields' 
      });
    }

    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    });

    console.log('User created successfully:', user.toJSON());
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ 
      error: error.message,
      details: error.errors?.map(e => e.message)
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
}); 