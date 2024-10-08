const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const router = express.Router();
const env = require("dotenv");

env.config();


function authenticateJWT(req, res, next) {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user; // Save user information
      next();
    });
  }
  

router.get('/', authenticateJWT, async (req, res) => {
    res.send('This is a protected route, accessible only with a valid token.');
});

module.exports = router;
