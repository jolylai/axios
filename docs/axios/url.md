---
title: URL 处理
---

## 路径处理

```js
axios({
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com',
  url: '/api/user',
});
```

绝对 URL

```js
/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
```

通过组合指定的 URL 来创建新的 URL

```js
/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}
```

通过组合 baseURL 和 requestURL 创建一个新的 URL

```js
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
```

## 请求参数

使用 GET 请求经常会发生的一个错误，就是查询字符串的格式有问题。查询字符串中每个参数的名 称和值都必须使用 encodeURIComponent()进行编码，然后才能放到 URL 的末尾;而且所有名-值对 儿都必须由和号(&)分隔

```js
function encode(val) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
```

```js
axios({
  url: 'www.google.com',
  params: {
    a: 1,
    b: 2,
  },
});
```

我们希望将`params` 对象的 key 和 value 拼接到 `url` 上即 `www.google.com?a=1&b=2`，这样服务端就能通过解析 `url` 得到传递的参数

### 数组

```js
axios({
  url: 'www.google.com',
  params: {
    list: ['foo', 'bar'],
  },
});
```

最终 `url` 为 `wwww.google.com?list[]=foo&list[]=bar`

### 对象

```js
axios({
  url: 'www.google.com',
  params: {
    obj: {
      a: 1,
      b: 2,
    },
  },
});
```

最终 `url` 为 `wwww.google.com?obj=` obj 后面拼接的是`{ a: 1, b: 2, }` encode 后的结果

### Date

```js
axios({
  url: 'www.google.com',
  params: {
    date: new Date(),
  },
});
```

最终 `url` 为 `wwww.google.com?date=2020-05-13T06:15:54.456Z` date 后面拼接的是 `date.toISOString()` 后的结果

### 特殊字符

`@` `:` `$` `,` `+` `[` `]`, 这些特殊字符允许出现的 url 中，不希望被 encode

```js
function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
```

### 空值

对值为 `null` 和`undefined` 的属性不拼接到 url

```js
axios({
  url: 'www.google.com',
  params: {
    a: undefined,
    b: null,
    c: 1,
  },
});
```

最终 `url` 为 `wwww.google.com?c=1`

### hash

丢弃 url 中的 hash 标记

对值为 `null` 和`undefined` 的属性不拼接到 url

```js
axios({
  url: 'www.google.com#hash',
  params: {
    a: 1,
  },
});
```

最终 `url` 为 `wwww.google.com?a=1`

### 保留

保留 url 中已存在的参数

```js
axios({
  url: 'www.google.com?bar=foo',
  params: {
    a: 1,
  },
});
```

最终 `url` 为 `wwww.google.com?bar=foo&a=1`

## [encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

## URLSearchParams

[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 接口定义了一些实用的方法来处理 URL 的查询字符串。

```js
var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

searchParams.has('topic') === true; // true
searchParams.get('topic') === 'api'; // true
searchParams.getAll('topic'); // ["api"]
searchParams.get('foo') === null; // true
searchParams.append('topic', 'webdev');
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set('topic', 'More webdev');
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete('topic');
searchParams.toString(); // "q=URLUtils.searchParams"
```

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```
