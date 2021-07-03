import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from './formfield.component';

test('Renders correctly', async () => {
  render(
    <FormField
      label="Testing"
    />
  );

  const label = screen.getByText('Testing');
  // Ensure we have the form-field's label element
  expect(label.className).toContain('form-field-label');

});

test('Renders Descriptions properly', async () => {
  render(
    <FormField
      label="Testing"
      description="Optional Description"
    />
  );

  const description = screen.getByText('Optional Description');
  expect(description.className).toContain('text-sm');
});

test('Renders child content properly', async () => {
  const childContent = (
    <div className="custom-items">This is a test</div>
  );
  render(
    <FormField
      label="Testing child content"
    >
      {childContent}
    </FormField>
  );
  const content = screen.getByText('This is a test');
  expect(content.className).toBe('custom-items');
});