---
title: 拦截器
---

## 前言

## InterceptorManager

```js
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
  this.handlers.forEach(handler => {
    if (handler != null) {
      fn(handler);
    }
  });
};

export default InterceptorManager;
```

## Axios

```js
import InterceptorManager from './InterceptorManager';

function Axios(instanceConfig) {
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

Axios.prototype.request = function request(config) {
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
```
