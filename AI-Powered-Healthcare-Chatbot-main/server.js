const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');
const session = require('express-session');
const Contact = require('./models/Contact');


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 5000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static('public'));

// MongoDB URI from environment variable
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Session setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Change to true if using https
}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/sign-in', (req, res) => {
  res.sendFile(__dirname + '/public/sign-in.html');
});

app.get('/sign-up', (req, res) => {
  res.sendFile(__dirname + '/public/sign-up.html');
});

// Sign-up route
app.post('/sign-up', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already registered');
    }

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.redirect('/sign-in');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Sign-in route
app.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Simulating login session with user ID (replace with session/token logic later)
    req.session.userId = user._id;  // Store user ID in session
    res.redirect('/home');  // Redirect to home.html after successful login
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Home route (after successful sign-in)
app.get('/home', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/sign-in');  // Ensure the user is logged in before accessing home
  }

  res.sendFile(__dirname + '/public/home.html');
});

// Profile route
app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/sign-in');  // Ensure the user is logged in before accessing profile
  }

  res.sendFile(__dirname + '/public/profile.html');
});

// API to fetch user profile
app.get('/get-profile', async (req, res) => {
  const userId = req.session.userId; // Get user ID from session

  if (!userId) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ username: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update username
app.post('/update-username', async (req, res) => {
  const userId = req.session.userId; // Get user ID from session
  const { newUsername } = req.body;

  if (!userId) {
    return res.status(401).send('User not logged in');
  }

  try {
    await User.findByIdAndUpdate(userId, { name: newUsername });
    res.send('Username updated successfully! <a href="/profile">Go back to Profile</a>');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating username');
  }
});

// Update password
app.post('/update-password', async (req, res) => {
  const userId = req.session.userId; // Get user ID from session
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(401).send('User not logged in');
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send('Password updated successfully! <a href="/profile">Go back to Profile</a>');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating password');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Example using Express.js for logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    // Redirect to the sign-in page after logout
    res.redirect('/sign-in');
  });
});

app.post('/contact-us', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.send('Your message has been successfully submitted. Thank you!');
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).send('An error occurred. Please try again.');
  }
});

// Route for the landing page (begin page)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

