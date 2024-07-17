const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authToken = require('../middleware/auth');

// Route to register a new user
router.post('/register', authController.register);

// Route to login a user
router.post('/login', authController.login);

// Route to create a new user
router.post('/users', authToken, userController.createUser);

// Router to get all users
router.get('/users', authToken, userController.getAllUsers);

// Router to get a user by user_id
router.get('/users/:user_id', authToken, userController.getUserById);

// Router to update a user by user_id
router.put('/users/:user_id', authToken, userController.updateUser);

// Router to delete a user by user_id
router.delete('/users/:user_id', authToken, userController.deleteUser);

// Export API operations
module.exports = router;