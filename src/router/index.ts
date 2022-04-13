/*
 * @Author: litfa
 * @Date: 2022-04-13 20:05:18
 * @LastEditTime: 2022-04-13 20:18:34
 * @LastEditors: litfa
 * @Description: api路由
 * @FilePath: /service/src/router/index.ts
 * 
 */
import { Router } from 'express';
const router = Router()

import login from './login'
router.use('/login', login)

export default router