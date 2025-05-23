import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean
}

const ButtonGlass = ({ children, onClick, type = 'button', className = '', disabled }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`bg-white rounded-lg px-4 py-2 font-semibold disabled:bg-gray-500 disabled:text-gray-700 ${className}`}>
      {children}
    </button>
  );
};

export default ButtonGlass;