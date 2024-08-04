// Imports and configuration
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/login-form.scss';

/**
 * Login form component.
 *
 * @returns {JSX.Element} Rendered login form component.
 */
const LoginForm = () => {
    // Set document title for current page
    document.title = 'Joop | Connect to account';

    // Initialize hook for programmatic navigation
    const navigate = useNavigate();

    // Define validation schema for login form fields
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address format') // Validate email format
            .required('Email address is required'), // Mark email as required field
        password: Yup.string()
            .required('Password is required') // Mark password as required field
    });

    // Destructure useForm hook methods
    const { handleSubmit, setError, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // Define input fields for login form
    const fields = [
        { name: 'email', placeholder: 'Email', type: 'email', required: true },
        { name: 'password', placeholder: 'Password', type: 'password', required: true },
    ];

    /**
     * Handles form submission.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const onSubmit = async (formData) => {
        try {
            // Send submission data to server with POST request
            const response = await axios.post('http://localhost:3001/api/auth/login', formData);

            // Check if login was successful
            if (response.status === 200) {
                // Store token in local storage
                localStorage.setItem('authToken', response.data.token);

                // Redirect user to home page
                navigate('/');
            }
        } catch (error) {
            // Check for validation errors
            if (error.response && error.response.data) {
                // Destructure and extract error message from server response
                const { message } = error.response.data;
                if (message.includes('Invalid email or password')) {
                    setError('email', { message }); // Set email error if submission fails
                    setError('password', { message }); // Set password error if submission fails
                } else {
                    // Display unexpected errors
                    console.error('Error:', error);  
                }
            }
        }
    };

    // Render login form component
    return (
        <div className='login-form-container'>
            <p className='title'>Access account</p> {/* Login form title */}
            <div className='form-container'>
                {/* Render generic form component with necessary props */}
                <GenericForm 
                    fields={fields} // Form fields
                    onSubmit={handleSubmit(onSubmit)} // Handle form submission
                    control={control} // Control for form state management
                    errors={errors} // Error state for input fields
                    buttonText="Continue" // Text for submit button
                >
                    <div className='form-help-container'>
                        <div className='remember-me-container'>
                            {/* Remember me functionality */}
                            <input type='checkbox' className='remember-btn' name='remember-me' value='remember-btn' />
                            <label htmlFor='remember-btn'>Remember me</label>
                        </div>
                        {/* Link to forgot password page */}
                        <Link to='/forgot-password' target='_blank'>Forgot Password</Link>
                    </div>
                </GenericForm>
                <div className='signup-switch-container'>
                    Don't have an account?
                    {/* Link to signup page for users who do not have an account */}
                    <Link className='goto-signup' to='/signup'> Create account</Link>
                </div>
            </div>
        </div>
    );
};

// Export LoginForm component across application
export default LoginForm;