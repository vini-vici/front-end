import React from 'react';
import Dc from '@/classes/domClasses.class';

interface TabChangeDetail {
  previousTab?: string;
  currentTab?: string;
}

interface TabsProps {
  className?: string;
  activeTab?: string;
  children?: React.ReactNode[] | React.ReactNode;
  onTabChange?: (e: CustomEvent<TabChangeDetail>) => void;
}

export interface TabsContext {
  addTab(id: string, header: string): void;
  removeTab(id: string): void;
  currentTab: string;
}

const Context = React.createContext<TabsContext | undefined >(undefined);

interface TabMap {
  [key: string]: string;
}

/**
 * 
 * @returns React Element
 * @description React tab group element.
 */
export default function Tabs(props: TabsProps): React.ReactElement {
  const { className, children, onTabChange, activeTab } = props;
  const classes = new Dc('tab-group');
  if(className) classes.add(className);

  const [tabMap, updateTabMap] = React.useState<TabMap>({});
  const [currentTab, setCurrentTab] = React.useState('');

  React.useEffect(() => {

    const keys = Object.keys(tabMap);
    if(activeTab !== undefined) 
      setCurrentTab(activeTab);
    
    if(keys.length !== 0 && currentTab === '') 
      setCurrentTab(keys[0]);
    
  }, [tabMap]);

  const context: TabsContext = {
    addTab(id, header) {
      updateTabMap(prevState => ({
        ...prevState,
        [id]: header
      }));
    },
    removeTab(id) {
      updateTabMap(prevState => ({
        ...prevState,
        [id]: undefined
      }));
    },
    currentTab
  };
  
  return (
    <div className="tabs-container">
      <Context.Provider value={context}>
        <header className="flex">
          {
            Object.entries(tabMap)
              .map(([id, header]) => {
                const classes = new Dc('p-3 text-gray-400 tab-selector');
                if(currentTab === id) classes.remove('text-gray-400').add('border-b-2 border-blue-400 active');
                return (
                  <div
                    key={`tabs-selector-${id}`}
                    className={classes.toString()}
                    onClick={() => {
                      const ev = new CustomEvent<TabChangeDetail>('TabChange', {
                        cancelable: true,
                        bubbles: true,
                        detail: {
                          currentTab: id,
                          previousTab: currentTab
                        }
                      });
                      onTabChange?.(ev);
                      setCurrentTab(id);
                    }}
                  >
                    {header}
                  </div>
                );
              })
          }
        </header>
        <div className={classes.toString()}>
          {children}
        </div>
      </Context.Provider>
    </div>
  );
}

export function useTabs(): TabsContext {
  const tabs = React.useContext(Context);
  if(!tabs) throw Error('useTabs must be used inside a tabs context');
  return tabs;
}