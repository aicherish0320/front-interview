# 前端基础知识

- HTML CSS JS 基础知识
- HTTP Ajax 基础知识
- Vue React 等框架的基础知识

## 题

- 1. Ajax Fetch Axios 的区别
  - 三者都用于网络请求，但是不同维度
  - Ajax 一种技术统称
  - Fetch 具体的 API
    - 浏览器原生 API，用于网络请求
    - 和 XMLHttpRequest 一个级别
    - Fetch 语法更加简介、易用，支持 Promise
  - Axios 第三方库
    - 最常用的网络请求 lib
    - 内部可以用 XMLHttpRequest 和 Fetch 来实现
- 2. 防抖和节流
  - 防抖：防止抖动，你先抖动着，啥时候停了，再执行下一步
    - 例如，一个搜索输入框，等输入停止后，再触发搜索
  - 节流，节省交互沟通，例如：drag 或 scroll 期间触发某个回调，要设置一个时间间隔
  - 节流：限制执行频率，有节奏的执行
  - 防抖：限制执行次数，多次密集的触发只执行一次
  - 节流关注过程，防抖关注结果
- 3. px % em rem vw/vh 有什么区别
  - px：基本单位，绝对单位（其他的都是相对单位）
  - %：相对于父元素的宽度比例
  - em：相对于当前元素的 font-size
  - rem：相对于根节点的 font-size
  - vw：屏幕宽度的 1%
  - vh：屏幕高度的 1%
  - vmin：两者的最小值，vmax 两者的最大值
- 4. 箭头函数
  - 箭头函数有什么缺点
    - 没有 arguments
    - 无法通过 apply call bind 改变 this
  - 什么时候不能使用箭头函数
    - 对象方法
      ```js
      const obj = {
        name: 'aic',
        getName: () => {
          console.log(this.name) // undefined
        }
      }
      ```
    - 原型方法
      ```js
      const obj = {
        name: 'aic'
      }
      obj.__proto__getName = () => {
        return this.name // undefined
      }
      ```
    - 构造函数
      ```js
      const Foo = (name, age) => {
        this.name = name
        this.age = age
      }
      const f = new Foo('jack', 20) // error, Foo is not a constructor
      ```
    - 动态上下文中的回调函数
      ```js
      const btn = document.getElementById('btn1')
      btn.addEventListener('click', () => {
        // this === window
        this.innerHTML = 'clicked'
      })
      ```
    - Vue 生命周期 和 method
- Vue 组件通讯方式有几种？尽量说全面
