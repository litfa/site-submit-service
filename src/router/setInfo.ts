/*
 * @Author: litfa
 * @Date: 2022-04-14 14:58:45
 * @LastEditTime: 2022-04-14 17:12:58
 * @LastEditors: litfa
 * @Description: 设置个人信息
 * @FilePath: /service/src/router/setInfo.ts
 * 
 */
import { Router } from 'express';
import query from './././../utils/query';

const router = Router()

router.post('/', async (req, res) => {
  const { username } = req.body
  const user = req.user as any
  let err, results
  [err, results] = await query('SELECT * FROM users WHERE id=?', user.id)
  // console.log(results)
  if (results.length != 1) {
    return res.send({ status: 5 })
  }
  [err, results] = await query('UPDATE `users` SET ? WHERE id=?', [{ username }, user.id])
  if (err) return res.send({ staus: 5 })
  res.send({ status: 1 })
})

export default router