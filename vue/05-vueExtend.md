# Vue 中如何扩展一个组件

# 答题思路

1. 按照逻辑扩展和内容扩展来举例

- 逻辑扩展有：mixins、extends、composition api
- 内容扩展有 slots

2. 分别说出他们使用方法、场景差异和问题
3. 作为扩展，还可以说说 Vue3 中新引入的 composition api 带来的变化

# 回答范例：

1. 常见的组件扩展方法有：mixins、slots、extends 等
2. 混入 mixins 是分发 Vue 组件中可能复用功能的非常灵活的方法。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项

```js
const myMixin = {
  methods: {
    doSomething() {}
  }
}
// 全局混入
Vue.mixin(myMixin)
// 局部混入
const Comp = {
  mixins: [myMixin]
}
```

3. 插槽主要用于 Vue 组件中的内容分发，也可以用于组件扩展
   如果要精确分发到不同位置可以使用具名插槽，如果要使用子组件中的数据可以使用作用域插槽。
4. 组件选项中还有一个不太常用的选项 extends，也可以起到扩展组件的目的

```js
const myExtends = {
  methods: {
    doSomething() {}
  }
}
// 组件扩展：做数组项设置到 extends 选项，仅作用于当前组件
// 跟混入的不同时它只能扩展单个对象
// 另外如果和混入发生冲突，该选项优先级较高，优先起作用
const Comp = {
  extends: myExtends
}
```

5. 混入的数据和方法不能明确判断来源且可能和当前组件内变量产生命名冲突，Vue3 中引入的 composition api，可以很好解决这些问题，利用独立出来的响应式模块可以很方便的编写独立逻辑并提供响应式数据，然后在 setup 选项中组合使用，增强代码的可读性和维护性。
