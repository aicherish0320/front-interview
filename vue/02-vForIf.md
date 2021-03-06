# v-if 和 v-for 哪个优先级更高？

# 思路分析：

1. 先给出结论
2. 为什么是这样的，说出细节
3. 哪些场景可能导致我们这样做，该怎么处理
4. 总结，拔高

# 回答范例

1. 实践中不应该把 `v-for` 和 `v-if` 放一起
2. 在 Vue2 中，`v-for`的优先级是高于 `v-if`，把它们放在一起，输出的渲染函数中可以看出会先执行循环再判断条件，哪怕我们只渲染列表中一小部分元素，也得在每次重渲染的时候遍历整个列表，这会比较浪费；另外需要注意的是在 Vue3 中则完全相反，`v-if` 的优先级高于 `v-for`，所以执行 `v-if`时，它调用的变量还不存在，就会导致异常
3. 源码里面关于代码生成的部分，能够清晰的看到是先处理 `v-if` 还是 `v-for`，顺序上 `Vue2` 和 `Vue3` 正好相反，因此产生了一些症状的不同，但是不管怎么样都是不能把它们写在一起的
