import React from 'react';

function xhrAdapter(config) {
  return new Promise(function dispatchXHRRequest(resolve, reject) {
    const xhr = new XMLHttpRequest();

    const requestData = config.data || null;

    xhr.open(config.method, config.url, true);

    xhr.onload = function handleLoad() {
      console.log(xhr.response);
    };

    xhr.onerror = function hadnleError() {
      reject('network error');

      // xhr = null;
    };

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && xhr.upload) {
      xhr.upload.addEventListener('progress', config.onUploadProgress);
    }

    xhr.send(requestData);
  });
}

function index() {
  const handleChage = event => {
    const files = event.target.files;
    if (files[0]) {
      uploadFile(files[0]);
    }
  };

  const uploadFile = file => {
    const formData = new FormData();

    formData.append('file', file);

    xhrAdapter({
      // url: 'https://xrtbeta.321go.com/common/file/upload',
      url: 'http://localhost:3000/upload',
      method: 'post',
      data: formData,
      onUploadProgress(event) {
        console.log('event: ', event);
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChage} />
    </div>
  );
}

export default index;
