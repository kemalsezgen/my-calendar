import React from 'react';

interface LoginRegisterButtonProps {
  text: string;
  route?: string;
  onClick?: () => void;
}

const LoginRegisterButton: React.FC<LoginRegisterButtonProps> = ({ text, route, onClick }) => {
  return (
    <a href={`${route}`} className="bg-normalGreen text-cream font-bold py-2 px-4 rounded hover:bg-hover"
      onClick={onClick}>
      {text}
    </a>
  )
}

export default LoginRegisterButton