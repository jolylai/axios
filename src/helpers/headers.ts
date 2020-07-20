import { isPlainObject } from '@/utils';

const normalizeHeaderName = (headers: any, narmalizedName: string) => {
  if (!headers) {
    return;
  }

  Object.keys(headers).forEach(name => {
    if (
      name !== narmalizedName &&
      name.toLowerCase() === narmalizedName.toLowerCase()
    ) {
      headers[narmalizedName] = headers[name];
      delete headers[name];
    }
  });
};

export const precessHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset/utf-8';
    }
  }

  return headers;
};
