// Import JSON Web Token to securely transfer information
const jwt = require('jsonwebtoken');

// Load environment variables from .env file
require('dotenv').config();

/**
 * Authentication middleware.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authentification = (req, res, next) => {
    // Log existing cookies
    console.log('Cookies:', req.cookies);

    // Retrieve token from cookies
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: 'Access denied due to missing token' });
    }

    try {
        // Verify token using secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded token to request object
        req.user = verified;

        // Pass request to next middleware
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Export authentication functions
module.exports = authentification;
