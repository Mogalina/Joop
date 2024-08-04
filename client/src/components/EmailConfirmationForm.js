// Imports and configuration 
import React from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/email-confirmation-form.scss';

/**
 * Email code confirmation form component.
 *
 * @returns {JSX.Element} Rendered signup form component.
 */
const EmailConfirmationForm = () => {
    // Set document title for current page
    document.title = 'Joop | Verify email';

    // Initialize hook for programmatic navigation
    const navigate = useNavigate();

    // Define validation schema for signup form fields
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address format') // Validate email format
            .required('Email address is required'), // Mark email as required field
        confirmationCode: Yup.string()
            .length(6, 'Verification code must be 6 characters') // Exact length of code
            .required('Verification code is required') // Mark code as required field
    });

    // Destructure useForm hook methods
    const { handleSubmit, setError, formState: { errors }, control, getValues } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // Define input fields for signup form
    const fields = [
        { name: 'email', placeholder: 'Email', type: 'email', required: true },
        { name: 'confirmationCode', placeholder: 'Confirmation code', required: true },
    ];

    /**
     * Handles form submission.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const onSubmit = async (formData) => {
        try {
            // Send data to server with POST request
            const response = await axios.post('http://localhost:3001/api/auth/email-confirmation', formData);

            // Check if confirmation code send was successful
            if (response.status === 200) {
                // Redirect user to login page
                navigate('/login');
            }
        } catch (error) {
            // Check for validation errors
            if (error.response && error.response.data && error.response.data.message) {
                // Destructure and extract error message from server response
                const { message } = error.response.data;
                if (message.includes('Invalid or expired confirmation code')) {
                    // Set confirmation code error
                    setError('confirmationCode', { message });
                } else {
                    // Display other possible errors
                    console.error('Error:', error);
                }
            } else {
                // Display unexpected errors
                console.error('Error:', error);
            }
        }
    };

    /**
     * Resend confirmation code on email address.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const resendConfirmationCode = async (formData) => {
        try {
            // Send email address to server
            const response = await axios.post('http://localhost:3001/api/auth/resend-confirmation-code', formData);

            // Check if confirmation code reset was successful
            if (response.status === 200) {
                alert('New confirmation code has been sent to your email.');
            }
        } catch (error) {
            // Handle any errors
            if (error.response && error.response.data && error.response.data.message) {
                // Display possible errors
                console.error('Error:', error.response.data.message);
                alert(error.response.data.message); // Alert user about the error
            } else {
                // Display unexpected errors
                console.error('Error:', error);
            }
        }
    };

    // Render email confirmation form component
    return (
        <div className='email-confirmation-form-container'>
            <p className='title'>Verify email</p> {/* Email confirmation form title */}
            <div className='form-container'>
                {/* Render generic form component with necessary props */}
                <GenericForm 
                    fields={fields} // Form fields
                    onSubmit={handleSubmit(onSubmit)} // Handle form submission
                    control={control} // Control for form state management
                    errors={errors} // Error state for input fields
                    buttonText="Continue" // Text for submit button
                />
                <div className='send-code-container'>
                    Did not receive the code?
                    {/* Resend confirmation code */}
                    <span className='send-code' onClick={() => resendConfirmationCode(getValues())}> Send again</span>
                </div>
            </div>
        </div>
    );
};

// Export EmailConfirmationForm component across application
export default EmailConfirmationForm;
