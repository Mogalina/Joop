// Imports and configuration 
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/signup-form.scss';

const SignupForm = () => {
    document.title = 'Joop | Join the Club';

    const fields = [
        { name: 'username', placeholder: 'Username', required: true },
        { name: 'email', placeholder: 'Email', type: 'email', required: true },
        { name: 'password', placeholder: 'Password', type: 'password', required: true },
        { name: 'confirm-password', placeholder: 'Confirm Password', type: 'password', required: true },
    ];

    const handleSubmit = (formData) => {
        console.log('Signup Form Data:', formData);
    };

    return (
        <div className='signup-form-container'>
            <p className='title'>Join the Club</p>
            <div className='form-container'>
                <GenericForm 
                    fields={fields}
                    onSubmit={handleSubmit}
                    buttonText="Continue"
                />
                <div className='login-switch-container'>
                    Member of our community? 
                    <Link className='goto-login' to='/authentificate/login'> Connect</Link>
                </div>
            </div>
        </div>
    );
};

// Export signup form function
export default SignupForm;