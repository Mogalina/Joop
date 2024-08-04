// Imports and configuration 
import React from 'react';

// Components
import LoginForm from '../components/LoginForm';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/login.scss';

/**
 * Login component.
 * 
 * @returns {JSX.Element} Rendered login page component.
 */
const Login = () => {
    return (
        <MainLayout>
            <main className='auth-container'>
                {/* Render LoginForm component for user login */}
                <LoginForm />
            </main>
        </MainLayout>
    );
};

// Export Login component across application
export default Login;