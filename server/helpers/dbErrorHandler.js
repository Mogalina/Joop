// Define database error handler
const dbErrorHandler = (errorFunction) => async (...params) => {
    try {
        return await errorFunction(...params);
    } catch (err) {
        console.error(`Database error: ${err.message}`);
        throw new Error(`Database operation failed: ${err.message}`);
    }
};

// Export database error handler
module.exports = dbErrorHandler;
