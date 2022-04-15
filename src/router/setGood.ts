/*
 * @Author: litfa
 * @Date: 2022-04-15 18:41:05
 * @LastEditTime: 2022-04-15 19:12:54
 * @LastEditors: litfa
 * @Description: 设为优秀
 * @FilePath: /service/src/router/setGood.ts
 * 
 */
import { Router } from 'express';
import config from './../config/config'
import query from './././../utils/query';
const router = Router()

// 仅权限大于10可调用
router.post('/', async (req, res) => {
  const { id } = req.body
  let err, results
  [err, results] = await query('SELECT * from `sites` WHERE ?', {
    id
  })
  if (err) return res.send({ status: 5 })
  if (results.length < 1) return res.send({ status: 5 })

  // 修改
  const [error, e] = await query('update `sites` set ? where ?', [
    {
      is_good: !results[0].is_good
    },
    {
      id
    }
  ])

  if (err) return res.send({ status: 5 })

  res.send({ status: 1 })
})

export default router