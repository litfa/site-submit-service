/*
 * @Author: litfa
 * @Date: 2022-04-15 15:52:21
 * @LastEditTime: 2022-04-15 16:32:10
 * @LastEditors: litfa
 * @Description: 获取文件管理的密钥
 * @FilePath: /service/src/router/getFsAuth.ts
 * 
 */
import { Router } from 'express';
import query from './././../utils/query';
import axios from 'axios';
import config from './../config/config'
const router = Router()

router.post('/', async (req, res) => {
  const user = req.user as any
  const { host } = req.body
  console.log(host, user);

  // 查询该用户是否拥有这个站点
  const [err, results] = await query('SELECT * FROM `sites` WHERE host=? and author=?', [
    host,
    user.id
  ])
  console.log(err, results);

  if (err) return res.send({ status: 5 })
  if (results.length < 1) return res.send({ status: 5 })
  const { data: key } = await axios({
    url: `${config.fsUrl}/get_auth`,
    method: 'POST',
    data: {
      host: results[0].host,
      authKey: config.fsAuthKey
    }
  })
  console.log(key);

  if (key.status != 1) return res.send({ status: 5 })
  res.send({ status: 1, key: key.key })
})

export default router
