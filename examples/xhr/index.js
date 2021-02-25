function xhrAdapter(config) {
  return new Promise(function dispatchXHRRequest(resolve, reject) {
    const xhr = new XMLHttpRequest();

    const requestHeaders = config.headers;
    const requestData = config.data;

    xhr.open(config.method, config.url, true);

    xhr.onload = function handleLoad() {
      if ('getAllResponseHeaders' in xhr) {
        console.log('getAllResponseHeaders', xhr.getAllResponseHeaders());
      }

      console.log(xhr);
    };

    if (config.responseType) {
      xhr.responseType = config.responseType;
    }

    // 超时设定
    xhr.timeout = config.timeout;
    xhr.ontimeout = function handleTimeout() {
      reject(`timeout of ${config.timeout} ms excecued`);

      xhr = null;
    };

    xhr.onerror = function hadnleError() {
      reject('network error');

      xhr = null;
    };

    // setRequestHeader
    if ('setRequestHeader' in xhr) {
      for (let key in requestHeaders) {
        if (!requestData && key.toLowerCase() === 'content-type') {
          delete requestHeaders[key];
        } else {
          xhr.setRequestHeader(key, requestHeaders[key]);
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      xhr.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && xhr.upload) {
      xhr.upload.addEventListener('progress', config.onUploadProgress);
    }

    xhr.send(null);
  });
}
