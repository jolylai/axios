import buildFullPath from '../../src/core/buildFullPath';

describe('core buildFullPath', () => {
  test('should combine URLs when the requestedURL is relative', function() {
    expect(buildFullPath('https://api.github.com', '/users')).toBe(
      'https://api.github.com/users',
    );
  });

  test('should return the requestedURL when it is absolute', () => {
    expect(
      buildFullPath('https://api.github.com', 'https://api.example.com/users'),
    ).toEqual('https://api.example.com/users');
  });

  test('should not combine URLs when the baseURL is not configured', () => {
    expect(buildFullPath(undefined, '/users')).toEqual('/users');
  });

  test('should combine URLs when the baseURL and the requestURL are raletive', () => {
    expect(buildFullPath('/api', '/users')).toEqual('/api/users');
  });
});
