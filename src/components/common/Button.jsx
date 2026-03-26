import React from 'react';

const Button = React.forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}, ref) => {
    const sizeClass = size === 'md' ? '' : `btn-${size}`;
    return (
        <button
            ref={ref}
            className={`btn btn-${variant} ${sizeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';
export default Button;
