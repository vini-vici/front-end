import React from 'react';

import { render, screen } from '@testing-library/react';

import useCognito, { CognitoProvider } from './cognito';

test('Renders without issue.', async () => {
  render(
    <CognitoProvider>
      <div>
        Hello
      </div>
    </CognitoProvider>
  );

  screen.getByText('Hello');
  
});