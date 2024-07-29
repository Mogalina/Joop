// Imports and configuration 
import React from 'react';

// Components
import LoginForm from '../components/LoginForm';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/login.scss';

const Login = () => {
    return (
        <MainLayout>
            <main className='auth-container'>
                <LoginForm />
            </main>
        </MainLayout>
    );
};

// Export login page function
export default Login;