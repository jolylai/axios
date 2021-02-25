import normalizeHeaderName from './helpers/normalizeHeaderName';
import xhr from './adapters/xhr';

const defults = {
  adapter: xhr,
  transferRequest: [
    function transferRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');
    },
  ],
};

export default defaults;
