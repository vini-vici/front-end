import React from 'react';

import { Icon } from '@mdi/react';
import { mdiMenuDown, mdiMenuRight } from '@mdi/js';

interface ToggleCustomDetail {
  expanded: boolean;
}

export interface ExpandableProps {
  id?: string;
  onToggle?: (e: CustomEvent<ToggleCustomDetail>) => void;
  expanded?: boolean;
  header?: React.ReactNode;
}

export default function Expandable(props: React.PropsWithChildren<ExpandableProps>): React.ReactElement {
  const { children, header, expanded: expandedProp = false, id, onToggle } = props;
  const [expanded, setExpanded] = React.useState(expandedProp);
  return (
    <div className="expanded" id={id}>
      <header className="expanded-header">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
            if(onToggle) {
              const details = new CustomEvent<ToggleCustomDetail>('toggle', {
                bubbles: false,
                cancelable: false,
                detail: {
                  expanded: !expanded
                }
              });
              onToggle(details);
            }
          }}>
          <Icon aria-roledescription="menu" className={expanded ? 'expanded' : 'collapsed'} path={expanded ? mdiMenuDown : mdiMenuRight} size={1} />
          <div className="flex-grow">
            {header}
          </div>
        </div>
      </header>
      {
        expanded ?
          children : null
      }
    </div>
  );
}