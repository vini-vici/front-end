import React from 'react';

import Expandable from '@/components/expandable/expandable.component';

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<unknown>> {
  state = {
    error: '',
    type: '',
    stack: ''
  }
  componentDidCatch(e: Error): void {
    this.setState({
      error: e.message,
      type: e.name,
      stack: e.stack || ''
    });
  }
  render(): React.ReactNode {
    // If we have an error, let's show it.
    if (this.state.error) {
      return (
        <div className="w-2/3 mt-5 mx-auto shadow-xl border border-red-300 p-2 rounded">
          <h1 className="text-xl font-bold font-mono text-red-800 underline">
            {this.state.type}
          </h1>
          <p>The following error occurred in a component on this page: </p>
          <Expandable
            header={
              <div className="font-semibold">
                {this.state.error}
              </div>
            }
            onToggle={e => console.log(e.detail.expanded)}
          >
            <pre className="bg-gray-200 text-gray-700 p-3 break-words whitespace-pre-line">
              {this.state.stack || 'No stack trace was included with the error'}
            </pre>
          </Expandable>
        </div>
      );
    }

    return this.props.children;
  }
}