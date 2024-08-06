// Imports and configuration 
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/forgot-password-form.scss';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Request account password reset form component.
 *
 * @returns {JSX.Element} Rendered forgot password form component.
 */
const ForgotPasswordForm = () => {
    // Set document title for current page
    document.title = 'Joop | Forgot password';

    // Define validation schema for forgot password form fields
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address format') // Validate email format
            .required('Email address is required'), // Mark email as required field
    });

    // Destructure useForm hook methods
    const { handleSubmit, setError, formState: { errors }, control } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // Define input fields for request account password reset form
    const fields = [
        { name: 'email', placeholder: 'Email', type: 'email', required: true },
    ];

    /**
     * Handles form submission for password reset.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const onSubmit = async (formData) => {
        // Handle promise and show notifications
        toast.promise(
            axios.post('http://localhost:3001/api/auth/request-reset-password', formData), // Configure promise for password reset
            {
                pending: 'Sending password reset link...', // Message while pending
                success: {
                    render() {
                        // Return success message
                        return 'Password reset link sent to your email.'; 
                    },
                    onClose: () => {
                        // Additional user redirecting
                    },
                },
                error: {
                    render({ data }) {
                        // Display error message
                        return data.response ? data.response.data.message : 'Failed to send password reset link';
                    },
                },
            }
        );
    };

    // Render account password reset form component
    return (
        <div className='forgot-password-form-container'>
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
            <p className='title'>Forgot password</p> {/* Forgot password form title */}
            <div className='form-container'>
                {/* Render generic form component with necessary props */}
                <GenericForm 
                    fields={fields} // Form fields
                    onSubmit={handleSubmit(onSubmit)} // Handle form submission
                    control={control} // Control for form state management
                    errors={errors} // Error state for input fields
                    buttonText="Continue" // Text for submit button
                />
            </div>
        </div>
    );
};

// Export ForgotPasswordForm component across application
export default ForgotPasswordForm;
