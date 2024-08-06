// Imports and configuration 
import React from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

// Layout components
import MainLayout from '../layouts/MainLayout';

// Styles
import 'react-toastify/dist/ReactToastify.css';

/**
 * Home component.
 * 
 * @returns {JSX.Element} Rendered home page component.
 */
const Home = () => {
    return (
        <MainLayout>
            <main className='home-page-container'>
                
            </main>
        </MainLayout>
    );
};

// Export Home component across application
export default Home;