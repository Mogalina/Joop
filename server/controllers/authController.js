// Import User model
const User = require('../models/User');

// Import ConfirmationCode model
const ConfirmationCode = require('../models/ConfirmationCode');

// Import database connection
const db = require('../db/db');

// Import password hash
const bcrypt = require('bcrypt');

// Import JSON Web Token to securely transfer information
const jwt = require('jsonwebtoken');

// Import email confirmation helper
const { sendConfirmationEmail, generateConfirmationCode } = require('../helpers/emailConfirmHandler');

// Load environment variables from .env file
require('dotenv').config();

/**
 * Register a new user to database.
 * 
 * @param {Object} req - Express request object, containing the user data.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
    // Retrieve user username, email and password
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

        // Generate confirmation code
        const confirmationCode = await generateConfirmationCode();

        // Set expiration date for confirmation code
        const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

        // Create and save new user
        const newUser = await User.create(username, email, password);

        // Store confirmation code in the database
        await ConfirmationCode.create(email, confirmationCode, expirationTime);

        // Send confirmation code to email
        await sendConfirmationEmail(email, confirmationCode);

        res.status(201).send({ message: 'User registered, confirmation code sent to email' });
    } catch (err) {
        console.error('Error registering user', err);
        res.status(500).send('Error registering user');
    }
};

/**
 * Handle email confirmation with confirmation code.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
const confirmEmail = async (req, res) => {
    // Retrieve user email and confirmation code
    const { email, confirmationCode } = req.body;

    try {
        // Check if confirmation code matches
        const codeEntry = await ConfirmationCode.findByEmail(email);

        // Check if result exists
        if (!codeEntry || codeEntry.code !== confirmationCode) {
            return res.status(400).send({ message: 'Invalid or expired confirmation code' });
        }

        // Extract current time 
        const currentTime = new Date(); 

        // Check if confirmation code expired
        if (currentTime > codeEntry.expires_at) {
            return res.status(400).send({ message: 'Confirmation code expired' });
        }

        // Update user's status to confirmed in the database
        await User.confirmEmail(email);

        // Delete confirmation code entry after confirmation
        await ConfirmationCode.deleteById(codeEntry.id); 

        res.status(201).send({ message: 'Email confirmed successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error confirming email', error });
    }
};

/**
 * Resend confirmation code.
 *
 * @param {Object} req - Express request object, containing the user email.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
const resendConfirmationCode = async (req, res) => {
    const { email } = req.body; // Retrieve user email from the request body

    // Check if email is provided
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    try {
        // Check for existing confirmation code
        const codeEntry = await ConfirmationCode.findByEmail(email);

        // Check if a confirmation code exists
        if (!codeEntry) {
            return res.status(400).send({ message: 'No confirmation code found' });
        }

        const currentTime = new Date(); // Get the current time

        // Check if existing confirmation code expired
        if (currentTime <= codeEntry.expires_at) {
            return res.status(400).send({ message: 'Confirmation code is still valid' });
        }

        // Generate a new confirmation code
        const newConfirmationCode = await generateConfirmationCode();

        // Set new expiration time for confirmation code
        const newExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

        // Update confirmation code in the database
        await ConfirmationCode.update(email, newConfirmationCode, newExpirationTime);

        // Send the new confirmation code to the email
        await sendConfirmationEmail(email, newConfirmationCode);

        res.status(200).send({ message: 'New confirmation code sent' });
    } catch (error) {
        console.error('Error resending confirmation code', error);
        res.status(500).send({ message: 'Error resending confirmation code', error });
    }
};

/**
 * Login a user from database.
 *
 * @param {Object} req - Express request object, containing the user credentials.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Retrieve user by email address
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if user confirmed email address
        if (!user.is_confirmed) {
            return res.status(403).send({ message: 'Email not confirmed.' });
        }

        // Check if password is matching
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Debug user credentials
        console.log('\n@LOGIN (user credentials)');
        console.log('\tUSERNAME: ' + user.username);
        console.log('\tEMAIL: ' + user.email);
        console.log('\tPASSWORD (hashed): ' + user.password);

        // Generate JSON Web Token
        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Error logging in', err);
        res.status(500).send('Error logging in');
    }
};

/**
 * Controller function to handle forgot password request.
 *
 * @param {Object} req - Express request object, containing user email address.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
const forgotPassword = async (req, res) => {
    // Retrieve user email address
    const { email } = req.body;

    // Check if any email address is provided
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    try {
        // Attempt to send confirmation code to email
        await sendConfirmationEmail(email);

        res.status(200).send({ message: 'Confirmation code successfully sent' });
    } catch (error) {
        // Display unexpected errors
        res.status(500).send({ message: 'Error sending confirmation code', error });
    }
};

// Export authentification functions
module.exports = {
    register,
    login,
    forgotPassword,
    confirmEmail,
    resendConfirmationCode,
};
