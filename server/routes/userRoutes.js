const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user
router.post('/users', userController.createUser);

// Router to get all users
router.get('/users', userController.getAllUsers);

// Router to get a user by user_id
router.get('/users/:user_id', userController.getUserById);

// Router to update a user by user_id
router.put('/users/:user_id', userController.updateUser);

// Router to delete a user by user_id
router.delete('/users/:user_id', userController.deleteUser);

// Export API operations
module.exports = router;