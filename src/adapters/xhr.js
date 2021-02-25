const xhrAdapter = config => {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, params } = config;

    const request = new XMLHttpRequest();

    request.open(method, url, true);

    request.onload = function handleLoad() {};

    request.send(data);
  });
};

export default xhrAdapter;
