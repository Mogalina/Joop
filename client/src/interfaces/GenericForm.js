// Imports and configuration
import React from 'react';
import { Controller } from 'react-hook-form';

/**
 * GenericForm component.
 * 
 * @param {Array} fields - Array of field objects.
 * @param {Function} onSubmit - Function to handle form submission.
 * @param {React.ReactNode} children - Child components to be rendered.
 * @param {string} buttonText - Custom text to display on submit button.
 * @param {Object} control - Control object for managing form state.
 * @param {Object} errors - Errors object for displaying validation errors.
 */
const GenericForm = ({ fields, onSubmit, children, buttonText, control, errors }) => {
    return (
        <form onSubmit={onSubmit} noValidate>
            {fields.map((field) => (
                <div key={field.name} className='form-item'>
                    <label htmlFor={field.name}>{field.label}</label>
                    <Controller
                        name={field.name}
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <input
                                    type={field.type || 'text'}
                                    id={field.name}
                                    value={value}
                                    placeholder={field.placeholder || ''}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    required={field.required || false}
                                    autoComplete="off"
                                />
                                {errors[field.name] && <p className="error-message">{errors[field.name].message}</p>}
                            </>
                        )}
                    />
                </div>
            ))}
            {children}
            <button className='btn-submit' type='submit'>{buttonText || 'Submit'}</button>
        </form>
    );
};

// Export generic form function
export default GenericForm;
