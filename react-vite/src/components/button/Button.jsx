import React, { useMemo, useState } from 'react';

const Button = React.memo(function Button({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    count,
    ...props
}) {
    const [isDisabled, setIsDisabled] = useState(disabled);

    useMemo(() => {
        if (count > 5) setIsDisabled(true);
    }, [count]);

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`btn ${className}`}
            {...props}
        >
            {children}
        </button>
    );
});

export default Button;