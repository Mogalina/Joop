// Import User model
const User = require('../models/User');

// Import ConfirmationCode model
const ConfirmationCode = require('../models/ConfirmationCode');

// Import PasswordResetToken model
const PasswordResetToken = require('../models/PasswordResetToken');

// Import database connection
const db = require('../db/db');

// Import password hash
const bcrypt = require('bcrypt');

// Import JSON Web Token to securely transfer information
const jwt = require('jsonwebtoken');

// Import email confirmation helper
const { sendConfirmationEmail, generateConfirmationCode } = require('../helpers/emailConfirmHandler');

// Import password reset request email helper
const { sendPasswordResetRequest } = require('../helpers/emailRequestPasswordReset');

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
 * Logout a user by clearing the auth token.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
const logout = async (req, res) => {
    try {
        // Clear the authentication token cookie
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax'
        });

        // Send success response
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out', error);
        res.status(500).send('Error logging out');
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

        // Get the current time
        const currentTime = new Date();

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
    const { email, password, rememberMe } = req.body;
    try {
        // Retrieve user by email address
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if user confirmed email address
        if (!user.is_confirmed) {
            return res.status(403).send({ message: 'Email not confirmed' });
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
        console.log('\tPASSWORD (hashed): ' + user.password + "\n");

        // Set login token expiration time based on 'Remember Me' option
        const tokenExpiration = rememberMe ? '7d' : '1h';

        // Generate JSON Web Token
        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: tokenExpiration });

        // Set cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            path: '/',
            maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
        };

        // Send token as a cookie
        res.cookie('authToken', token, cookieOptions);

        // Display successful login operation message
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error logging in', err);
        res.status(500).send('Error logging in');
    }
};

/**
 * Request password reset for user account.
 *
 * @param {Object} req - Express request object, containing user email.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
const requestPasswordReset = async (req, res) => {
    // Extract email address from request body
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    try {
        // Retrieve user by email address
        const user = await User.findByEmail(email);
        if (!user) { 
            return res.status(400).send({ message: 'User not found' });
        }

        // Check for existing password reset token
        const token = await PasswordResetToken.findByUserId(user.user_id);

        // Get the current time
        const currentTime = new Date();
    
        // Check if token exists and is still valid
        if (token && currentTime <= token.expires_at) {
            return res.status(400).send({ message: 'Password reset link already sent' });
        }

        // Generate a password reset token
        const resetToken = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set expiration time for token
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        // Save token in the database
        await PasswordResetToken.create(user.user_id, resetToken, expiresAt);

        // Set account password reset request link
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        // Send reset token to email
        await sendPasswordResetRequest(email, resetLink);

        res.status(200).send({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error requesting password reset', error);
        res.status(500).send({ message: 'Error requesting password reset', error });
    }
};

/**
 * Reset user password using provided token.
 *
 * @param {Object} req - Express request object, containing the reset token and new password.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>}
 */
const resetPassword = async (req, res) => {
    // Extract token and new password from body
    const { token, newPassword } = req.body;

    // Validate token and new password
    if (!token || !newPassword) {
        return res.status(400).send({ message: 'Token and new password are required' });
    }

    try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Find user by ID (ensure that token is valid)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send({ message: 'Invalid token or user does not exist' });
        }

        // Find password reset token in database
        const resetToken = await PasswordResetToken.findByToken(token);
        if (!resetToken) {
            return res.status(400).send({ message: 'Invalid or expired token'});
        }

        // Check if token is expired
        if (new Date() > resetToken.expires_at) {
            return res.status(400).send({ message: 'Token has expired' });
        };

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await User.updatePassword(userId, hashedPassword);

        // Delete token from the database
        await PasswordResetToken.deleteByUserId(userId);

        res.status(200).send({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error resetting password', error);
        res.status(500).send({ message: 'Error resetting password', error });
    }
};

// Export authentification controller functions
module.exports = {
    register,
    login,
    requestPasswordReset,
    resetPassword,
    confirmEmail,
    resendConfirmationCode,
    logout,
};