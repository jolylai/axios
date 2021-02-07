import transformData from './transformData';

export default function dispatchRequest(config) {
  // 转行请求数据
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest,
  );
}
