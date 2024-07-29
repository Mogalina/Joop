// Imports and configuration 
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/forgot-password-form.scss';

const ForgotPasswordForm = () => {
    document.title = 'Joop | Forgot password';

    const fields = [
        { name: 'email', placeholder: 'Email', type: 'email', required: true },
    ];

    const handleSubmit = (formData) => {
        console.log('Forgot Password Form Data:', formData);
    };

    return (
        <div className='forgot-password-form-container'>
            <p className='title'>Forgot password</p>
            <div className='form-container'>
                <GenericForm 
                    fields={fields}
                    onSubmit={handleSubmit}
                    buttonText="Send email"
                />
            </div>
        </div>
    );
};

// Export signup form function
export default ForgotPasswordForm;