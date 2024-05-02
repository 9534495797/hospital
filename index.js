const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve login form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Store user details in MongoDB
    const user = new User({ username, password });
    await user.save();

    // Redirect to dashboard upon successful login
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Serve dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});
// Serve home page
app.get('/home.html', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

// Serve about page
app.get('/about.html', (req, res) => {
  res.sendFile(__dirname + '/about.html');
});

// Serve facility page
app.get('/facility.html', (req, res) => {
  res.sendFile(__dirname + '/facility.html');
});

// Serve booking page
app.get('/booking.html', (req, res) => {
  res.sendFile(__dirname + '/booking.html');
});

// Serve medicine page
app.get('/medicine.html', (req, res) => {
  res.sendFile(__dirname + '/medicine.html');
});

// Serve options page
app.get('/options.html', (req, res) => {
  res.sendFile(__dirname + '/options.html');
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


