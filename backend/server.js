const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const signupRoutes = require('./routes/signup'); // Adjust the path as needed
const loginRoutes = require('./routes/login'); // Adjust the path as needed
const logoutRoutes = require('./routes/logout');
const protectedRoutes = require('./routes/protected');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
const uri = 'mongodb+srv://bloom:fkoxt78273@paper-trading.cvbd1.mongodb.net/trading';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use the routes
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/protected', protectedRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});
