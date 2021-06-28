import React from 'react';

import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

export interface LoadingProps {
  text?: string;
  size?: number;
  icon?: string;
}

export default function Loading({ text = 'Loading', size = 1, icon = mdiLoading}: LoadingProps): React.ReactElement {
  return (
    <div className="loading flex items-center">
      <Icon
        size={size}
        path={icon}
        spin={1.5}
      />
      {text}...
    </div>
  );
}