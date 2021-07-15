import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, Tab, useTabs } from './index';

test('Renders single correctly.', async () => {
  const { container } = render(
    <Tabs>
      <Tab header="Hello" id="hello">
        Testing
      </Tab>
    </Tabs>
  );

  const header = container.querySelector('header .tab-selector');
  expect(header.classList.contains('active')).toBeTruthy();
  expect(header.textContent).toBe('Hello');
});

test('Renders initial state of multiple tabs correctly', async () => {
  const { container } = render(
    <Tabs>
      <Tab header="Hello" id="hello">
        Testing
      </Tab>
      <Tab header="World" id="world">
        Here
      </Tab>
    </Tabs>
  );
  expect(screen.getByText('Hello').classList.contains('active')).toBeTruthy();
  expect(screen.getByText('World').classList.contains('active')).toBeFalsy();
  expect(screen.getByText('Testing')).toBeTruthy();
  expect(container.querySelectorAll('.active').length).toBe(1);
});

test('Renders initial state of multiple tabs with given activeTab', async () => {
  render(
    <Tabs activeTab="tab-3">
      <Tab header="Tab 1" id="tab-1">
        Content 1
      </Tab>
      <Tab header="Tab 2" id="tab-2">
        Content 2
      </Tab>
      <Tab header="Tab 3" id="tab-3">
        Content 3
      </Tab>
    </Tabs>
  );
  const tabHeader = screen.getByText('Tab 3');
  expect(tabHeader.classList.contains('active')).toBeTruthy();
  screen.getByText('Content 3');
});

test('Updates visible tab on selector click', async () => {
  // Render a tabs component
  render(
    <Tabs>
      <Tab header="Header 1" id="tab-1">
        Tab 1 Content
      </Tab>
      <Tab header="Header 2" id="tab-2">
        Tab 2 Content
      </Tab>
    </Tabs>
  );
  // Expect the header 1 tab selector to be active
  expect(screen.getByText('Header 1').classList.contains('active')).toBeTruthy();
  // we should also find the tab 1 content
  screen.getByText('Tab 1 Content');
  // Click the Tab 2 selector
  fireEvent.click(screen.getByText('Header 2'));
  // same checks as above
  expect(screen.getByText('Header 2').classList.contains('active')).toBeTruthy();
  screen.getByText('Tab 2 Content');
});

test('Custom onChangeTab function is called', async () => {
  const onTabChange = jest.fn();
  render(
    <Tabs onTabChange={onTabChange}>
      <Tab header="Header 1" id="tab-1">
        Tab 1 Content
      </Tab>
      <Tab header="Header 2" id="tab-2">
        Tab 2 Content
      </Tab>
    </Tabs>
  );
  fireEvent.click(screen.getByText('Header 2'));
  expect(onTabChange).toHaveBeenCalledTimes(1);
});

test('Renders Custom Classes correctly', async () => {
  const { container } = render(
    <Tabs className="custom-class">
      <Tab header="Tab 1">
        Tab 1 Content
      </Tab>
    </Tabs>
  );
  expect(container.querySelector('.custom-class')).not.toBeNull();
});

test('Failure', async () => {
  const incorrect = (): React.ReactElement => {
    const tc = useTabs();
    return <div>{tc.currentTab}</div>;
  };
  expect(incorrect).toThrow(Error);

  const further = () => render(
    <Tab header='Test'>Tab content</Tab>
  );
  expect(further).toThrow('useTabs');
});