import { Selector } from 'testcafe';

fixture('Delete Items')
  .page('http://localhost:8080');

test('Delete Todo Works', async (t) => {
  await t.expect(
    Selector('.todo-row').count
  ).gte(2);

  await t.click(
    Selector(
      '.todo-row button'
    ).withText('Delete')
  );
  
  await t.expect(
    Selector('.todo-row').count
  ).lte(1);
});
