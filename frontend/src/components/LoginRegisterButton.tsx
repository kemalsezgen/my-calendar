import React from 'react';

interface LoginRegisterButtonProps {
  text: string;
  route: string;
}

const LoginRegisterButton: React.FC<LoginRegisterButtonProps> = ({text, route}) => {
  return (
    <a href={`${route}`} className="bg-normalGreen text-cream font-bold py-2 px-4 rounded hover:bg-hover">
      {text}
    </a>
  )
}

export default LoginRegisterButton