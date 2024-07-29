// Import the express module for creating the web server
const express = require('express');

// Import middleware to parse incoming request bodies
const bodyParser = require('body-parser');

// Import REST API routes
const userRoutes = require('./routes/userRoutes');

// Import CORS 
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// Create an instance of Express application
const app = express();

// Use CORS security feature
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes under '/api'
app.use('/api', userRoutes);

// Define port number on which server will listen
const port = process.env.PORT || 3000;

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
