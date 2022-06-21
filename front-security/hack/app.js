const Koa = require('koa')
const chalk = require('chalk')

const log = (contents) => {
  console.log(chalk.red(contents))
}

const app = new Koa()
const static = require('koa-static')

app.use(static(__dirname + '/views'))

app.use(async (ctx, next) => {
  log('hack >>> ' + ctx.url)
  await next()
})

module.exports = app
