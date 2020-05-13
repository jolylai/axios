import { RequestConfig } from './types/request';
import xhrAdapter from './adapters/xhr';

const Axios = (config: RequestConfig) => {
  xhrAdapter(config);
};

export default Axios;
