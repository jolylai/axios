function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({ fulfilled, rejected });

  return this.handlers.length - 1;
};

InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function forEachHandler(handler) {
    if (handler) {
      fn(handler);
    }
  });
};

function Axios() {
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

Axios.prototype.request = function request(config) {
  const chain = [];

  this.interceptors.request.forEach(function unshiftRequestIntercepters(
    interceptor,
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseIntercepters(
    interceptor,
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  let promise = Promise.resolve(config);

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};
