import React from 'react';
import { useTabs } from './tabs.component';
interface TabProps {
  id?: string;
  header: string;
}

export default function Tab(props: React.PropsWithChildren<TabProps>): React.ReactElement {
  const {header, id = header, children} = props;
  const tabs = useTabs();
  React.useEffect(() => {
    tabs.addTab(id, header);
    return () => {
      tabs.removeTab(id);
    };
  }, []);
  if(tabs.currentTab !== id) return null;
  return (
    <div className="tab">
      {children}
    </div>
  );
}