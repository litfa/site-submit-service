/*
 * @Author: litfa
 * @Date: 2022-04-13 17:23:18
 * @LastEditTime: 2022-04-14 15:34:11
 * @LastEditors: litfa
 * @Description: app
 * @FilePath: /service/src/app.ts
 * 
 */
import express from 'express'
import config from './config/config'
import { join } from 'path'
import bodyParser from 'body-parser'
import expressJWT from 'express-jwt'
import JWTUnless from './config/JWTUnless'
const app = express()

// 处理posy
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: JWTUnless }))

// 错误中间件
app.use((err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // 省略其它代码...

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.send({ status: 3, msg: '认证失败，请重新登录' })

  // 未知错误...
})

import router from './router/index'
app.use(config.apiBaseUrl, router)

app.get('*', (req, res) => {
  let siteName = req.hostname.split('.')[0]
  let siteDir = join(__dirname, './site/', siteName)
  let path = req.path == '/' ? '/index.html' : req.path
  let file = join(siteDir, path)
  res.sendFile(file)
})

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
})