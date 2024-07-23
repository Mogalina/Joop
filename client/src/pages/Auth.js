// Imports and configuration 
import React from 'react';

// Components
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/auth.scss';

const Auth = () => {
    return (
        <MainLayout>
            <main className='auth-container'>
                <SignupForm /> 
            </main>
        </MainLayout>
    );
};

// Export authentification function
export default Auth;