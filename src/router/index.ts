/*
 * @Author: litfa
 * @Date: 2022-04-13 20:05:18
 * @LastEditTime: 2022-04-15 19:00:11
 * @LastEditors: litfa
 * @Description: api路由
 * @FilePath: /service/src/router/index.ts
 * 
 */
import { Router } from 'express';
const router = Router()

import login from './login'
router.use('/login', login)
import setInfo from './setInfo'
router.use('/setInfo', setInfo)
import getUserInfo from './getUserInfo'
router.use('/getUserInfo', getUserInfo)
import newSite from './newSite'
router.use('/newSite', newSite)
import getSite from './getSite'
router.use('/getSite', getSite)
import getFsAuth from './getFsAuth'
router.use('/getFsAuth', getFsAuth)
import getUserSite from './getUserSite'
router.use('/getUserSite', getUserSite)
import getAllSite from './getAllSite'
router.use('/getAllSite', getAllSite)

import setGood from './setGood'
router.use('/setGood', (req, res, next) => {
  const user = req.user as any
  if (user.permissions >= 15) {
    next()
    return
  }
  res.send({ status: 4 })
})
router.use('/setGood', setGood)

export default router