// Imports and configuration 
import React from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/email-confirmation-form.scss';
import 'react-toastify/dist/ReactToastify.css';

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
     * Handles form submission for email confirmation.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const onSubmit = async (formData) => {
        // Handle promise and show notifications
        toast.promise(
            axios.post('http://localhost:3001/api/auth/email-confirmation', formData), // Configure promise for email confirmation
            {
                pending: 'Confirming email...', // Message while pending
                success: {
                    render() {
                        // Return success message
                        return 'Successfully confirmed email. Redirecting to login...'; 
                    },
                    onClose: () => navigate('/login'), // Redirect user on successful confirmation
                },
                error: {
                    render({ data }) {
                        // Display error message
                        return data.response ? data.response.data.message : 'Email confirmation failed';
                    },
                },
            }
        );
    };

    /**
     * Resend confirmation code on email address.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const resendConfirmationCode = async (formData) => {
        // Handle promise and show notifications
        toast.promise(
            axios.post('http://localhost:3001/api/auth/resend-confirmation-code', formData), // Configure promise
            {
                pending: 'Resending confirmation code...', // Message while pending
                success: {
                    render() {
                        // Return success message
                        return 'New confirmation code send to your email.'; 
                    },
                },
                error: {
                    render({ data }) {
                        // Display error message
                        return data.response ? data.response.data.message : 'Failed to resend confirmation code';
                    },
                },
            }
        );
    };

    // Render email confirmation form component
    return (
        <div className='email-confirmation-form-container'>
            {/* Configure react-toastify container */}
            <ToastContainer 
                position="top-center" 
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
                transition={Bounce}
            />
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
