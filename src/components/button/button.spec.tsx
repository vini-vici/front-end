import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button.component';

test('Renders with default styles', async () => {
  render(
    <Button>
      Testing
    </Button>
  );
  expect(screen.getByText('Testing').className).toContain('bg-purple-400');
});

test('Renders proper variants', async () => {
  const { rerender } = render(
    <Button variant="secondary">
      Testing
    </Button>
  );
  expect(screen.getByText('Testing').className).toContain('bg-gray-400');

  rerender(
    <Button variant="custom" className="custom-text">
      Testing
    </Button>
  );

  expect(screen.getByText('Testing').className).toContain('custom-text');
});

test('onClick works', async () => {
  const onClick = jest.fn();
  render(
    <Button
      onClick={onClick}
    >
      Testing
    </Button>
  );
  fireEvent.click(screen.getByText('Testing'));
  expect(onClick).toHaveBeenCalledTimes(1);
});