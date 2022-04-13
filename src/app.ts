/*
 * @Author: litfa
 * @Date: 2022-04-13 17:23:18
 * @LastEditTime: 2022-04-13 20:18:55
 * @LastEditors: litfa
 * @Description: app
 * @FilePath: /service/src/app.ts
 * 
 */
import express from 'express'
import config from './config/config'
import { join } from 'path'
const app = express()

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