// Imports and configuration
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Styles
import '../styles/components/header.scss';

// Images
import Logo from '../assets/images/pngs/logo.png';
import Profile from '../assets/images/pngs/profile.png';
import Goal from '../assets/images/pngs/goal.png';

/**
 * Header component.
 * 
 * @returns {JSX.Element} Rendered header component with navigation links.
 */
const Header = () => {
    return (
        <header>
            <nav className='header-container'>
                {/* Container for navigation options */}
                <div className='merged-options-container'>
                    <div className='options-container'>
                        {/* Link to home page with logo */}
                        <Link to='/'>
                            <img src={Logo} className='icon' alt='Joop website logo' /> {/* Website logo */}
                        </Link>
                    </div>
                    <div className='options-container'>
                        <img src={Goal} className='icon' alt='Goals' /> {/* Goals icon */}
                        <Link to='/profile'>
                            <img src={Profile} className='icon' alt='Profile' /> {/* Profile icon */}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

// Export Header component across application
export default Header;