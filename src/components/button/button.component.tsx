import React, { PropsWithChildren} from 'react';
import Dc from '@/classes/domClasses.class';
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'custom';
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'button'
}

export default function Button(props: PropsWithChildren<ButtonProps>): React.ReactElement {
  const { children, variant = 'primary', className = '', onClick, type = 'button' } = props;

  const classes = new Dc('px-2 py-1 rounded-sm');
  if(variant == 'primary') classes.add('bg-purple-400 text-white-100'); 
  else if (variant == 'secondary') classes.add('bg-gray-400');

  if(className) classes.add(className);
  
  return (
    <button
      className={classes.toString()}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}