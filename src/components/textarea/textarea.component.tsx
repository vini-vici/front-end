import Dc from '@/classes/domClasses.class';
import React from 'react';

export interface TextareaProps {
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export default function Textarea({ value, className, onChange, placeholder }: TextareaProps): React.ReactElement {
  const classes = new Dc('border border-gray-300 py-1 px-2 rounded');
  if(className !== undefined) classes.add(className);
  return (
    <textarea
      className={classes.toString()}
      onChange={e => onChange?.(e)}
      value={value}
      placeholder={placeholder}
    />
  );
}