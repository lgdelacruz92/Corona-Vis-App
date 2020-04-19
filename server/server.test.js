const server = require('./server');

test('test get corona', async () => {
    const result = await server.getCoronaData();
    expect(result['New York']).not.toEqual(undefined);
    expect(result['New York']).not.toEqual(undefined);
});
 
test('test get states geo coor', async() => {
    const result = await server.getStateCoor();
    expect(result['Wisconsin, the USA'].latitude).toEqual('44.500000');
    expect(result['Wisconsin, the USA'].longitude).toEqual('-89.500000');
});

test('test get data', async() => {
    const data = await server.getData();
    expect(data['Alaska']).toEqual({
        total_cases: '314',
        total_death: '9',
        coors: { latitude: '66.160507', longitude: '-153.369141' }
    });
});