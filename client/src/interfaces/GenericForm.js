// Imports and configuration
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

// Images
import Visible from '../assets/images/pngs/visible.png'
import Invisible from '../assets/images/pngs/invisible.png'

// Styles
import '../styles/components/generic-form.scss';

/**
 * Generic Form component.
 * 
 * @param {Array} fields - Array of field objects.
 * @param {Function} onSubmit - Function to handle form submission.
 * @param {React.ReactNode} children - Child components to be rendered.
 * @param {string} buttonText - Custom text to display on submit button.
 * @param {Object} control - Control object for managing form state.
 * @param {Object} errors - Errors object for displaying validation errors.
 */
const GenericForm = ({ fields, onSubmit, children, buttonText, control, errors }) => {
    // State manager for password visibility
    const [visible, setVisible] = useState({});

    // Function to toggle password visibility
    const toggleVisible = (fieldName) => {
        setVisible((prevVisible) => ({
            ...prevVisible,
            [fieldName]: !prevVisible[fieldName]
        }));
    };

    // Render generic form component
    return (
        <form onSubmit={onSubmit} noValidate>
            {/* Map array fields to form fields */}
            {fields.map((field) => (
                <div key={field.name} className='form-item'>
                    {/* Input field label description */}
                    <label htmlFor={field.name}>{field.label}</label>
                    {/* React hook for managing field state */}
                    <Controller
                        name={field.name}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                {/* Define input attributes */}
                                <input
                                    type={field.type === 'password' && visible[field.name] ? 'text' : field.type || 'text'}
                                    id={field.name}
                                    value={value}
                                    placeholder={field.placeholder || ''}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required={field.required || false}
                                    autoComplete='off'
                                />
                                {/* Display change visibility icon if input is password */}
                                {field.type === 'password' && (
                                    <img
                                        src={visible[field.name] ? Visible : Invisible }
                                        alt={visible[field.name] ? 'Hide Password' : 'Show Password'}
                                        onClick={() => toggleVisible(field.name)}
                                        className='toggle-password-visible'
                                    />
                                )}
                                {/* Display validation error message if present */}
                                {errors[field.name] && <p className='error-message'>{errors[field.name].message}</p>}
                            </>
                        )}
                    />
                </div>
            ))}
            {/* Render additional children elements */}
            {children}
            {/* Form submit button with custom text */}
            <button className='btn-submit' type='submit'>{buttonText || 'Submit'}</button>
        </form>
    );
};

// Export GenericForm component across application
export default GenericForm;
