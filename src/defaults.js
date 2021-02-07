import normalizeHeaderName from './helpers/normalizeHeaderName';

const defults = {
  transferRequest: [
    function transferRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');
    },
  ],
};
