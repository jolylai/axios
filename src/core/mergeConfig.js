import { isUndefined, isPlainObject } from '../utils';

export default function mergeConfig(config1, config2) {
  const valueFormConfig2Keys = ['url', 'method', 'data'];
  const mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  const defaultToConfig2Keys = [
    'baseURL',
    'transformRequest',
    'transformResponse',
    'paramsSerializer',
    'timeout',
    'timeoutMessage',
    'withCredentials',
    'adapter',
    'responseType',
    'xsrfCookieName',
    'xsrfHeaderName',
    'onUploadProgress',
    'onDownloadProgress',
    'decompress',
    'maxContentLength',
    'maxBodyLength',
    'maxRedirects',
    'transport',
    'httpAgent',
    'httpsAgent',
    'cancelToken',
    'socketPath',
    'responseEncoding',
  ];
  const directMergeKeys = ['validateStatus'];

  const config = {};

  function getMergedValue(target, source) {
    if (isPlainObject(target) && isPlainObject(source)) {
    }
  }

  valueFormConfig2Keys.forEach(function valueFormConfig2(prop) {
    if (!isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });
}
