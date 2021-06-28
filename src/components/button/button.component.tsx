import React, { PropsWithChildren} from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'custom';
  className?: string;
  onClick?: () => void;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const { children, variant = 'primary', className = '', onClick } = props;
  let c = '';
  if(variant == 'primary') c = 'bg-purple-400 text-white-100';
  else if (variant == 'secondary') c = 'bg-gray-400';
  return (
    <button
      className={'px-2 py-1 rounded-sm ' + className + ' ' + c}
      onClick={onClick}
    >
      {children}
    </button>
  );
}