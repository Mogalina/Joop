// Imports and configuration
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Route to register a new user
router.post('/register', authController.register);

// Route to logout a user
router.post('/logout', authController.logout);

// Route to login a user
router.post('/login', authController.login);

// Route to verify email with confirmation code
router.post('/email-confirmation', authController.confirmEmail);

// Route to resend confirmation code on email
router.post('/resend-confirmation-code', authController.resendConfirmationCode);

// Route to reset account password
router.post('/reset-password', authController.resetPassword);

// Route to request reset account password on email
router.post('/request-reset-password', authController.requestPasswordReset);

// Route to login user by authentification middleware
router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        userId: req.user.userId,
        message: `Welcome, user with ID: ${req.user.userId}`
    });
});


// Export API operations
module.exports = router;