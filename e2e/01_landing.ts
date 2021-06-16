import { Selector } from 'testcafe';

fixture('Main Test')
	.page('http://localhost:8080/');

test('Base', async testcafe => {
	const todoTitle = Selector('#todo-title')
	const todoDescription = Selector('#todo-description');
	await testcafe.click(
		todoTitle
	);
	await testcafe.typeText(
		todoTitle,
		'Todo Test'
	);
	await testcafe.expect(
		todoTitle.value
	).eql('Todo Test');
	await testcafe.typeText(
		todoDescription,
		'Optional!'
	);
});
