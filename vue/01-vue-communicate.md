# Vue 组件通信方式

# 思路分析

1. 总述知道的所有方式
2. 按组件关系阐述使用场景

# 回答范例

- 组件通信常用方式有以下几种：
  1. props
  2. $emit
  3. $parent
  4. $attrs
  5. ref
  6. $root
  7. eventBus
  8. vuex

注意：$children $listeners 废除了

- 根据组件之间的关系讨论组件通信最为清晰有效
  - 父子组件
    - `props $emit $parent ref $attrs`
  - 兄弟组件
    - `$parent $root eventBus vuex`
  - 跨层级关系
    - `eventBus vuex provide/inject`
