// Imports and configuration 
import React from 'react';

// Components
import ResetPasswordForm from '../components/ResetPasswordForm';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/reset-password.scss';

/**
 * ResetPassword component.
 * 
 * @returns {JSX.Element} Rendered reset password page component.
 */
const ResetPassword = () => {
    return (
        <MainLayout>
            <main className='auth-container'>
                <ResetPasswordForm />
            </main>
        </MainLayout>
    );
};

// Export reset password page function
export default ResetPassword;