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
import '../styles/components/signup-form.scss';

/**
 * Signup form component.
 *
 * @returns {JSX.Element} Rendered signup form component.
 */
const SignupForm = () => {
    // Set document title for current page
    document.title = 'Joop | Create account';

    // Initialize hook for programmatic navigation
    const navigate = useNavigate();

    // Define validation schema for signup form fields
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .matches(/^[A-Za-z0-9]+$/, 'Username must contain letters or numbers') // Username required characters
            .required('Username is required'), // Mark username as required field
        email: Yup.string()
            .email('Invalid email address format') // Validate email format
            .required('Email address is required'), // Mark email as required field
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters') // Minimum password length
            .required('Password is required'), // Mark password as required field
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match') // Match passwords
            .required('Passwords must match') // Mark confirm password as required field
    });

    // Destructure useForm hook methods
    const { handleSubmit, setError, formState: { errors }, control } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // Define input fields for signup form
    const fields = [
        { name: 'username', placeholder: 'Username', required: true },
        { name: 'email', placeholder: 'Email', type: 'email', required: true },
        { name: 'password', placeholder: 'Password', type: 'password', required: true },
        { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password', required: true },
    ];

    /**
     * Handles form submission.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const onSubmit = async (formData) => {
        try {
            // Send registration data to server with POST request
            const response = await axios.post('http://localhost:3001/api/register', formData);

            // Check if registration was successful
            if (response.status === 201) {
                // Redirect user to login page
                navigate('/login');
            }
        } catch (error) {
            // Check for validation errors
            if (error.response && error.response.data && error.response.data.message) {
                // Destructure and extract error message from server response
                const { message } = error.response.data;
                if (message.includes('Email address already exists')) {
                    // Set email error if already exists
                    setError('email', { message });
                } else if (message.includes('Username already exists')) {
                    // Set username error if already exists
                    setError('username', { message });
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

    // Render signup form component
    return (
        <div className='signup-form-container'>
            <p className='title'>Create account</p> {/* Signup form title */}
            <div className='form-container'>
                {/* Render generic form component with necessary props */}
                <GenericForm 
                    fields={fields} // Form fields
                    onSubmit={handleSubmit(onSubmit)} // Handle form submission
                    control={control} // Control for form state management
                    errors={errors} // Error state for input fields
                    buttonText="Continue" // Text for submit button
                />
                <div className='login-switch-container'>
                    Member of our community?
                    {/* Link to login page for users already registered */}
                    <Link className='goto-login' to='/login'> Connect</Link>
                </div>
            </div>
        </div>
    );
};

// Export SignupForm component across application
export default SignupForm;
