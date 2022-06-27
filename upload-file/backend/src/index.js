const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const fse = require('fs-extra')
const static = require('koa-static')
const path = require('path')

const app = new Koa()

app.use(cors())
app.use(static(path.resolve(__dirname, '../public')))
app.use(
  koaBody({
    multipart: true
  })
)

const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'Hello'
})

router.post('/upload_file', async (ctx) => {
  const { name } = ctx.request.body
  const file = ctx.request.files.file
  const originalFilename = file.originalFilename
  const target = path.resolve(__dirname, '../public/' + originalFilename)

  await fse.move(file.filepath, target, {
    overwrite: true
  })

  ctx.body = target
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3001, () => console.log('3001 port'))
