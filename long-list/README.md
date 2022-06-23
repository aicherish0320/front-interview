# 长列表优化

## 进程和线程

- 进程是系统进行资源分配和调度的一个独立单位，一个进程内包含多个线程

## 渲染进程

- GUI 渲染线程（页面渲染）
- JS 引擎线程（执行 JS 脚本的）
- 事件触发线程（EventLoop 轮询处理线程）
- 事件、定时器、ajax（独立线程）

> GUI 渲染进程 和 JS 引擎线程是互斥的

## 我们所谓的 JS 为什么是单线程的？

一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

## 浏览器中的 EventLoop

## 超长列表渲染性能优化

- 分片渲染（通过浏览器事件环机制，分割渲染时间）
- 虚拟列表（只渲染可视区域）