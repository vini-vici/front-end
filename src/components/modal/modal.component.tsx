import React from 'react';

import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import Button from '@/components/button/button.component';

import styles from './modal.module.css';

import Dc from '@/classes/domClasses.class';

interface ModalProps {
  show?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: React.ReactNode;
  dismissOnClick?: boolean;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
}

export default function Modal(props: React.PropsWithChildren<ModalProps>): React.ReactElement {
  // grab some props
  const { 
    children,
    show = false,
    onClose,
    onConfirm,
    title,
    dismissOnClick = true,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
  } = props;

  // React doesn't show anything if your component returns null.
  if(!show) return null;

  const classes = new Dc(styles.modal);
  classes.add('modal');

  return (
    <div
      className={classes.toString()}
      tabIndex={0}
      onKeyUp={e => {
        if(e.code === 'Escape') 
          onClose();
      }}
      onClick={e=>{
        // Needed for witchcraft
        const target = e.target as HTMLElement;

        if( dismissOnClick && target.matches('.'+styles.modal)) 
          onClose();
        
      }}
    >
      <div className="bg-gray-50 rounded w-full md:w-2/3 px-2 md:py-2 md:px-3 shadow-sm">
        {/* Header section */}
        <header className="modal-header flex justify-between">
          <div className="font-semibold">
            {title}
          </div>
          <div className="closeButton text-gray-300 hover:text-gray-500" onClick={() => onClose() }>
            <Icon
              path={mdiClose}
              size={0.8}
            />
          </div>
        </header>

        {/* Main Content */}
        {children}

        {/* Footer Content */}
        <footer className="modal-footer flex justify-end py-2 border-t border-gray-300 ">
          <Button variant="secondary" onClick={() => onClose()}>
            {cancelText}
          </Button>
          <Button className="ml-1" onClick={() => onConfirm()}>
            {confirmText}
          </Button>
        </footer>
      </div>
    </div>
  );
}