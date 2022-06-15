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
  data?: XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
  responseType?: ResponseType;
  params?: Record<string, any>;
  paramsSerializer?: (params: Config['params']) => string;
  onDownloadProgress?: (event: ProgressEvent) => void;
  onUploadProgress?: (event: ProgressEvent) => void;
}

export default function xhr(config: Config) {
  return new Promise((resolve, reject) => {
    const { responseType, headers, url, data } = config;

    let xhr = new XMLHttpRequest();

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

    // 超时
    xhr.timeout = 5000;
    xhr.ontimeout = function() {
      reject(new Error('timeout'));
    };

    // 下载进度
    if (typeof config.onDownloadProgress === 'function') {
      xhr.onprogress = config.onDownloadProgress;
    }

    // 上传进度
    if (typeof config.onUploadProgress === 'function') {
      xhr.upload.onprogress = config.onUploadProgress;
    }

    // 发送请求
    xhr.send(data ? data : null);
  });
}
