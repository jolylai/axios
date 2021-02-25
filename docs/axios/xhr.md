---
title: XMLHttpRequest
---

<code src="../../demo/upload" />

## 文件下载进度

```js
function xhrAdapter(config) {
  return new Promise(function dispatchXHRRequest(resolve, reject) {
    const xhr = new XMLHttpRequest();

    const requestHeaders = config.headers;
    const requestData = config.data;

    xhr.open(config.method, config.url, true);

    xhr.onload = function handleLoad() {
      console.log(xhr.response);
    };

    xhr.onerror = function hadnleError() {
      reject('network error');

      xhr = null;
    };

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      xhr.addEventListener('progress', config.onDownloadProgress);
    }

    if (!requestData) {
      requestData = null;
    }

    xhr.send(null);
  });
}
```

## 文件上传进度

```js
function xhrAdapter(config) {
  return new Promise(function dispatchXHRRequest(resolve, reject) {
    const xhr = new XMLHttpRequest();

    const requestData = config.data;

    xhr.open(config.method, config.url, true);

    xhr.onload = function handleLoad() {
      console.log(xhr);
    };

    xhr.onerror = function hadnleError() {
      reject('network error');

      xhr = null;
    };

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && xhr.upload) {
      xhr.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (!requestData) {
      requestData = null;
    }

    xhr.send(null);
  });
}
```

## 响应超时
