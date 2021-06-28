import React from 'react';

import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import Button from '@/components/button/button.component';

import styles from './modal.module.css';

interface ModalProps {
  show?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: React.ReactNode;
  dismissOnClick?: boolean;
}

export default function Modal(props: React.PropsWithChildren<ModalProps>) {
  // grab some props
  const { 
    children,
    show = false,
    onClose,
    onConfirm,
    title,
    dismissOnClick = true
  } = props;

  // React doesn't show anything if your component returns null.
  if(!show) return null;

  return (
    <div
      className={styles.modal}
      tabIndex={0}
      onKeyUp={(e) => {
        if(e.code === 'Escape') {
          onClose();
        }
      }}
      onClick={(e)=>{
        // Needed for witchcraft
        const target = e.target as HTMLElement;

        if( dismissOnClick && target.matches('.'+styles.modal)) {
          onClose();
        }
      }}
    >
      <div className="bg-gray-50 rounded w-full md:w-2/3 px-2 md:py-2 md:px-3 shadow-sm">
        {/* Header section */}
        <header className="flex justify-between">
          <div className="font-semibold">
            {title}
          </div>
          <div className="closeButton text-gray-300 hover:text-gray-500" onClick={() => onClose() }>
            <Icon
              path={mdiClose}
              size={0.75}
            />
          </div>
        </header>

        {/* Main Content */}
        {children}

        {/* Footer Content */}
        <footer className="flex justify-end py-2 border-t border-gray-300 ">
          <Button variant="secondary" onClick={() => onClose()}>Cancel</Button>
          <Button className="ml-1" onClick={() => onConfirm()}>
            Confirm
          </Button>
        </footer>
      </div>
    </div>
  );
}