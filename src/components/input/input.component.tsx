import DomClasses from '@/classes/domClasses.class';
import React from 'react';

interface InputProps {
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
    value
  } = props;
  
  const classes = new DomClasses('px-2 py-1 border rounded');

  if(typeof className === 'string' && className != '') {
    classes.add(className);
  }

  return (
    <input
      className={classes.toString()}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e)}
      value={value}
    />
  );
}