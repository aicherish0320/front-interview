# 什么是 AJAX？

`AJAX`是异步的 `JavaScript` 和 `XML` (Asynchronous JavaScript And XML)。简单点说，就是用 `XMLHttpRequest` 对象与服务器通信。它可以使用 JSON、XML、HTML 和 text 文本等格式发送和接收数据。AJAX 最吸引人的就是它的**异步**特性，也就是说它可以在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面

你可以使用 AJAX 最主要的两个特性做下列事：

- 在不重新加载页面的情况下发送请求给服务器
- 接收并使用从服务器发来的数据

## step 1 - 怎样发送 http 请求

为了使用 JavaScript 向服务器发送一个 http 请求，你需要一个包含必要函数功能的对象实例。这就是为什么会有 `XMLHttpRequest`的原因。这是 IE 浏览器的 ActiveX 对象 XMLHttp 的前身。随后 Mozilla、Safari 和其他浏览器也都实现了类似的方法，被称为 XMLHttpRequest。同时，微软也实现了 XMLHttpRequest 方法

```js
if (window.XMLHttpRequest) {
  httpRequest = new XMLHttpRequest()
} else if (window.ActiveXObject) {
  httpRequest = new ActiveXObject('Micorsoft.XMLHttp')
}
```

发送一个请求后，你会收到响应。在这一阶段，你要告诉 XMLHttp 请求对象是哪一个 JavaScript 函数处理响应，在设置了对象的 onreadystatechange 属性后给它命名，当请求状态改变时调用函数。

```js
httpRequest.onreadystatechange = function () {
  // process the server response here
}
```

接下来，声明当你接到响应后要做什么，你要发送一个实际的请求，通过调用 HTTP 请求对象的 `open()` 和 `send()` 方法，像下面这样：

- `open()`的第一个参数是 HTTP 请求方法- 有 GET、POST，HEAD 以及服务器支持的其他方法。保证这些方法一定要是大写字母，否则其他一些浏览器可能无法处理这个请求。
- 第二个参数是你要发送的 URL。由于安全原因，默认不能调用第三方 URL 域名。确保你在页面中使用的是正确的的域名，否则在调用`open`方法是会有"permission denied"错误提示。一个容易犯的错误是你企图通过 `domain.tld` 访问网站，而不是使用 `www.domain.tld`。
- 第三个参数是可选的，用于设置请求是否是异步的。如果设置为 true 默认值，即开启异步，JavaScript 就不会在此语句阻塞，使得用户能在服务器还没有响应的情况下与页面进行交互。

send() 方法的参数可以是任何你想发送给服务器的内容，如果是 post 请求的话。发送表单数据时应该用服务器可以解析的格式，像查询语句：
`name=value&so=on`
或者其他格式，类似 `multipart/form-data`，JSON，XML 等。
如果你使用 POST 数据，那就需要设置请求的 MIME 类型。比如，在调用 send() 方法获取表单数据前要有下面这个：

```js
httpRequest.setRequestHeader(
  'Content-Type',
  'application/x-www.form.urlencoded'
)
```

## step2 处理服务器响应

在发送请求时，你提供的 JavaScript 函数名负责处理响应

```js
httpRequest.onreadystatechange = nameOfTheFunction
```

这个函数应该做什么？首先，函数要检查请求的状态，如果状态的值是 XMLHttpRequest.DOME（对应的值是 4），意味着服务器响应接收到了并且是没问题的，然后就可以继续执行。

```js
if (httpRequest.readyState === XMLHttpRequest.DONE) {
  // Everything is good,the response was received
} else {
  // Not ready yet
}
```

全部 readyState 状态值：

- 0（未初始化）or （请求还未初始化）
- 1（正在加载）or （已建立服务器连接）
- 2（加载成功）or （请求已接受）
- 3（交互）or （正在处理请求）
- 4（完成）or （请求已完成并且响应已准备好）

接下来，在下面的例子中，我们通过检查响应码 `200 ok`判断 AJAX 有没有成功

```js
if (httpRequest.status === 200) {
  // Perfect
} else {
  // There was a problem with the request
  // For example,the response may have a 404 (Not Found)
  // or 500 (Internal Server Error) response code
}
```

在检查玩请求状态和 HTTP 响应码后，你就可以用服务器返回的数据做任何你想做的了。你有两个方法去访问这些数据：

- httpRequest.responseText - 服务器以文本字符的形式返回
- httpRequest.responseXML - 以 XMLDocument 对象方式返回，之后就可以使用 JavaScript 来处理

## step3 - 一个简单的例子

让我们把所有的知识都集中起来做一个简单的 HTTP 请求。这个 JavaScript 会请求一个 HTML 文档 test.html，包含 "I am a test" 内容，然后我们 alert() 响应的内容。注意这个例子我们只是用了 JavaScript ，没有用 jQuery，而且 HTML、XML 和 PHP 文件都要放在一个目录下。

```html
<button id="ajaxButton" type="button">Make a request</button>
<script>
  ;(function () {
    var httpRequest
    document.getElementById('ajaxButton').addEventListener('click', makeRequest)
    function makeRequest() {
      httpRequest = new XMLHttpRequest()
      if (!httpRequest) {
        alert('Give up')
        return false
      }
      httpRequest.onreadystatechange = alertContents
      httpRequest.open('get', 'test.html')
      httpRequest.send()

      function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            alert(httpRequest.responseText)
          } else {
            alert('There was a problem with the request')
          }
        }
      }
    }
  })()
</script>
```
