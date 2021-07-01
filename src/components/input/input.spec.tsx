import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Input from './input.component';

test('Testing Placeholders', async () => {
  render(
    <Input placeholder="placeholder"/>
  );
  screen.findByPlaceholderText('placeholder');
});


test('Testing value', async () => {
  render(
    <Input value="testing value" />
  );
  screen.findByDisplayValue('testing value');
});

test('Changes update correctly.', async () => {
  const onChange = jest.fn();
  const {container } = render(
    <Input value="testing" onChange={onChange} />
  );
  fireEvent.change(
    container.querySelector('input'),
    {
      target: {
        value: 'Jim'
      }
    }
  );
  expect(onChange).toHaveBeenCalled();
});

test('Adds custom class name', async () => {
  const { container } = render(
    <Input className="custom-class"/>
  );
  expect(container.querySelector('input').classList.contains('custom-class'));
});