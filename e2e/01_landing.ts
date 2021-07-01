import { Selector } from 'testcafe';

fixture('Main Test')
  .page('http://localhost:8080/');

test('Basic', async testcafe => {
  await testcafe
    .expect(
      Selector('h1').exists
    )
    .ok('Header Element Exists');

  await testcafe
    .expect(
      Selector('h1').textContent
    ).eql('Todos App');
    
});

// Make other things get tested.
