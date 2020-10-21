import React from 'react';
import './style.css';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className="f-button" {...props}>
      {children}
    </button>
  );
};

export default Button;
