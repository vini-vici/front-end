import React from 'react';
import Dc from '@/classes/domClasses.class';

export interface FormFieldProps {
  className?: string;
  label: string | React.ReactElement;
  description?: string | React.ReactElement;
}

export default function FormField({ label, description, children }: React.PropsWithChildren<FormFieldProps>): React.ReactElement {
  const classes = new Dc('flex flex-col');
  return (
    <label className={classes.toString()}>
      <span className="form-field-label font-semibold">
        {label}
      </span>
      {
        description && (
          <span className="text-gray-500 text-sm">
            {description}
          </span>
        )
      }
      <div className="form-field-control">
        {children}
      </div>
    </label>
  );
}