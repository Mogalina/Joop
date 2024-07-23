// Imports and configuration 
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Interfaces
import GenericForm from '../interfaces/GenericForm';

// Styles
import '../styles/components/login-form.scss';

const SignupForm = () => {
    document.title = 'Joop | Enter the Club';

    const fields = [
        { name: 'email', placeholder: 'Email', type: 'email', required: true },
        { name: 'password', placeholder: 'Password', type: 'password', required: true },
    ];

    const handleSubmit = (formData) => {
        console.log('Login Form Data:', formData);
    };

    return (
        <div className='login-form-container'>
            <p className='title'>Hello friend</p>
            <div className='form-container'>
                <GenericForm 
                    fields={fields}
                    onSubmit={handleSubmit}
                    buttonText="Continue"
                >
                    <div className='form-help-container'>
                        <div className='remember-me-container'>
                            <input type='checkbox' className='remember-btn' name='remember-me' value='remember-btn' />
                            <label for='remember-btn'>Remember me</label>
                        </div>
                        <a href=''>Forgot Password</a>
                    </div>
                </GenericForm>
                <div className='signup-switch-container'>
                    New member? 
                    <Link className='goto-signup' to='/authentificate/signup'> Create account</Link>
                </div>
            </div>
        </div>
    );
};

// Export signup form function
export default SignupForm;