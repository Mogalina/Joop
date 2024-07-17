// Import Pool class to manage PostgreSQL connections
const { Pool } = require('pg');

// Load environment variables from .env file
require('dotenv').config();

// Manage PostgreSQL connections
const pool = new Pool({
    user: process.env.DB_USER, 
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Add debug logging to inspect connection parameters
console.log(`Connecting to PostgreSQL with 
    user: ${process.env.DB_USER}, 
    host: ${process.env.DB_HOST}, 
    database: ${process.env.DB_NAME}
`);

//Set up error handler for PostgreSQL connection pool
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Export module to execute SQL queries
module.exports = {
    /**
     * Executes a SQL query using the PostgreSQL connection pool.
     * 
     * @param {string} text - SQL query string to execute.
     * @param {Array} params - Optional parameters used in prepared statements.
     * 
     * @returns {Promise} A promise that resolves with the query result.
     */
    query: (text, params) => pool.query(text, params),
};