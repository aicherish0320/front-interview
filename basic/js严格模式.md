# JS 严格模式有什么特点？

```js
'use strict' // 开启严格模式
function fn() {
  'use strict' // 某个函数开启
}
```

## 特点

- 全局变量必须先声明
- 禁止使用 with
- 创建 eval 作用域
- 禁止 this 指向 window
- 函数参数不能重名
