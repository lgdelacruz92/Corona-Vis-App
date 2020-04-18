const server = require('./server');


test('test first item get', async () => {
    const result = await server.getData();
    expect(result[0].state).toEqual('New York');
    expect(result[0].total_cases).not.toEqual(undefined);
    expect(result[0].total_death).not.toEqual(undefined);
    expect(result.length).toEqual(51);
});
 