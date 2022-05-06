'use strict'

//! n is not defined
// n = 10

// var obj = {
//   x: 10
// }
//! Strict mode code may not include a with statement
// with (obj) {
//   console.log(x)
// }
//* 创建 eval 作用域
// var x = 10
// eval('var x = 20; console.log(x)')
// console.log(x)
//* 禁止 this 指向 window
// function fn() {
//   console.log(this) // undefined
// }
// fn()
// * 函数参数不能重复
function fn(x, x, y) {}
// !Duplicate parameter name not allowed in this context
fn(1, 2, 3)
