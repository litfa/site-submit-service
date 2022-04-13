/*
 * @Author: litfa
 * @Date: 2022-04-13 20:06:24
 * @LastEditTime: 2022-04-13 20:19:15
 * @LastEditors: litfa
 * @Description: 登录
 * @FilePath: /service/src/router/login.ts
 * 
 */
import { Router } from 'express';
const router = Router()

router.get('/', (req, res) => {
  res.send('111')
})

export default router