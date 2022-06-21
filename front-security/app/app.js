const Koa = require('koa')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const views = require('koa-views')

const app = new Koa()

app.use(bodyParser())
app.keys = ['some secret']
const CONFIG = {
  key: 'aicherish',
  maxAge: 86400000,
  overwrite: false,
  httpOnly: false,
  signed: false,
  rolling: false
}

app.use(session(CONFIG, app))
app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// app.use(async (ctx, next) => {
//   await next()
// })

router.get('/', async (ctx) => {
  await ctx.render('index', {
    from: ctx.query.from,
    username: ctx.session.username,
    text: '泪好啊'
  })
})

router.get('/login', async (ctx) => {
  await ctx.render('login')
})

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  ctx.session.username = username
  ctx.body = 'Hello'
})

// router.post('/updateText', async (ctx) => {
//   ctx.redirect('/')
// })

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
