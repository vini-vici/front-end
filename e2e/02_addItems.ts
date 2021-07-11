import { Selector } from 'testcafe';

fixture('Add Items')
  .page('http://localhost:8080/');

test('Adds item', async (t) => {
  await t.expect(
    Selector(
      'h1 button'
    ).exists
  ).ok('Button Exists');
});