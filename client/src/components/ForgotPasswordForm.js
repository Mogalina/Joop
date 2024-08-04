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
import '../styles/components/forgot-password-form.scss';

/**
 * Forgot password form component.
 *
 * @returns {JSX.Element} Rendered forgot password form component.
 */
const ForgotPasswordForm = () => {
    // Set document title for current page
    document.title = 'Joop | Forgot password';

    // Initialize hook for programmatic navigation
    const navigate = useNavigate();

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

    // Define input fields for signup form
    const fields = [
        { name: 'email', placeholder: 'Email', type: 'email', required: true },
    ];

    /**
     * Handles form submission.
     * 
     * @param {Object} formData - Data submitted from form.
     */
    const onSubmit = async (formData) => {
        try {
            
        } catch (error) {
            
        }
    };

     // Render forgot password form component
    return (
        <div className='forgot-password-form-container'>
            <p className='title'>Forgot password</p> {/* Forgot password form title */}
            <div className='form-container'>
                {/* Render generic form component with necessary props */}
                <GenericForm 
                    fields={fields} // Form fields
                    onSubmit={handleSubmit(onSubmit)} // Handle form submission
                    control={control} // Control for form state management
                    errors={errors} // Error state for input fields
                    buttonText="Send email" // Text for submit button
                />
            </div>
        </div>
    );
};

// Export ForgotPasswordForm component across application
export default ForgotPasswordForm;