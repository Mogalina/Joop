// Imports and configuration 
import React from 'react';

// Components
import ForgotPasswordForm from '../components/ForgotPasswordForm';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/forgot-password.scss';

/**
 * ForgotPassword component.
 * 
 * @returns {JSX.Element} Rendered forgot password page component.
 */
const ForgotPassword = () => {
    return (
        <MainLayout>
            <main className='auth-container'>
                <ForgotPasswordForm />
            </main>
        </MainLayout>
    );
};

// Export forgot password page function
export default ForgotPassword;