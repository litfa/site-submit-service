/*
 * @Author: litfa
 * @Date: 2022-04-13 20:05:18
 * @LastEditTime: 2022-04-14 17:25:34
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

export default router