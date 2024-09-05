// Imports and configuration
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Route to create a new user
router.post('/', authMiddleware, userController.createUser);

// Router to get all users
router.get('/', authMiddleware, userController.getAllUsers);

// Router to get a user by user_id
router.get('/:user_id', authMiddleware, userController.getUserById);

// Router to update a user by user_id
router.put('/:user_id', authMiddleware, userController.updateUser);

// Router to delete a user by user_id
router.delete('/:user_id', authMiddleware, userController.deleteUser);

// Export API operations
module.exports = router;