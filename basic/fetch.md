# 使用 Fetch

Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。它还提供了一个全局 fetch() 方法，该方法提供了一种简单，合理的方式来跨网络异步请求获取资源。

这种功能以前是使用 XMLHttpRequest 实现的。Fetch 提供了一个更理想的替代方案，可以很容地被其他技术使用，例如 Service Workers。Fetch 还提供了专门的逻辑空间来定义其他与 HTTP 相关的概念，例如 CORS 和 HTTP 的扩展

请注意，fetch 规范 与 jQuery.ajax() 主要有以下的不同：

- 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码时 404 或 500，相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200-299 的范围内，则设置 resolve 返回值的 ok 属性 为 false），仅当网络故障时或请求被阻止时，才会标记为 reject。

- fetch 不会发送跨域 cookies，除非你使用了 credentials 的初始化选项

一个基本的 fetch 请求设置起来很简单。看看下面的代码：

```js
fetch('http://example.com/movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data))
```

这里我们通过网络获取一个 JSON 文件并将其打印到控制台。最简单的用法只是提供一个参数用来指明想 fetch() 到的资源路径，然后返回一个包含相应结果的 promise

当然它只是一个 HTTP 响应，而不是真的 JSON。为了获取 JSON 的内容，我们需要使用 json() 方法（该方法返回一个将响应 body 解析成 JSON 的 promise）

## 支持的请求参数

fetch() 接受第二个可选参数，一个可以控制不同配置的 init 对象

```js
// Example POST method implementation
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET , POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors *cors same-origin
    cache: 'no-cache', // *defaults no-cache reload force-cache only-if-cached
    credentials: 'same-origin', // include, *same-origin omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow', // manual *follow error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade origin origin-when-cross-origin same-origin strict-origin strict-origin-when-cross-origin unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

postData('http://localhost:3300/body', {
  pageSize: 10,
  pageIndex: 1
})
```

## 上传文件
