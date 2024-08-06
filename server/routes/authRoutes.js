// Imports and configuration
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to register a new user
router.post('/register', authController.register);

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

// Export API operations
module.exports = router;