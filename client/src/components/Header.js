// Imports and configuration
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Styles
import '../styles/components/header.scss';

// Images
import Logo from '../assets/images/pngs/logo.png';
import Profile from '../assets/images/pngs/profile.png';
import Goal from '../assets/images/pngs/goal.png';

const Header = () => {
    return (
        <header>
            <nav className='header-container'>
                <div className='options-container'>
                    <Link to='/'>
                        <img src={Logo} className='icon' alt='Joop website logo' />
                    </Link>
                </div>
                <div className='options-container'>
                    <img src={Goal} className='icon' alt='Goals' />
                    <img src={Profile} className='icon' alt='Profile' />
                </div>
            </nav>
        </header>
    );
};

// Export header function
export default Header;