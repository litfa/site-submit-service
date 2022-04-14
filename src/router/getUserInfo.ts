/*
 * @Author: litfa
 * @Date: 2022-04-14 15:50:46
 * @LastEditTime: 2022-04-14 16:36:56
 * @LastEditors: litfa
 * @Description: 获取用户信息
 * @FilePath: /service/src/router/getUserInfo.ts
 * 
 */
import { Router } from 'express';
const router = Router()

router.post('/', (req, res) => {
  let user = req.user as any
  console.log(user);

  const phone = user.phone.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  user = { ...user, phone }
  res.send({ status: 1, data: user })
})

export default router
