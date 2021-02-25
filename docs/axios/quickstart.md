---
title: 前言
order: 1
---

## 项目结构

```
├── adapters
│   ├── http.js
│   └── xhr.js
├── axios.js  # 主入口
├── cancel    # 请求取消
│   ├── Cancel.js
│   ├── CancelToken.js
│   └── isCancel.js
├── core  # 核心代码
│   ├── Axios.js
│   ├── InterceptorManager.js # 拦截器
│   ├── README.md
│   ├── buildFullPath.js  # 创建URL
│   ├── createError.js  # 错误
│   ├── dispatchRequest.js  # 发送请求
│   ├── enhanceError.js
│   ├── mergeConfig.js
│   ├── settle.js
│   └── transformData.js
├── defaults.js
├── helpers
│   ├── README.md
│   ├── bind.js
│   ├── buildURL.js
│   ├── combineURLs.js
│   ├── cookies.js
│   ├── deprecatedMethod.js
│   ├── isAbsoluteURL.js
│   ├── isAxiosError.js
│   ├── isURLSameOrigin.js
│   ├── normalizeHeaderName.js
│   ├── parseHeaders.js
│   └── spread.js
└── utils.js
```
