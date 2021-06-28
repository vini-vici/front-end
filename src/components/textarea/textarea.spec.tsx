import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Textarea from './textarea.component';

test('Verifying custom classnames are passed', async () => {
  const { container } = render(
    <Textarea
      className="testing"
    />
  );

  expect(container.querySelector('.testing').classList.contains('testing'));
});

test('Verifying onChange function gets triggered', async () => {
  const onChange = jest.fn();
  const { container } = render(
    <Textarea
      onChange={onChange}
    />
  );

  fireEvent.change(
    container.querySelector('textarea'),
    {
      target: {
        value: 'Testing'
      }
    }
  );
  expect(onChange).toHaveBeenCalledTimes(1);
});