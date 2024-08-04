// Imports and configuration 
import React from 'react';

// Components
import EmailConfirmationForm from '../components/EmailConfirmationForm';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/email-confirmation.scss';

/**
 * Signup component.
 * 
 * @returns {JSX.Element} Rendered signup page component.
 */
const EmailConfirmation = () => {
    return (
        <MainLayout>
            <main className='auth-container'>
                {/* Render EmailConfirmationForm component for user register */}
                <EmailConfirmationForm />
            </main>
        </MainLayout>
    );
};

// Export Signup component across application
export default EmailConfirmation;