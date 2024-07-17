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
    // Retrieve token from Authorization header
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denided due to missing token' });
    }

    try {
        // Verify token using secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded token to requested object
        req.user = verified;

        // Pass request to next middleware
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Export authentification functions
module.exports = authentification;