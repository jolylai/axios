import parseHeaders from '../helpers/parseHeaders';

type ResponseType =
  | 'arraybuffer'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'
  | 'blob';

interface Config {
  method: string;
  baseURL?: string;
  url: string;
  headers?: Record<string, string>;
  responseType?: ResponseType;
  params?: Record<string, any>;
  paramsSerializer?: (params: Config['params']) => string;
}

export default function xhr(config: Partial<Config>) {
  return new Promise((resolve, reject) => {
    const { responseType, headers, url } = config;
    const xhr = new XMLHttpRequest();

    xhr.open(config.method.toUpperCase(), url, true);

    // 设置请求头
    if ('setRequestHeader' in xhr) {
      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    // 获取响应数据
    xhr.onreadystatechange = function() {
      if (!xhr || xhr.readyState !== 4) return;

      const responseHeaders =
        'getAllResponseHeaders' in xhr
          ? parseHeaders(xhr.getAllResponseHeaders())
          : null;

      const responseData =
        !responseType || responseType === 'text' || responseType === 'json'
          ? xhr.responseText
          : xhr.response;

      resolve({
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
      });
    };

    xhr.send(null);
  });
}
