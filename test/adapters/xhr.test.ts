import xhr from '../../lib/adapters/xhr';

describe('xhr', () => {
  test('should get responseData', async () => {
    const response = await xhr({
      method: 'get',
      // baseURL: 'http://www.mocky.io',
      // url: '/v2/5e01ea3f2f00007d97dcd401',
      url: 'http://localhost:7070/api',
    });

    console.log('response: ', response);
  });
});
