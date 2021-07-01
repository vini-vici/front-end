import React from 'react';
import { render, screen } from '@testing-library/react';

import Loading from './loading.component';

test('Default Loading text', async () => {
  render(<Loading/>);
  expect(screen.findByText('Loading'));
});

test('Customize loading text', async () => {
  render(
    <Loading text="custom text"/>
  );
  expect(screen.findByTestId('custom text'));
});

test('Default size', async () => {
  render(
    <Loading/>
  );
  expect(
    document.querySelector('svg').style.width
  ).toBe('1.5rem');
});

test('Custom Sizes', async () => {
  const { container, rerender } = render(
    <Loading size={2} />
  );
  expect(document.querySelector('svg').style.width).toBe('3rem');
  rerender(
    <Loading
      size={3}
    />
  );

  expect(container.querySelector('svg').style.width)
    .toBe('4.5rem');

});