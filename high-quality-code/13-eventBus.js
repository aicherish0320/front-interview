/**
 * 手写 EventBus 自定义事件
 * on once
 * emit
 * off
 *
 * on 绑定的事件可以连续执行，除非 Off
 * once 绑定的函数 emit 一次即删除，也可以未执行而被 off
 */

// const handles = {
//   click: [
//     {
//       fn: fn1,
//       isOnce: true
//     },
//     { fn: fn2, isOnce: false }
//   ],
//   mouse: [
//     {
//       fn: fn1,
//       isOnce: true
//     },
//     { fn: fn2, isOnce: false }
//   ]
// }

class EventBus {
  constructor() {
    this.handles = {}
  }

  on(eventName, fn) {
    if (!this.handles[eventName]) {
      this.handles[eventName] = []
    }
    this.handles[eventName].push({ fn, isOnce: false })
  }
  once(eventName, fn) {
    if (!this.handles[eventName]) {
      this.handles[eventName] = []
    }
    this.handles[eventName].push({ fn, isOnce: true })
  }
  emit(eventName, ...args) {
    const fns = this.handles[eventName]
    this.handles[eventName] = fns.filter((item) => {
      const { fn, isOnce } = item
      fn(...args)
      return !isOnce
    })
  }
  off(eventName, fn) {
    if (!fn) {
      this.handles[eventName] = []
    } else {
      const fns = this.handles[eventName]
      this.handles[eventName] = fns.filter((item) => item.fn !== fn)
    }
  }
}

function fn(args) {
  console.log('fn - ', args)
}

const bus = new EventBus()

bus.on('click', fn)
bus.emit('click', 123)
