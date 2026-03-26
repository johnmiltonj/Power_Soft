import React from 'react';

const Input = React.forwardRef(({
    label,
    error,
    id,
    className = '',
    type = 'text',
    ...props
}, ref) => {
    const inputId = id || Math.random().toString(36).substr(2, 9);

    return (
        <div className={`mb-3 ${className}`}>
            {label && <label htmlFor={inputId} className="form-label fw-bold">{label}</label>}
            <input
                id={inputId}
                ref={ref}
                type={type}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                {...props}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
