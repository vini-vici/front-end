import React from 'react';

import TodosComponent from '@/components/todos/todos.container';

/**
 * @description Routes in general will not take any props in our application since the corresponding components
 * will always pull data from Redux.
 */
export default function IndexRoute(): React.ReactElement {
  return (
    <div>
      <h1 className="text-2xl font-semibold p-3">Todos App</h1>
      <TodosComponent />
    </div>
  );
}