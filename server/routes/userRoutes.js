// Imports and configuration
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authToken = require('../middleware/auth');

// Route to create a new user
router.post('/', authToken, userController.createUser);

// Router to get all users
router.get('/', authToken, userController.getAllUsers);

// Router to get a user by user_id
router.get('/:user_id', authToken, userController.getUserById);

// Router to update a user by user_id
router.put('/:user_id', authToken, userController.updateUser);

// Router to delete a user by user_id
router.delete('/:user_id', authToken, userController.deleteUser);

// Export API operations
module.exports = router;