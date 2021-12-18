import React from 'react';

import Input from '@vini-vici/viddi/dist/input/input.component';

export default function Commands(): React.ReactElement {
  // Show the item?
  const [show, setShow] = React.useState(false);
  // loading commands
  const [loading, setLoading] = React.useState(false);
  // Searching
  const [search, setSearch] = React.useState('');
  // Keydown function
  const keydownFn = (e: KeyboardEvent) => {
    // Update the commands component.
    const target = e.target as HTMLElement;
    if (!target?.matches('input,textarea')) {
      e.preventDefault();
      if (e.key === 'k' && e.ctrlKey)
        setShow(!show);
      else if (e.key === 'Escape' && show) setShow(false);

    }
  };

  React.useEffect(() => {
    // setup the keydown events
    document.body.addEventListener('keydown', keydownFn);

    return () => {
      // Remove the keybind events.
      document.body.removeEventListener('keydown', keydownFn);
    };
  }, []);

  // If we are not showing, return null.
  if (!show) return null;

  const Something = React.forwardRef((props, ref) => <Input ref={ref} />);

  // Show the actual thingamajig
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-white flex justify-center items-center z-50 transition-all'>
      <div className="dark:bg-gray-700 dark:text-gray-100 rounded border dark:border-gray-400 w-full max-w-4xl mx-auto p-4 translate-y-5 min-h-min">
        <Input className='w-full dark:bg-gray-800 dark:border-gray-400' placeholder='Search for commands' value={search} onChange={e => { e.preventDefault(), e.stopPropagation(), setSearch(e.target.value); }} />
      </div>
    </div>
  );
}