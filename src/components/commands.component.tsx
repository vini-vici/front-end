import React from 'react';

import { ForwardInput } from '@vini-vici/viddi';
import { useDispatch } from 'react-redux';
import { showModal } from '@/redux/createModal/createModal.slice';

export default function Commands(): React.ReactElement {

  // Should the command prompt be showing?
  const [show, setShow] = React.useState(false);

  const [search, setSearch] = React.useState('');

  const ref = React.useRef<(e: KeyboardEvent) => void>();

  const [selectedCommand, setSelectedCommand] = React.useState(0);

  const dispatch = useDispatch();


  const commands = [
    {
      title: 'Add a todo',
      action: () => dispatch(showModal())
    },
    {
      title: 'Delete a todo'
    },
    {
      title: 'Edit a todo'
    }
  ];

  React.useEffect(() => {

    ref.current = e => {
      const target = e.target as HTMLElement;
      if(e.key === 'k' && e.ctrlKey) {
        e.preventDefault();
        setShow(!show);
      } else if(show && e.key === 'Escape') {
        e.preventDefault();
        setShow(false);
        setSearch('');
      } else if(show && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        e.preventDefault();
        if('ArrowDown' === e.key) 
          setSelectedCommand((selectedCommand + 1 ) % commands.length );
        else if('ArrowUp' === e.key)
          setSelectedCommand((selectedCommand - 1) % commands.length);
        else {
          setShow(false);
          console.log('runn command ', commands[selectedCommand].action());
        }
      }
    };

    document.body.addEventListener('keydown', ref.current);

    // Cleanup Code
    return () => {
      document.body.removeEventListener('keydown', ref.current);
    };
  });

  // Input reference
  const inputRef = React.createRef<HTMLInputElement>();

  // Focus the input when we show the what's its called.
  React.useEffect(() => {
    if(show) 
      inputRef.current.focus();
  }, [show]);

  if(!show) return null;

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center z-50 transition-all'>
      <div
        className="dark:bg-gray-700 dark:text-gray-100 rounded border dark:border-gray-400 w-full max-w-4xl mx-auto translate-y-5 min-h-min"
        onKeyDown={e => {
          const target = e.target as HTMLElement;
          if(!target.matches('input,textarea')) {
            e.preventDefault();
            console.log('hey jim');
          }
        }}
      >
        <header className="border-b border-gray-500 py-2 px-1">
          <ForwardInput 
            // This is a hack to get rid of some compiling errors
            css={undefined}
            placeholder="Search for a command" className="dark:bg-gray-600 w-full" ref={inputRef} value={search} onChange={e => setSearch(e.target.value) } />
        </header>
        <section className="p-4">
          {
            commands.map((c, i) => (
              <div className={i === selectedCommand ? 'border p-1' : 'p-1'}>
                {c.title}
              </div>
            ))
          }
        </section>
      </div>
    </div>
  );
}
