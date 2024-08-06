// Import database connection
const db = require('../db/db');

// Import database error handler
const dbErrorHandler = require('../helpers/dbErrorHandler');

// Define ConfirmationCode model
const ConfirmationCode = {
    /**
     * Create a new confirmation code in the database.
     * 
     * @param {string} email - User email address.
     * @param {string} code - Confirmation code.
     * @param {Date} expiresAt - Expiration date for confirmation code.
     * 
     * @returns {Promise<object>} A promise that resolves with the created confirmation code object.
     */
    async create(email, code, expiresAt) {
        const queryText = `
            INSERT INTO confirmation_codes (email, code, expires_at) 
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        return dbErrorHandler(async (email, code, expiresAt) => {
            const result = await db.query(queryText, [email, code, expiresAt]);
            return result.rows[0];
        })(email, code, expiresAt);
    },

    /**
     * Retrieve a confirmation code by email from the database.
     * 
     * @param {string} email - User email address.
     * 
     * @returns {Promise<object>} A promise that resolves with the confirmation code object.
     */
    async findByEmail(email) {
        const queryText = `
            SELECT * FROM confirmation_codes 
            WHERE email = $1
        `;
        return dbErrorHandler(async (email) => {
            const result = await db.query(queryText, [email]);
            return result.rows.length > 0 ? result.rows[0] : null;
        })(email);
    },

    /**
     * Update existing confirmation code.
     * 
     * @param {string} email - User email address.
     * @param {string} code - New confirmation code.
     * @param {Date} expiresAt - New expiration date for confirmation code.
     * 
     * @returns {Promise<object>} A promise that resolves with the updated confirmation code object.
     */
    async update(email, code, expiresAt) {
        const queryText = `
            UPDATE confirmation_codes 
            SET code = $1, expires_at = $2 
            WHERE email = $3 
            RETURNING *
        `;
        return dbErrorHandler(async (code, expiresAt, email) => {
            const result = await db.query(queryText, [code, expiresAt, email]);
            return result.rows[0];
        })(code, expiresAt, email);
    },

    /**
     * Delete confirmation code by identificator.
     * 
     * @param {number} id - Identificator of the confirmation code.
     * 
     * @returns {Promise<object>} A promise that resolves with the deleted confirmation code object.
     */
    async deleteById(id) {
        const queryText = `
            DELETE FROM confirmation_codes 
            WHERE id = $1 
            RETURNING *
        `;
        return dbErrorHandler(async (id) => {
            const result = await db.query(queryText, [id]);
            return result.rows[0];
        })(id);
    },
};

// Export ConfirmationCode model
module.exports = ConfirmationCode;
