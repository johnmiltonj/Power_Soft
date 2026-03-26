import React from 'react';

const Select = React.forwardRef(({
    label,
    error,
    id,
    options = [],
    className = '',
    ...props
}, ref) => {
    const selectId = id || Math.random().toString(36).substr(2, 9);

    return (
        <div className={`mb-3 ${className}`}>
            {label && <label htmlFor={selectId} className="form-label fw-bold">{label}</label>}
            <select
                id={selectId}
                ref={ref}
                className={`form-select ${error ? 'is-invalid' : ''}`}
                {...props}
            >
                <option value="" disabled>Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
});

Select.displayName = 'Select';
export default Select;
