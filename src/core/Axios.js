import InterceptorManager from './InterceptorManager';

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

Axios.prototype.request = function request(config) {
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  const chain = [undefined, undefined];

  const request = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor,
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor,
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    request.then(chain.shift(), chain.shift());
  }

  return request;
};

export default Axios;
