import DomClasses from './domClasses.class';

test('Works without initial arguments', async () => {
  const tokens = new DomClasses();
  expect(tokens.toString()).toBe('');
  tokens.add('test-class');
  expect(tokens.contains('test-class')).toBeTruthy();
  tokens.remove('test-class');
  expect(tokens.toString()).toBe('');
});

test('Works with initial classes as a single string', async () => {
  const tokens = new DomClasses('testing classes');
  // check that individual checks work
  expect(tokens.contains('testing')).toBeTruthy();
  expect(tokens.contains('classes')).toBeTruthy();
  // check that combined checks work.
  expect(tokens.contains('testing classes')).toBeTruthy();
  tokens.add('new-class');
  // check that adding a new class works
  expect(tokens.contains('new-class')).toBeTruthy();
  // check that removing a new class works.
  tokens.remove('testing');
  expect(tokens.contains('testing')).toBeFalsy();
});

test('Toggle functions works', async () => {
  const tokens = new DomClasses();
  // toggle a class on
  tokens.toggle('class-1');
  expect(tokens.count).toBe(1);
  // toggle another one
  tokens.toggle('class-2');
  expect(tokens.count).toBe(2);
  // force the toggle of class 2, even though it is present already
  tokens.toggle('class-2', true);
  expect(tokens.count).toBe(2);
  // toggle off class-1
  tokens.toggle('class-1');
  expect(tokens.count).toBe(1);
  // testing the string value, just to be sure.
  expect(tokens.toString()).toBe('class-2');

  // new dom classes object
  const tokens2 = new DomClasses('one', 'two', 'three');
  // expect the initial count to be 3.
  expect(tokens2.count).toBe(3);
  // toggle one off.
  tokens2.toggle('one');
  // expect now to have items
  expect(tokens2.count).toBe(2);
  // force a second item to not be added.
  tokens2.toggle('four', false);
  // meaning the count is still the same.
  expect(tokens2.count).toBe(2);
});

test('Chaining methods works as expected', async () => {
  let tokens = new DomClasses();
  expect(
    tokens
      .add('class-1')
      .add('class-2')
      .count
  ).toBe(2);

  tokens = new DomClasses();
  expect(
    tokens
      .add('class-1')
      .add('class-2')
      .remove('class-1')
      .count
  ).toBe(1);

  tokens = new DomClasses('class-1 class-2');
  expect(
    tokens
      .add('new-class')
      .toggle('class-1')
      .count
  ).toBe(2);

});

test('Chaining methods works when trying to remove classes that do not exist', async () => {

  const tokens = new DomClasses('class-1 class-2');
  // excellent.
  expect(
    tokens
      .remove('class-3')
      .count
  ).toBe(2);
});

test('Replace Method works', async () => {
  const tokens = new DomClasses('one', 'two');
  tokens.replace('one', 'three');
  expect(tokens.count).toBe(2);
  expect(
    tokens.contains('two three')
  ).toBeTruthy();

  expect(
    tokens.contains('one')
  ).toBeFalsy();

  tokens.replace('four', 'potato');
  expect(
    tokens.contains('potato')
  ).toBeFalsy();
});

test('Serialization to JSON works', async () => {
  const tokens = new DomClasses('one', 'two', 'three');
  expect(tokens.toJSON()).toBe('one two three');
});

test('Combine works as expected', async () => {
  const a = new DomClasses('one two');
  const b = new DomClasses('three four');
  a.combine(b);
  expect(a.contains('three four')).toBeTruthy();
  a.toggle('three');
  expect(a.contains('one two four')).toBeTruthy();
});

test('Returns proper query selectors', async () => {
  const tokens = new DomClasses('one two');
  expect(tokens.toQuery()).toBe('.one.two');
});