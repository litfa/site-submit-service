/*
 * @Author: litfa
 * @Date: 2022-04-14 20:48:47
 * @LastEditTime: 2022-04-14 20:51:02
 * @LastEditors: litfa
 * @Description: 获取站点信息
 * @FilePath: /service/src/router/getSite.ts
 * 
 */
import { Router } from 'express';
import query from './././../utils/query';
const router = Router()

router.post('/', async (req, res) => {
  const { id } = req.body
  let [err, results] = await query('SELECT * FROM `sites` WHERE ?', { id })
  if (err) return res.send({ status: 5 })
  res.send({ status: 1, data: results })
})

export default router