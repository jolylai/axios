import { merge } from '../../src/utils';

describe('utils:merge', () => {
  test('should merge recursively', function() {
    var a = { foo: { bar: 123 } };
    var b = { foo: { baz: 456 }, bar: { qux: 789 } };

    expect(merge(a, b)).toEqual({
      foo: {
        bar: 123,
        baz: 456,
      },
      bar: {
        qux: 789,
      },
    });
  });
});
