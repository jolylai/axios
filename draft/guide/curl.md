---
title: curl
---

## 简介

`curl` 是常用的命令行工具，用来请求 Web 服务器。它的名字就是客户端（client）的 URL 工具的意思。`curl` 功能非常强大，它的命令可以直接放到 postman 使用，postman 也是支持 `curl` 的请求方式。

## 常用的结果参数

`curl` 的参数包括很多，这里只说几个常用的，如果遇到复杂情况可以参考文档。
不知道是不是还有的小伙伴不知道 postman 直接支持 `curl` 命令,在 postman 中点击 code 就会出现对应请求的 `curl` 命令

- `-X` 参数指定 HTTP 请求的方法。
- `-H` 参数添加 HTTP 请求的标头。
- `-d` 参数用于发送 POST 请求的数据体。使用 -d 参数以后，HTTP 请求会自动加上标头 `Content-Type : application/x-www-form-urlencoded`。并且会自动将请求转为 POST 方法，因此可以省略-X POST
- `-b` 参数用来向服务器发送 Cookie。

想了解更多参数可以去看下[阮一峰老师文档](https://www.ruanyifeng.com/blog/2019/09/curl-reference.html)

## `curl` 项目中应用

如果对 `curl` 熟悉的小伙伴完全可以替代 postman 等工具，小伙伴可以直接模拟请求。（我认为 `curl` 能看到懂常用命令就够了）
因为在 BFF 项目中，好多时候前端也参与开发，我们也会直接调用后端的接口，有时候报错不知道是不是自己参数写错了，或者 cookie 有问题，找问题调试不方便，在 local 环境下，我们会直接打印出完整的 `curl` 请求，这时候可以直接看出错误，开发者只需要知道 `curl` 的一些参数就可以，还可以直接把 `curl` 命令复制到 postman 进行调试。看一下具体实现部分代码

```js
//只在本地环境输出
if (ctx.app.config.env === 'local') {
  const str =
    curlString(url, {
      method,
      headers,
      body,
    }) + '\n';
  console.log('\x1b[32m%s\x1b[0m', str);
}

/**
 * Builds a curl command and returns the string.
 * @param  {String} url               Endpoint
 * @param  {Object} options           Object with headers, etc. (fetch format)
 * @return {String}                   cURL command
 */
function curlString(url, options) {
  const method =
    options && options.method && typeof options.method === 'string'
      ? options.method.toUpperCase()
      : 'GET';

  const hasHeaders =
    options && options.headers && typeof options.headers === 'object';
  const hasBody = options && options.body;

  let curl = `\ncurl --request ${method} \\\n--url '${url}'`;

  if (hasHeaders) {
    curl +=
      ' \\\n' +
      Object.entries(options.headers)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `--header '${key}: ${value}'`)
        .join(' \\\n');
  }

  if (hasBody) {
    curl += ` \\\n--data '${bodyToDataString(options)}'`;
  }

  return curl;
}

/**
 * Constructs a body string for use inside --data
 * @param  {Object} options           Object with headers, etc. (fetch format)
 * @return {String}                   cURL command data string
 */
function bodyToDataString(options) {
  let parsedData;
  try {
    parsedData = JSON.parse(options.body);
  } catch (e) {
    // fall back to original body if it could not be parsed as JSON
    parsedData = options.body;
  }

  // return an ampersand delimited string
  const headers = _.get(options, 'headers');
  const contentType = _.toLower(
    _.get(headers, 'content-type') || _.get(headers, 'Content-Type'),
  );
  if (contentType === 'application/x-www-form-urlencoded') {
    if (typeof parsedData === 'string') {
      return parsedData;
    } else {
      return Object.entries(parsedData)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
    }
  } else {
    return JSON.stringify(parsedData);
  }
}
```
