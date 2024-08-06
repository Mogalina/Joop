// Import Mailjet transporter
const mailjet = require('node-mailjet');

// Load environment variables from .env file
require('dotenv').config();

// Initialize Mailjet with API public and secret keys
const mailjetClient = mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

/**
 * Function to send reset password link to email address.
 *
 * @param {string} email - Receiver email address.
 * @param {string} link - Link to send.
 * 
 * @returns {Promise<void>}
 */
const sendPasswordResetRequest = async (email, link) => {
    const request = mailjetClient
        .post('send', { version: 'v3.1' }) // Mailjet API version
        .request({
            Messages: [
                {
                    From: {
                        Email: process.env.MJ_FROM_EMAIL, // Sender email address
                        Name: 'Joop', // Sender name
                    },
                    To: [
                        {
                            Email: email, // Receiver email address
                        },
                    ],
                    "TemplateID": 6187387, // Email template ID
                    "TemplateLanguage": true, // Enable placeholders in template
                    "Subject": "Account Password Reset", // Subject of email
                    "Variables": { // Additional dynamic values
                        "link": link // Link injected in email body
                    },
                },
            ],
        });

    // Send email using Mailjet
    await request;
};

// Export password reset request functions
module.exports = {
    sendPasswordResetRequest,
};
