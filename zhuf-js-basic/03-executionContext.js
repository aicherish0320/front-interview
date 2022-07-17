/*
  每次函数执行的时候，会产生一个执行上下文，执行上下文是一个对象
  执行上下文里面会创建一个变量对象，里面存放着当前函数内的变量
  基本数据类型保存在变量对象里的，引用数据类型要单独在堆内存里开辟空间保存
  变量对象里保存的就是堆里的内存地址
*/
function task(m, n) {
  var a = 1
  var b = {
    name: 'aic'
  }
  debugger
  var c = [1, 2, 3]
}

task(10, 20)

// task 的执行上下文
const taskExecutionContext = {
  // variable object 变量对象
  VO: {
    a: 1,
    b: 'xo1',
    c: 'xa1'
  }
}
