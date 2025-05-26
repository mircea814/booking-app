const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Import models
const User = require('./models/user');
const Role = require('./models/role');

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
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ 
        error: 'username and password are required fields' 
      });
    }
      const existingUser=await User.findOne({
        where:{
          username:req.body.username
        }
      })
      if(existingUser){
        console.log('Username already exists', existingUser.toJSON());
        return res.status(400).json({
          error:'Username already exists'
        })
      }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
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

app.post('/api/users/login', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({
      where: { username: req.body.username }
    });

    if (!user) {
      return res.status(401).json({ error: 'Username is incorrect' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your_jwt_secret', // use a strong secret in production!
      { expiresIn: '1h' }
    );
    console.log('Token generated:', token);

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.post('/api/roles', async (req, res) => {
  try {
    console.log('Received user data:', req.body);
    
    if (!req.body.roleName || !req.body.status) {
      return res.status(400).json({ 
        error: 'roleName and status are required fields' 
      });
    }

    const role = await Role.create({
      role_name: req.body.roleName,
      status: req.body.status
    });

    console.log('Role created successfully:', role.toJSON());
    res.status(201).json(role);
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

app.put('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate required fields
    if (!req.body.firstname || !req.body.lastname) {
      return res.status(400).json({ error: 'firstname and lastname are required' });
    }

    // Update the user
    await user.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    // Fetch the updated user
    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/user/:id', async (req, res) => {
  try {
    // Validate if id is provided
    if (!req.params.id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } 

    await user.destroy();
    res.status(200).json({ 
      message: 'User deleted successfully',
      deletedUserId: req.params.id 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      error: 'Failed to delete user',
      details: error.message 
    });
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


