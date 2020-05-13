import buildURL from '../../src/helpers/buildURL';

describe('buildURL', () => {
  test('should support null params', () => {
    expect(buildURL('/foo')).toEqual('/foo');
  });

  test('should support params', () => {
    expect(
      buildURL('/foo', {
        foo: 'bar',
      }),
    ).toEqual('/foo?foo=bar');
  });

  test('should support object params', () => {
    expect(
      buildURL('/foo', {
        foo: {
          bar: 'baz',
        },
      }),
    ).toEqual('/foo?foo=' + encodeURI('{"bar":"baz"}'));
  });

  test('should support date params', function() {
    var date = new Date();

    expect(
      buildURL('/foo', {
        date: date,
      }),
    ).toEqual('/foo?date=' + date.toISOString());
  });

  test('should support array params', () => {
    expect(
      buildURL('foo', {
        foo: ['bar', 'baz'],
      }),
    ).toEqual(`foo?foo[]=bar&foo[]=baz`);
  });

  test('should support special char params', function() {
    expect(
      buildURL('/foo', {
        foo: '@:$, ',
      }),
    ).toEqual('/foo?foo=@:$,+');
  });

  test('should support existing params', function() {
    expect(
      buildURL('/foo?foo=bar', {
        bar: 'baz',
      }),
    ).toEqual('/foo?foo=bar&bar=baz');
  });

  test('should support "length" parameter', function() {
    expect(
      buildURL('/foo', {
        query: 'bar',
        start: 0,
        length: 5,
      }),
    ).toEqual('/foo?query=bar&start=0&length=5');
  });

  test('should correct discard url hash mark', function() {
    expect(
      buildURL('/foo?foo=bar#hash', {
        query: 'baz',
      }),
    ).toEqual('/foo?foo=bar&query=baz');
  });

  test('should use serializer if provided', function() {
    const serializer = jest.fn(params => {
      let serializedParams = '';
      Object.keys(params).forEach(key => {
        const val = params[key];
        serializedParams += `${key}=${val}`;
      });
      return serializedParams;
    });
    const params = { foo: 'bar' };
    expect(buildURL('/foo', params, serializer)).toEqual('/foo?foo=bar');
    expect(serializer).toBeCalled();
    // expect(serializer.calledWith(params)).toBe(true);
  });

  test('should support URLSearchParams', function() {
    expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toEqual(
      '/foo?bar=baz',
    );
  });
});
