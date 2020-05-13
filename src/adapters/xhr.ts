import { RequestConfig } from '@/types/request';

const xhrAdapter = (config: RequestConfig) => {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, params } = config;

    const request = new XMLHttpRequest();

    request.open(method, url, true);

    request.send(data);
  });
};

export default xhrAdapter;
