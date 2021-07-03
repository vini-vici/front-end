import React from 'react';
import styles from './checkbox.module.css';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * 
 * @param props Props to pass down to the checkbox component.
 * @returns 
 */
export default function Checkbox({ checked, onChange }: CheckboxProps): React.ReactElement {

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className={styles['checkbox-container']}>
        <div className={styles['checkbox-indicator']}></div>
      </div>
    </label>
  );
}