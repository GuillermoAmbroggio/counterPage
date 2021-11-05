import React, { ButtonHTMLAttributes } from 'react';
import './button.css';

export interface IButton
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'title' | 'disabled'
  > {
  title?: string | number;
  className?: string;
  disabled?: boolean;
}
const Button: React.FC<IButton> = ({ title, className, disabled, ...rest }) => {
  return (
    <button className={`container-button ${className}`} {...rest}>
      <p className="content-text-button">{title}</p>
    </button>
  );
};

export default Button;
