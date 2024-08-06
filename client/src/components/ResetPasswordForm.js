// Imports and configuration 
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/reset-password-form.scss';

/**
 * Reset password form component.
 *
 * @returns {JSX.Element} Rendered forgot password form component.
 */
const ResetPasswordForm = () => {
    // Extract search parameters from URL
    const [searchParams] = useSearchParams();

    // Get token from URL search parameters
    const token = searchParams.get('token');

    // Set document title for current page
    document.title = 'Joop | Reset Password';

    // Initialize hook for programmatic navigation
    const navigate = useNavigate();

    // Define validation schema for forgot password form fields
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters') // Minimum password length
            .required('Password is required'), // Mark password as required field
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match') // Match passwords
            .required('Confirm Password is required') // Mark confirm password as required field
    });

    // Destructure useForm hook methods
    const { handleSubmit, setError, formState: { errors }, control } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // Define input fields for reet password form
    const fields = [
        { name: 'password', placeholder: 'New Password', type: 'password', required: true },
        { name: 'confirmPassword', placeholder: 'Confirm New Password', type: 'password', required: true },
    ];

    /**
     * Handles form submission.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const onSubmit = async (formData) => {
        try {
            // Send reset password data to server
            const response = await axios.post('http://localhost:3001/api/auth/reset-password', {
                token,
                newPassword: formData.password,
            });

            // Check if password reset was successful
            if (response.status === 200) {
                // Notify user on updates and actions
                alert('Password has been reset successfully.');
                // Redirect user to login page
                navigate('/login');
            }
        } catch (error) {
            // Handle errors from the server
            if (error.response && error.response.data && error.response.data.message) {
                // Display error message from server response
                if (error.response.data.message === 'Invalid or expired token') {
                    alert('Password reset link expired. Send a request again.');
                }
            } else {
                console.error('Error:', error);
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };

    // Render reset password form component
    return (
        <div className='reset-password-form-container'>
            <p className='title'>Reset password</p> {/* Reset password form title */}
            <div className='form-container'>
                {/* Render generic form component with necessary props */}
                <GenericForm 
                    fields={fields} // Form fields
                    onSubmit={handleSubmit(onSubmit)} // Handle form submission
                    control={control} // Control for form state management
                    errors={errors} // Error state for input fields
                    buttonText="Confirm" // Text for submit button
                />
            </div>
        </div>
    );
};

// Export ResetPasswordForm component across application
export default ResetPasswordForm;
