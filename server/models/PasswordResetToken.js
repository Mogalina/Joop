// Import database connection
const db = require('../db/db');

// Import database error handler
const dbErrorHandler = require('../helpers/dbErrorHandler');

// Define PasswordResetToken mdoel
const PasswordResetToken = {
    /**
     * Create new password reset token in the database.
     * 
     * @param {number} userId - User identifier.
     * @param {string} token - Password reset token.
     * @param {Date} expiresAt - Expiration date for password reset token.
     * 
     * @returns {Promise<object>} A promise that resolves with the created password reset token object.
     */
    async create(userId, token, expiresAt) {
        const queryText = `
            INSERT INTO password_reset_tokens (user_id, token, expires_at, created_at)
            VALUES ($1, $2, $3, NOW())
            RETURNING *
        `;
        return dbErrorHandler(async (userId, token, expiresAt) => {
            const result = await db.query(queryText, [userId, token, expiresAt]);
            return result.rows[0];
        })(userId, token, expiresAt);
    },

    /**
     * Retrieve password reset token by token from the database.
     * 
     * @param {string} token - Password reset token.
     * 
     * @returns {Promise<object>} A promise that resolves with the password reset token object.
     */
    async findByToken(token) {
        const queryText = `
            SELECT * FROM password_reset_tokens 
            WHERE token = $1
        `;
        return dbErrorHandler(async (token) => {
            const result = await db.query(queryText, [token]);
            return result.rows.length > 0 ? result.rows[0] : null;
        })(token);
    },

    /**
     * Retrieve password reset token by user ID from the database.
     * 
     * @param {string} userId - User ID.
     * 
     * @returns {Promise<object>} A promise that resolves with the password reset token object.
     */
     async findByUserId(userId) {
        const queryText = `
            SELECT * FROM password_reset_tokens 
            WHERE user_id = $1
        `;
        return dbErrorHandler(async (userId) => {
            const result = await db.query(queryText, [userId]);
            return result.rows.length > 0 ? result.rows[0] : null;
        })(userId);
    },

    /**
     * Delete password reset tokens by user identifier.
     * 
     * @param {number} userId - User identifier.
     * 
     * @returns {Promise<object>} A promise that resolves with the deleted password reset token object.
     */
    async deleteByUserId(userId) {
        const queryText = `
            DELETE FROM password_reset_tokens 
            WHERE user_id = $1 
            RETURNING *
        `;
        return dbErrorHandler(async (userId) => {
            const result = await db.query(queryText, [userId]);
            return result.rows[0];
        })(userId);
    },
};

// Export PasswordResetToken model
module.exports = PasswordResetToken;