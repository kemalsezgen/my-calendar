import React from 'react';

interface ButtonProps {
  text: string;
  buttonType?: "button" | "submit" | "reset";
}

interface ButtonProps {
  text: string;
  buttonType?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ text, buttonType = "button", ...props }) => {
  return <button type={buttonType} {...props}>{text}</button>;
};

export default Button