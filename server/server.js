// Import the express module for creating the web server
const express = require('express');

// Import middleware to parse incoming request bodies
const bodyParser = require('body-parser');

// Import Cookie parser middleware
const cookieParser = require('cookie-parser');

// Import REST API routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Import CORS 
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// Create an instance of Express application
const app = express();

// Use Cookie parser middleware
app.use(cookieParser());

// Use CORS security feature
app.use(cors({
    origin: 'http://localhost:3000', // Application URL (do not use in production)
    credentials: true, // Allow credentials to be sent (cookies, headers)
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes under '/api'
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Define port number on which server will listen
const port = process.env.PORT || 3000;

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
