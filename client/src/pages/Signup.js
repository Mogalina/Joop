// Imports and configuration 
import React from 'react';

// Components
import SignupForm from '../components/SignupForm';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import '../styles/pages/signup.scss';

const Signup = () => {
    return (
        <MainLayout>
            <main className='auth-container'>
                <SignupForm />
            </main>
        </MainLayout>
    );
};

// Export signup page function
export default Signup;