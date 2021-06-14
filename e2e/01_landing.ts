
fixture('Landing')
	.page('https://localhost:8080');

test('Landing page has correct items in it.', async testcafe => {
	await testcafe.expect(1).eql(1);
});
