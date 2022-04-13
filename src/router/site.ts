/*
 * @Author: litfa
 * @Date: 2022-04-13 19:59:19
 * @LastEditTime: 2022-04-13 20:00:28
 * @LastEditors: litfa
 * @Description: 站点
 * @FilePath: /service/src/router/site.ts
 * 
 */

import { Router } from 'express'
import { join } from 'path'
const router = Router()

router.get('*', (req, res) => {
  let siteName = req.hostname.split('.')[0]
  let siteDir = join(__dirname, './site/', siteName)
  let path = req.path == '/' ? '/index.html' : req.path
  let file = join(siteDir, path)
  res.sendFile(file)
})

export default router