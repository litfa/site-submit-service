/*
 * @Author: litfa
 * @Date: 2022-04-14 17:12:21
 * @LastEditTime: 2022-04-14 19:01:46
 * @LastEditors: litfa
 * @Description: 新增网站
 * @FilePath: /service/src/router/newSite.ts
 * 
 */
import { Router } from 'express';
import config from './../config/config'
import query from './././../utils/query';
const router = Router()

const check = (host: string) => {
  // 正则验证
  if (!/^[a-z-]{1,20}$/.test(host)) {
    return false
  }
  // 黑白名单
  let blackList = config.hostBlackList
  // 在黑名单
  if (blackList.indexOf(host) != -1) {
    return false
  }
  let whiteList: string[]
  if (config.hostWhiteList) {
    whiteList = config.hostWhiteList
    // 不在白名单
    if (whiteList.indexOf(host) != -1) {
      return false
    }
  }
  // 数据库查询
  return true
}

router.all('/check', (req, res) => {
  const host = req.body.host || req.query.host
  if (!host) {
    return res.send({ status: 1, allow: false })
  }
  res.send({ status: 1, allow: check(host) })
})

router.post('/', (req, res) => {
  const { host, name, desc } = req.body
  if (!check(host)) {
    return res.send({ status: 4 })
  }
})

export default router
