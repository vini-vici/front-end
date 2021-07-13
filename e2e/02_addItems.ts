import { Selector } from 'testcafe';

fixture('Add Items')
  .page('http://localhost:8080/');

test('Adds item (no description)', async (t) => {
  await t.wait(2000);
  await t.expect(
    Selector(
      'h1 button'
    ).exists
  ).ok('Button Exists');
  
  await t.click(
    Selector(
      'h1 button'
    )
  );

  await t.typeText(
    Selector('.modal input'),
    'e2e test'
  );

  await t.click(
    Selector(
      '.modal .modal-footer button'
    ).withText('Submit')
  );

  await t.expect(
    Selector('.todos-list .todo-row').count
  ).eql(3);

});

test('Add items (with description)', async (t) => {
  await t.wait(2000);
  await t.click(
    Selector('h1 button')
  );
  await t.typeText(
    Selector(
      '.modal input'
    ),
    'E2E Test'
  );
  await t.typeText(
    Selector('.modal textarea'),
    'Optional Description!'
  );
  await t.click(
    Selector('.modal .modal-footer button').withText('Submit')
  );
  await t.expect(
    Selector('.todos-list .todo-row').count
  ).eql(3);
});