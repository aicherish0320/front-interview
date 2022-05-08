# 知识深度

## 为何要考察

- 探测技术天花板，看技术潜力
- 入职定级的重要参考标准
- 希望和有技术深度的工程师共事

## 考察重点

- 非应用层面，深度到原理层面
- JS 相关原理
- Vue React 等框架的原理

## 注意事项

- 技术深度，有 1-2 方面即可，深，就不能广
- 技术深度题目不过关，不一定面试不通过

### JS 内存泄漏如何检测？场景有哪些？

- 垃圾回收
  - 垃圾回收算法
    - 引用计数（之前），计数为 0，则被清除，存在循环引用问题
    - 标记清除（现代）

内存泄漏是非预期的情况
闭包是预期的，并不是内存泄漏

- JS 内存泄漏如何检测？场景有哪些？
- 内存泄漏的场景 （Vue 为例）
  - 被全局变量、函数引用，组件未销毁时未清除
  - 被全局事件、定时器引用，组件销毁时未清除
  - 被自定义事件引用，组件销毁时未清除

### 浏览器和 NodeJS 的事件循环有什么区别？

- 单线程和异步
  - JS 是单线程的（无论是浏览器还是 NodeJS）
  - 浏览器中 JS 执行和 DOM 渲染共用一个线程
  - 异步
- 宏任务 和 微任务
  - 宏任务：setTimeout setInterval 网络请求
  - 微任务：promise async/await mutationObserver
  - 微任务在下一轮 DOM 渲染之前执行，宏任务在之后执行
- NodeJS 异步
  - NodeJS 同样使用 ES 语法，也是单线程，也需要异步
  - 异步任务也分：宏任务 + 微任务
  - 但是，它的宏任务和微任务，分不同类型，有不同优先级
- NodeJS 宏任务类型和优先级
  - Timers - setTimeout setInterval
  - I/O callbacks - 处理网络、流、TCP 的错误回调
  - Idle、prepare - 闲置状态 （NodeJS 内部使用）
  - Poll 轮询 - 执行 poll 中的 I/O 队列
  - Check 检查 - 存储 setImmediate 回调
  - Close callbacks - 关闭回调，如 socket.on('close')
  - promise async/await process.nextTick
  - process.nextTick 优先级最高
- NodeJS Event Loop
  - 执行同步代码
  - 执行微任务 （process.nextTick 优先级更高）
  - 按顺序执行 6 个类型的宏任务
