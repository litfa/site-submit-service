/*
 * @Author: litfa
 * @Date: 2022-04-15 17:27:53
 * @LastEditTime: 2022-04-15 17:41:00
 * @LastEditors: litfa
 * @Description: 获取所有站点
 * @FilePath: /service/src/router/getAllSite.ts
 * 
 */
import { Router } from 'express';
import query from './././../utils/query';
const router = Router()

const sql = `
SELECT 
  sites.*,
  users.\`username\`
 FROM 
 \`sites\` AS sites
 LEFT JOIN users users ON users.id=sites.\`author\`
`
router.post('/', async (req, res) => {
  const [err, results] = await query(sql)
  if (err) return res.send({ status: 5 })
  res.send({ status: 1, data: results })
})

export default router
