// Import User model
const User = require('../models/User');

// Controller function to create a new user
const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await User.create(username, email, password);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).send('Error creating user');
    }
};  

// Controller function to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users', err);
        res.status(500).send('Error retrieving users');
    }
};

// Controller function to get a user by user_id
const getUserById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error('Error retrieving user', err);
        res.status(500).send('Error retrieving user');
    }
}; 

// Controller function to get a user by email
const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error('Error retrieving user', err);
        res.status(500).send('Error retrieving user');
    }
}; 

// Controller function to get a user by username
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error('Error retrieving user', err);
        res.status(500).send('Error retrieving user');
    }
}; 

// Controller function to update a user by user_id
const updateUser = async (req, res) => {
    const { user_id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedUser = await User.update(user_id, username, email, password);
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating user', err);
        res.status(500).send('Error updating user');
    }
};

// Controller function to delete a user by user_id
const deleteUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const deletedUser = await User.delete(user_id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.json(deletedUser);
    } catch (err) {
        console.err('Error deleting user', err);
        res.status(500).send('Error deleting user');
    }
};

// Export controller functions
module.exports = {
    createUser, 
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    updateUser,
    deleteUser,
};