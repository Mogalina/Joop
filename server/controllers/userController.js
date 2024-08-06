// Import User model to interact with the database
const User = require('../models/User');

/**
 * Controller function to create a new user.
 *
 * @param {Object} req - Express request object containing user details.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>} JSON response containing created user.
 */
const createUser = async (req, res) => {
    // Destructure user data from body
    const { username, email, password } = req.body;
    try {
        // Create new user object
        const newUser = await User.create(username, email, password);
        res.status(201).json(newUser); 
    } catch (err) {
        // Display possible errors
        console.error('Error creating user', err);
        res.status(500).send('Error creating user');
    }
};  

/**
 * Controller function to retrieve all users.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>} JSON response containing an array of existing users.
 */
const getAllUsers = async (req, res) => {
    try {
        // Retrieve existing users
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        // Display possible errors
        console.error('Error retrieving users', err);
        res.status(500).send('Error retrieving users'); 
    }
};

/**
 * Controller function to retrieve a user by unique identifier.
 *
 * @param {Object} req - Express request object containing unique identifier.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>} JSON response containing the user object.
 */
const getUserById = async (req, res) => {
    // Extract unique identidier from body
    const { user_id } = req.params; 
    try {
        // Search for user object by unique identifier
        const user = await User.findById(user_id);
        if (!user) {
            // Respond with 404 error status if user not found
            return res.status(404).send('User not found');
        }

        // Return user object
        res.json(user);
    } catch (err) {
        // Display possible errors
        console.error('Error retrieving user', err); 
        res.status(500).send('Error retrieving user');
    }
}; 

/**
 * Controller function to retrieve a user by email address.
 *
 * @param {Object} req - Express request object containing email address.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>} JSON response containing the user object.
 */
const getUserByEmail = async (req, res) => {
    // Extract email address from body
    const { email } = req.params;
    try {
        // Search for user object by email address
        const user = await User.findByEmail(email);
        if (!user) {
            // Respond with 404 error status if user not found
            return res.status(404).send('User not found'); 
        }

        // Return user object
        res.json(user);
    } catch (err) {
        // Display possible errors
        console.error('Error retrieving user', err);
        res.status(500).send('Error retrieving user');
    }
}; 

/**
 * Controller function to retrieve a user by username.
 *
 * @param {Object} req - Express request object containing username.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>} JSON response containing the user object.
 */
const getUserByUsername = async (req, res) => {
    // Extract username from body
    const { username } = req.params;
    try {
        // Search for user object by username
        const user = await User.findByUsername(username);
        if (!user) {
            // Respond with 404 error status if user not found
            return res.status(404).send('User not found');
        }

        // Return user object
        res.json(user);
    } catch (err) {
        // Display possible errors
        console.error('Error retrieving user', err);
        res.status(500).send('Error retrieving user');
    }
}; 

/**
 * Controller function to update a user by unique identifier.
 *
 * @param {Object} req - Express request object containing unique identifier and updated user data.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>} JSON response containing the updated user.
 */
const updateUser = async (req, res) => {
    const { user_id } = req.params; // Extract unique identifier from body
    const { username, email, password } = req.body; // Destructure updated user data from body
    try {
        // Update user object
        const updatedUser = await User.update(user_id, username, email, password);
        if (!updatedUser) {
            // Respond with 404 error status if user not found
            return res.status(404).send('User not found');
        }
        
        // Return updated user object
        res.json(updatedUser);
    } catch (err) {
        // Display possible errors
        console.error('Error updating user', err);
        res.status(500).send('Error updating user');
    }
};

/**
 * Controller function to delete a user by unique identifier.
 *
 * @param {Object} req - Express request object containing the unique identifier.
 * @param {Object} res - Express response object.
 * 
 * @returns {Promise<void>} JSON response containing the deleted user.
 */
const deleteUser = async (req, res) => {
    // Extract unique identifier from body
    const { user_id } = req.params;
    try {
        // Delete user object
        const deletedUser = await User.delete(user_id);
        if (!deletedUser) {
            // Respond with 404 error status if user not found
            return res.status(404).send('User not found');
        }

        // Return deleted user object
        res.json(deletedUser);
    } catch (err) {
        // Display possible errors
        console.error('Error deleting user', err);
        res.status(500).send('Error deleting user');
    }
};

// Export user functions
module.exports = {
    createUser, 
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    updateUser,
    deleteUser,
};
