const server = require('./server');

test('get data should get table with id usa_table_countries_today', async () => {
    const result = await server.getData();
    expect(result.getAttribute('id')).toBe('usa_table_countries_today');
});


test('table should contain 52 items', async () => {
    const result = await server.getData();
    const rows = result.querySelector('tbody');
    const states = rows.childNodes.filter(node => node.tagName === 'tr');
    expect(states.length).toBe(52);
});
 