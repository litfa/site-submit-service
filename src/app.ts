/*
 * @Author: litfa
 * @Date: 2022-04-13 17:23:18
 * @LastEditTime: 2022-04-13 20:01:14
 * @LastEditors: litfa
 * @Description: app
 * @FilePath: /service/src/app.ts
 * 
 */
import express from 'express'
import config from './config/config'
import { join } from 'path'
const app = express()

app.use('*', () => import('./router/site'))

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);

})