import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const ButtonGlass = ({ children, onClick, type = 'button', className = '' }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={`bg-white rounded-lg px-4 py-2 font-bold ${className}`}>
      {children}
    </button>
  );
};

export default ButtonGlass;