const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path based on your project structure

const router = express.Router();
const env = require("dotenv");
const { createSecretToken } = require("../token/generateToken");

env.config();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }



    // Increase total logins
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $inc: { totalLogins: 1 } },
      { new: true } // Returns the updated document
    );

    const newUser = await User.findOne({ username });

    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
        path: "/", // Cookie is accessible from all paths
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS
        httpOnly: false, // Cookie cannot be accessed via client-side scripts
        sameSite: "None",
    });

    res.json({
      message: 'Login successful',
      user: {
        username: updatedUser.username,
        totalLogins: updatedUser.totalLogins
      },
      token: token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
