/*
 * @Author: litfa
 * @Date: 2022-04-15 16:59:17
 * @LastEditTime: 2022-04-15 17:03:16
 * @LastEditors: litfa
 * @Description: 获取某人的网站
 * @FilePath: /service/src/router/getUserSite.ts
 * 
 */
import { Router } from 'express';
import query from '../utils/query';
const router = Router()

router.post('/', async (req, res) => {
  const { author = 0 } = req.body
  let [err, results] = await query('SELECT * FROM `sites` WHERE ?', {
    author
  })
  if (err) return res.send({ status: 5 })
  res.send({ status: 1, data: results })
})

export default router
