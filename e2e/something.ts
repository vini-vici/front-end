
fixture('Penis')
	.page('https://localhost:8080');

test('hi', async testcafe => {
	await testcafe.expect(1).eql(1);
});

