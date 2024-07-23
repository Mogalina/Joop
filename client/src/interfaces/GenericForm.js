// Imports and configuration
import React, { useState } from 'react';

/**
 * GenericForm component.
 * 
 * @param {Array} fields - Array of field objects.
 * @param {Function} onSubmit - Function to handle form submission.
 * @param {React.ReactNode} children - Child components to be rendered.
 * @param {string} buttonText - Custom text to display on submit button.
 */
const GenericForm = ({ fields, onSubmit, children, buttonText }) => {
    // State to store form data
    const [formData, setFormData] = useState({});

    /**
     * Handle input change.
     * 
     * @param {Object} e - Event object representing the input change.
     */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    /**
     * Handle form submission.
     * 
     * @param {Object} e - Event object representing the form submission.
     */
    const handleSubmit = (e) => {   
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name} className='form-item'>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type={field.type || 'text'}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        placeholder={field.placeholder || ''}
                        onChange={handleChange} 
                        required={field.required || false}
                        autoComplete="off"
                    />
                </div>
            ))}
            {children}
            <button className='btn-submit'type='submit'>{buttonText || 'Submit'}</button>
        </form>
    );
};

// Export generic form function
export default GenericForm;
