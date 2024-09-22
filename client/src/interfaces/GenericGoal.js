// Imports and configuration
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../styles/components/generic-goal.scss'

// Images
import StarIcon from '../assets/images/pngs/star.png';

/**
 * Generic Goal component.
 *
 * @param {string} title - Title of goal section.
 * @param {string} time - Time passed of goal section.
 * @returns {JSX.Element} A rendered goal section with a title and an icon.
 */
const Goal = ({ title, time }) => {
    return (
        <div className='goal'>
            {/* Display goal icon */}
            <img
                className='goal-star-icon'
                src={StarIcon}
                alt='Goal Star Icon'
            />

            {/* Display section title */}
            <p className='goal-name'>{title}</p>

            {/* Display passed time since goal was created */}
            <p className='goal-time'>{time}</p>
        </div>
    );
};

// Define prop types for Goal component
Goal.propTypes = {
    title: PropTypes.string.isRequired,      // Title of goal section is required and should be a string
    time: PropTypes.string.isRequired        // Time of goal section is required and should be a string
};

// Export Goal component across application
export default Goal;
