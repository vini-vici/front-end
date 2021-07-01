import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Checkbox from './checkbox.component';

test('Testing rendering with no props', async () => {
  const { container } = render(
    <Checkbox/>
  );
  expect(container.querySelector('input[type="checkbox"]'));
});

test('Testing rendering with function', async () => {
  // Mock the onChange event.
  const onChange = jest.fn();

  // Render the container
  const { container } = render(
    <Checkbox
      checked={true}
      onChange={onChange}
    />
  );

  // Click the label.
  fireEvent.click(
    container.querySelector('label')
  );

  // has the onChange been called?
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('Testing update rendering', async () => {
  let checked = false;
  const onChange = jest.fn(() => checked = !checked);

  // Initial Render
  const { container, rerender } = render(
    <Checkbox
      checked={checked}
      onChange={onChange}
    />
  );

  // Clicking the label
  fireEvent.click(
    container.querySelector('label')
  );

  // re-render the items now.
  rerender(
    <Checkbox
      checked={checked}
      onChange={onChange}
    />
  );

  // should now be checked.
  expect(
    (container.querySelector('input[type="checkbox"]') as HTMLInputElement).checked
  ).toBe(true);

});
