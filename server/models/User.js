// Import database connection
const db = require('../db/db');

// Import database error handler
const dbErrorHandler = require('../helpers/dbErrorHandler');

// Import password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Define User model schema
const User = {
    /**
     * Create a new user in the database.
     * 
     * @param {string} username - Username of the new user.
     * @param {string} email - Email address of the new user.
     * @param {string} password - Password of the new user.
     * 
     * @returns {Promise<object>} A promise that resolves with the created user object.
     */
    async create(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const queryText = `
            INSERT INTO Users (username, email, password, first_login, last_login)
            VALUES ($1, $2, $3, NOW(), NOW())
            RETURNING *
        `;
        return dbErrorHandler(async (username, email, hashedPassword) => {
            const result = await db.query(queryText, [username, email, hashedPassword]);
            return result.rows[0];
        })(username, email, hashedPassword);
    },

    /**
     * Retrieve all users from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves with an array of user objects.
     */
    async findAll() {
        const queryText = `
            SELECT * FROM Users
        `;
        return dbErrorHandler(async () => {
            const result = await db.query(queryText);
            return result.rows;
        })();
    },

    /**
     * Retrieve a user by user_id from the database.
     * 
     * @param {number} userId - ID of the user to retrieve.
     * 
     * @returns {Promise<object>} A promise that resolves with the user object.
     */
    async findById(userId) {
        const queryText = `
            SELECT * FROM Users 
            WHERE user_id = $1
        `;
        return dbErrorHandler(async (userId) => {
            const result = await db.query(queryText, [userId]);
            return result.rows[0];
        })(userId);
    },

    /**
     * Retrieve a user by email from the database.
     * 
     * @param {string} email - Email of the user to retrieve.
     * 
     * @returns {Promise<object>} A promise that resolves with the user object.
     */
    async findByEmail(email) {
        const queryText = `
            SELECT * FROM Users 
            WHERE email = $1
        `;
        return dbErrorHandler(async (email) => {
            const result = await db.query(queryText, [email]);
            return result.rows[0];
        })(email);
    },

    /**
     * Retrieve a user by username from the database.
     * 
     * @param {string} username - Username of the user to retrieve.
     * 
     * @returns {Promise<object>} A promise that resolves with the user object.
     */
    async findByUsername(username) {
        const queryText = `
            SELECT * FROM Users 
            WHERE username = $1
        `;
        return dbErrorHandler(async (username) => {
            const result = await db.query(queryText, [username]);
            return result.rows[0];
        })(username);
    },

    /**
     * Update a user in the database.
     * 
     * @param {number} userId - ID of the user to update.
     * @param {string} username - New username of the new user.
     * @param {string} email - New email address of the new user.
     * @param {string} password - New password of the new user.
     * 
     * @returns {Promise<Object>} A promise that resolves with the updated user object.
     */
    async update(userId, username, email, password) {
        const queryText = `
            UPDATE Users SET 
            username = $1, email = $2, password = $3, last_login = NOW() 
            WHERE user_id = $4 
            RETURNING *
        `;
        return dbErrorHandler(async (username, email, password, userId) => {
            const result = await db.query(queryText, [username, email, password, userId]);
            return result.rows[0];
        })(username, email, password, userId);
    },

    /**
     * Update user email confirmation status.
     * 
     * @param {string} email - Email of user to update.
     * 
     * @returns {Promise<Object>} A promise that resolves with the updated user object.
     */
    async confirmEmail(email) {
        const queryText = `
            UPDATE Users SET 
            is_confirmed = TRUE 
            WHERE email = $1 
            RETURNING *
        `;
        return dbErrorHandler(async (email) => {
            const result = await db.query(queryText, [email]);
            return result.rows[0];
        })(email);
    },

    /**
     * Update user last login time.
     * 
     * @param {string} email - Email of user to update.
     * 
     * @returns {Promise<Object>} A promise that resolves with the updated user object.
     */
    async updateLastLogin(email) {
        const queryText = `
            UPDATE Users SET
            last_login = NOW() 
            WHERE email = $1
            RETURNING *
        `;
        return dbErrorHandler(async (email) => {
            const result = await db.query(queryText, [email]);
            return result.rows[0];
        })(email);
    },

    /**
     * Delete a user from the database.
     * 
     * @param {number} userId - ID of the user to delete. 
     * 
     * @returns {Promise<object>} A promise that resolves with the deleted user object.
     */
    async delete(userId) {
        const queryText = `
            DELETE FROM Users
            WHERE user_id = $1
            RETURNING *
        `;
        return dbErrorHandler(async (userId) => {
            const result = await db.query(queryText, [userId]);
            return result.rows[0];
        })(userId);
    },
};

// Export User model
module.exports = User;