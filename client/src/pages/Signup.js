// Imports and configuration 
import React from 'react';

// Components
import SignupForm from '../components/SignupForm';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/signup.scss';

/**
 * Signup component.
 * 
 * @returns {JSX.Element} Rendered signup page component.
 */
const Signup = () => {
    return (
        <MainLayout>
            <main className='auth-container'>
                {/* Render SignupForm component for user register */}
                <SignupForm />
            </main>
        </MainLayout>
    );
};

// Export Signup component across application
export default Signup;