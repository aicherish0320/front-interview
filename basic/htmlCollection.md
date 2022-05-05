# EventTarget

EventTarget 是一个 DOM 接口，由可以接收事件、并且可以创建侦听器的对象实现。Element、document 和 window 是最常见的 event targets

# Node

Node 是一个接口，各种类型的 DOM API 对象会从这个接口继承。

# Element

Element 是一个通用性非常强的基类，所有 Document 对象下的对象都继承自它。这个接口描述了所有相同种类的元素所普遍具有的方法和属性，

# Document

Document 接口表示任何在浏览器中载入的网页，并作为网页内容的入口，也就是 DOM 树。DOM 树包含了想 `<body>`这样的元素，以及大量其他元素。它像网页文档本身提供了全局操作功能，能解决如何获取页面的 URL，如何在文档中创建一个新的元素这样的问题。
