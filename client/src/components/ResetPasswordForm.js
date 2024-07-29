// Imports and configuration 
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/reset-password-form.scss';

const ForgotPasswordForm = () => {
    document.title = 'Joop | Reset password';

    const fields = [
        { name: 'password', placeholder: 'New Password', type: 'password', required: true },
        { name: 'confirm-password', placeholder: 'Confirm New Password', type: 'password', required: true },
    ];

    const handleSubmit = (formData) => {
        console.log('Reset Password Form Data:', formData);
    };

    return (
        <div className='reset-password-form-container'>
            <p className='title'>Reset password</p>
            <div className='form-container'>
                <GenericForm 
                    fields={fields}
                    onSubmit={handleSubmit}
                    buttonText="Confirm"
                />
            </div>
        </div>
    );
};

// Export reset password form function
export default ForgotPasswordForm;