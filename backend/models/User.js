const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  totalLogins: {type: Number, default: 0},
  username: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return v.length >= 8; // Example: password must be at least 8 characters long
      },
      message: props => `${props.value} is not a valid password!`
    }
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  }
  // Add other fields as needed
});

module.exports = mongoose.model('User', userSchema);
