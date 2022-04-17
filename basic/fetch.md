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

可以通过 HTML `<input type="file" />` 元素，`FormData()` 和 `Fetch`上传文件

```js
document.getElementById('file').addEventListener('change', () => {
  const formData = new FormData()
  const fileField = document.querySelector('input[type="file"]')

  formData.append('username', 'aic')
  formData.append('avatar', fileField.files[0])

  fetch('http://localhost:3300/profile', {
    method: 'PUT',
    body: formData
  })
    .then((response) => response.json())
    .then((result) => {
      console.log('Success >>> ', result)
    })
    .catch((error) => {
      console.error('Error >> ', error)
    })
})
```

## 检测请求是否成功

如果遇到网络故障或服务端的 CORS 配置错误时，fetch() promise 将会 reject，带上一个 TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题-比如 404 不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是否为 true。类似以下代码：

```js
fetch('flowers.jpg')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.blob()
  })
  .then((myBlob) => {
    myImage.src = URL.createObjectURL(myBlob)
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation', error)
  })
```

## 自定义请求对象

除了传给 fetch() 一个资源的地址，你还可以通过使用 Request 构造函数来创建一个 request 对象，然后再作为参数传给 fetch()

```js
const myHeaders = new Headers()

const myRequest = new Request('flowers.jpg', {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
})
fetch(myRequest)
  .then((response) => response.blob())
  .then((myBlob) => {
    myImage.src = URL.createObjectURL(myBlob)
  })
```

## Headers

使用 Headers 的接口，你可以通过 Headers() 构造函数来创建一个你自己的 headers 对象。一个 headers 对象是一个简单的多键值对：

```js
const content = 'Hello World'
const myHeaders = new Headers()
myHeaders.append('Content-Type', 'text/plain')
myHeaders.append('Content-Length', content.length.toString())
myHeaders.append('Content-Type', 'text/plain')
```

## Response 对象

Response 实例是在 fetch() 处理完 promise 之后返回的

你会用到的最常见的 response 属性有：

- Response.status - 整数（默认值为 200）为 response 的状态码
- Response.statusText - 字符串。该值与 HTTP 状态码消息对应
- Response.ok，该属性是用来检查 response 的状态是否在 200-299 这个范围内。该属性返回一个布尔值

Response() 构造方法接受两个可选参数 - response 的 body 和一个初始化对象

## Body

不管是请求还是响应都能够包含 body 对象。body 也可以是以下任意类型的实例

- ArrayBuffer
- ArrayBufferView
- Blob/File
- string
- URLSearchParams
- FormData
