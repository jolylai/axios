type Encoder = (value: any, encode: AxiosURLSearchParams['encode']) => string;

export default class AxiosURLSearchParams {
  _pairs: Array<[string, any]> = [];

  constructor(params: Record<string, any>, options) {}

  encode(str: string) {
    var charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00',
    };
    return encodeURIComponent(str).replace(
      /[!'\(\)~]|%20|%00/g,
      function replacer(match) {
        return charMap[match];
      },
    );
  }

  append(key: string, value: any): void {
    this._pairs.push([key, value]);
  }

  toString(encoder: Encoder): string {
    const _encode = encoder
      ? function(value) {
          return encoder.call(this, value, this.encode);
        }
      : this.encode;

    return this._pairs
      .map(function(pair) {
        const [key, value] = pair;
        return _encode(key) + '=' + _encode(value);
      })
      .join('&');
  }
}
