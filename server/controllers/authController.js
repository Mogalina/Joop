// Import User model
const User = require('../models/User');

// Import password hash
const bcrtpy = require('bcrypt');

// Import JSON Web Token to securely transfer information
const jwt = require('jsonwebtoken');

// Load environment variables from .env file
require('dotenv').config();

/**
 * Register a new user.
 * 
 * @param {Object} req - Express request object, containing the user data.
 * @param {Object} res - Express response object.
 */
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if email already exists in database
        const existingUserEmail = await User.findByEmail(email);
        if (existingUserEmail) {
            return res.status(400).json({ message: 'Email address already exists' });
        }

        // Check if username already exists in database
        const existingUserUsername = await User.findByUsername(username);
        if (existingUserUsername) {
            return res.status(400).json({ message: 'Username already exists'});
        }

        // Create a new user
        const newUser = await User.create(username, email, password);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Error registering user');
    }
};

/**
 * Login a user.
 *
 * @param {Object} req - Express request object, containing the user credentials.
 * @param {Object} res - Express response object.
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Retrieve user by email address
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is matching
        const isMatch = await bcrtpy.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JSON Web Token
        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error logging in', err);
        res.status(500).send('Error logging in');
    }
};

// Export authentification functions
module.exports = {
    register,
    login,
};