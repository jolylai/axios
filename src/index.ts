import { RequestConfig } from './types/request';
import xhrAdapter from './adapters/xhr';
import buildURL from './helpers/buildUrl';
import { precessHeaders } from './helpers/headers';
import { processData } from './helpers/data';

const processConfig = (config: RequestConfig) => {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformData(config);
};

const transformURL = (config: RequestConfig): string => {
  return buildURL(config.url, config.params);
};

const transformData = (config: RequestConfig): any => {
  return processData(config.data);
};

const transformHeaders = (config: RequestConfig): any => {
  const { headers = {}, data } = config;
  return precessHeaders(headers, data);
};

const Axios = (config: RequestConfig) => {
  processConfig(config);
  xhrAdapter(config);
};

export default Axios;
