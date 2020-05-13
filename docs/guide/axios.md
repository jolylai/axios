---
title: Axios
order: 4
group:
  title: 网络请求
---

# axios

> [Promise based HTTP client for the browser and node.js](https://github.com/axios/axios)

## 状态码

```js
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
```

## 缓存 :star:

```js
const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};
```

## 带注解

```js
import axios from 'axios';
import { cloneDeep, isEmpty } from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant';
import qs from 'qs';

const { CancelToken } = axios;
window.cancelRequest = new Map();

// 默认域名 如果 option.url 中含有域名则使用 url 中的域名
axios.defaults.baseURL = 'http://localhost:8000';

export default function request(options) {
  let { data, url, method = 'get' } = options;
  const cloneData = cloneDeep(data);

  try {
    let domain = '';
    // 如果 url 中含有域名 解析出域名
    // 以便于 pathToRegexp 中的使用
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    // 解析 url
    const match = pathToRegexp.parse(url);

    // 拼装好url
    // eg: url = /api/user/:id   data对象中含有 {id: 1} 则拼装后的url 为 /api/user/1
    url = pathToRegexp.compile(url)(data);

    // 删除 data 中已经拼接入 url 中的属性
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + url;
  } catch (e) {
    message.error(e.message);
  }

  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : url;

  // 以下代码等同上一段的代码
  // options.url = url;
  // if (method.toLocaleLowerCase() === "get") {
  //   options.params = cloneData;
  // }

  // 用于取消请求
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    });
  });

  return axios(options)
    .then(response => {
      // 返回的状态码 status >= 200 && status < 300 时 将 resolve  （默认）
      const { statusText, status, data } = response;

      // 封装需要的响应体
      let result = {};
      if (typeof data === 'object') {
        result = data;
        if (Array.isArray(data)) {
          result.list = data;
        }
      } else {
        result.data = data;
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      });
    })
    .catch(error => {
      const { response, message } = error;

      // 请求被取消
      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        };
      }

      // 封装请求失败
      let msg;
      let statusCode;

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      });
    });
}
```

## 精简版

```js
import axios, { CancelToken } from 'axios';
import { cloneDeep } from 'lodash';
import pathToRegexp from 'path-to-regexp';

window.cancelRequest = new Map();

axios.defaults.baseURL = 'http://localhost:8000';

const CANCEL_REQUEST_MESSAGE = 'Request canceled';

function getRandomColor() {
  const tag = getRandomColor.tag + 1;
  getRandomColor.tag = tag === 7 ? 0 : tag;
  return getRandomColor.colors[tag];
}
getRandomColor.tag = 0;
getRandomColor.colors = [
  '#ff0000',
  '#ff4500',
  '#ff009d',
  '#008000',
  '#0000ff',
  '#8a2be2',
  '#000000',
];

function log(groupName, color, ...args) {
  const { group, groupEnd, info } = console;
  group(`%c${groupName}`, `color: ${color}`);
  info(...args);
  groupEnd(groupName);
}

export default function request(options) {
  let { data, url, method = 'get' } = options;
  const cloneData = cloneDeep(data);
  try {
    let domain = '';
    const urlMatch = url.match(/[a-zA-Z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);

    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }

    url = domain + url;
  } catch (e) {
    console.error(e.message);
  }

  options.url = url;
  options.data = cloneData;

  if (method.toLocaleLowerCase() === 'get') {
    options.params = cloneData;
  }

  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    });
  });

  const logColor = getRandomColor();
  log('request', logColor, cloneData);

  return axios(options)
    .then(response => {
      const { status, statusText, data } = response;
      log('response', logColor, data);
      return Promise.resolve(data);
    })
    .catch(error => {
      const { response, message } = error;
      if (message === CANCEL_REQUEST_MESSAGE) {
        return Promise.reject({
          message,
          status: false,
        });
      }
    });
}
```
