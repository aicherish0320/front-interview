console.info('start')
setImmediate(() => {
  console.info('setImmediate')
})
setTimeout(() => {
  console.log('timeout')
})
Promise.resolve().then(() => console.log('promise then'))
process.nextTick(() => console.log('nextTick'))
console.info('end')
