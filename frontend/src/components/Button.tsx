import React from 'react';

interface ButtonProps {
  text: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, buttonType = "button", onClick }) => {
  return <button className="bg-cream hover:bg-darkGreen hover:text-cream text-darkGray font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
    type={buttonType} onClick={onClick}>{text}</button>;
};

export default Button