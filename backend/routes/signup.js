const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path based on your project structure
const { createSecretToken } = require("../token/generateToken");

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing with 10 rounds

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword, totalLogins: 1 });
    await newUser.save();

    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS
        httpOnly: false, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
    });

    
    res.status(201).json({ message: 'User created successfully'});
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
