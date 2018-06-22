'use strict'
const _ = require('lodash')
const koa = require('koa')
const path = require('path')
const cors = require('koa-cors')
const config = require('config')
const error = require('koa-error')
const favicon = require('koa-favicon')
const validate = require('koa-validate')
const jwtMongo = require('koa-jwt-mongo')
const bodyParser = require('koa-bodyparser')
const pathToRegexp = require('path-to-regexp')
const staticCache = require('koa-static-cache')
const koaBunyanLogger = require('koa-bunyan-logger')

const util = require('./util')
const logger = require('./util/log')
const middleware = require('./middlewares')
const routerConfig = require('./router-config')

const app = module.exports = koa()
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

const serve = (pf, filePath, cache) => staticCache(resolve(filePath), {
  prefix: pf,
  gzip: true,
  dynamic: true,
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

util.dropFileSchedule()
validate(app)

const requestLogger = isProd
  ? koaBunyanLogger.requestLogger()
  : function* (next) {
    yield next
  }
app.proxy = config.get('proxy')
app
  .use(favicon(path.join(__dirname, '/public/images/icon.png')))
  .use(serve('/dist', './dist'))
  .use(serve('/public', './public'))
  .use(serve('/upload', path.resolve(__dirname, 'config', config.get('upload').dir)))
  .use(koaBunyanLogger(logger))
  .use(koaBunyanLogger.requestIdContext())
  .use(requestLogger)
  .use(cors({
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
    maxAge: 2592000
  }))
  .use(error())
  .use(bodyParser())
  .use(middleware.common)
  .use(middleware.error)
  .use(jwtMongo({
    uri: config.get('db'),
    jwtExp: config.get('jwt.expire'),
    collection: config.get('jwt.collection'),
    jwtOptions: {
      secret: config.get('jwt.secret'),
      key: config.get('jwt.key')
    },
    jwtUnless () {
      const path = this.path
      const prefix = `/${path.split('/')[1]}`
      return !(new RegExp(config.get('routerPrefix.api'))).test(prefix)
        ? true : _.some(config.get('publicAPIs').map(
          o => pathToRegexp(o).test(this.path)
        ), Boolean)
    }
  }))
  .use(routerConfig.mock.routes())
  .use(routerConfig.mock.allowedMethods())
  .use(routerConfig.api.routes())
  .use(routerConfig.api.allowedMethods())
  .use(middleware.view(app))

if (!module.parent) {
  app.listen(config.get('port'))
}

// 导入WebSocket模块:
const WebSocket = require('ws')

// 引用Server类:
const WebSocketServer = WebSocket.Server

// 实例化:
const wss = new WebSocketServer({ port: 22300 })

// 定义数据库相关
const MongoClient = require('mongodb').MongoClient
const mngUrl = 'mongodb://10.122.1.110:27017/'

let urls = {}
wss.on('connection', (ws) => {
  let timer
  ws.on('message', (message) => {
    console.log(`[SERVER] Received: ${message}`)
    const msg = JSON.parse(message)
    const key = msg.name + msg.projectSaveName
    if (urls[key] || urls[key] === '') { urls[key] = undefined }
    queryData(key, msg, ws)
    timer = setInterval(() => { queryData(key, msg, ws) }, 5000)
  })
  ws.on('close', function () {
    console.log('stopping client ws')
    clearInterval(timer)
  })
})
const queryData = (key, msg, ws) => {
  if (Object.keys(urls).length > 200) { urls = {} }
  MongoClient.connect(mngUrl, (err, db) => {
    if (err) throw err
    const dbo = db.db('yangliu')
    dbo.collection('users').find({ 'name': msg.name }).toArray((err, result) => {
      if (err) throw err
      let preUrl = urls[key]
      if (result.length > 0) {
        const resUrl = (result[0].selectedUrl && result[0].selectedUrl[msg.projectSaveName]) || ''
        sendData(preUrl, resUrl, key, ws)
      } else {
        ws.send(JSON.stringify({ err: 'Not find the user' }),() => {
          ws.terminate()
        })
      }
    })
  })
}
const sendData = (preUrl, resUrl, key, ws) => {
  if (!preUrl && preUrl !== '') {
    !resUrl ? urls[key] = '' : urls[key] = resUrl
    ws.send(JSON.stringify(resUrl))
  } else {
    const notSame1 = resUrl.serverurl && preUrl.serverurl && (resUrl.serverurl !== preUrl.serverurl || resUrl.transmitUrl !== preUrl.transmitUrl)
    const notSame2 = (preUrl.serverurl && resUrl === '') || (resUrl.serverurl && preUrl === '')
    if (notSame1 || notSame2) {
      urls[key] = resUrl
      ws.send(JSON.stringify(resUrl))
    }
  }
}

console.log('ws server started at podrt 22300...')
