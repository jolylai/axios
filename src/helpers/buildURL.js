import { isDate, isObject, isURLSearchParams } from '../utils';

function encode(val) {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

const buildURL = (url, params, paramsSerializer) => {
  if (!params) {
    return url;
  }

  const parts = [];

  let serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    Object.keys(params).forEach(key => {
      let val = params[key];

      if (Array.isArray(val)) {
        key = `${key}[]`;
      } else {
        val = [val];
      }

      val.forEach((v: any) => {
        if (isDate(v)) {
          v = v.toISOString();
        } else if (isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(`${encode(key)}=${encode(v)}`);
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    // 去除 hash
    const hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex > -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') > -1 ? '&' : '?') + serializedParams;
  }

  return url;
};

export default buildURL;
