// Import Mailjet transporter
const mailjet = require('node-mailjet');

// Load environment variables from .env file
require('dotenv').config();

// Initialize Mailjet with API public and secret keys
const mailjetClient = mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE,
);

// Function to generate a random confirmation code with 6 characters (letters and digits only)
const generateConfirmationCode = async () => {
    // Available code characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let confirmationCode = '';

    // Generate the confirmation code
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        confirmationCode += characters[randomIndex];
    }

    return confirmationCode;
};

/**
 * Function to send confirmation code to email address.
 *
 * @param {string} email - Receiver email address.
 * @param {string} confirmationCode - Confirmation code to send.
 * 
 * @returns {Promise<void>}
 */
const sendConfirmationEmail = async (email, confirmationCode) => {
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
                    "TemplateID": 6187335, // Email template ID
                    "TemplateLanguage": true, // Enable placeholders in template
                    "Subject": "Account Confirmation Code", // Subject of email
                    "Variables": { // Additional dynamic values
                        "code": confirmationCode // Confirmation code injected in email body
                    },
                },
            ],
        });

    // Send email using Mailjet
    await request;
};

// Export email confirmation functions
module.exports = {
    sendConfirmationEmail,
    generateConfirmationCode,
};
