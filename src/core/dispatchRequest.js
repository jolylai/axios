import transformData from './transformData';
import { merge, forEach } from '../utils';
import defaults from '../defaults';

export default function dispatchRequest(config) {
  // 转行请求数据
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest,
  );

  config.headers = merge(
    config.headers.commom || {},
    config.headers[config.method] || {},
    config.headers,
  );

  forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    },
  );

  const adapter = config.adapter || defaults.adapter;

  return adapter(config).then(
    function onAdapterResolution(response) {
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse,
      );

      return response;
    },
    function onAdapterRejection(reason) {},
  );
}
