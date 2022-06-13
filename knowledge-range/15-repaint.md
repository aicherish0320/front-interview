# 重绘 repaint 和重排 reflow 有什么区别？

## 动态网页，随时都会重排、重绘

- 网页动画
- Modal Dialog 弹窗
- 增加/删除一个元素，显示/隐藏一个元素

## 重绘 repaint

- 元素外观改变，如颜色、背景色
- 但元素的尺寸、定位不变，不会影响其他元素的位置

## 重排 reflow

- 重新计算尺寸和布局，可能会影响其他元素的位置
- 如元素高度增加，可能会使相邻位置下移

## 区别

- 重排比重绘要影响更大，消耗也更大
- 所以，要尽量避免无意义的重排

## 减少重排的方法

- 集中修改样式，或直接切换 css class
- 修改之前先设置 display: none，脱离文档流
- 使用 BFC 特性，不影响其他元素的位置
- 频繁触发（resize scroll） 使用节流和防抖
- 使用 createDocumentFragment 批量操作 DOM
- 优化动画，使用 CSS3 和 requestAnimationFrame

## BFC

- Block Format Context 块级格式化上下文
- 内部的元素无论如何改动，都不会影响其他元素的位置

### 触发 BFC 的条件

- 根节点 <html>
- float: left/right
- overflow: auto/scroll/hidden
- display: inline-block/table/table-row/table-cell
- display: flex/grid 的直接子元素
- position: absolute/fixed
