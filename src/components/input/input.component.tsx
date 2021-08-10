import DomClasses from '@/classes/domClasses.class';
import React from 'react';

interface InputProps {
  type?: string;
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

/**
 * 
 * @param props Input wrappers
 * @returns 
 */
export default function Input(props: InputProps): React.ReactElement {
  const { 
    className,
    placeholder,
    onChange,
    value,
    type = 'text'
  } = props;
  
  const classes = new DomClasses('px-2 py-1 border rounded');

  if(typeof className === 'string' && className != '') 
    classes.add(className);
  

  return (
    <input
      type={type}
      className={classes.toString()}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e)}
      value={value}
    />
  );
}