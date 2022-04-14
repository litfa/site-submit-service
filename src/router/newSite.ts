/*
 * @Author: litfa
 * @Date: 2022-04-14 17:12:21
 * @LastEditTime: 2022-04-14 20:05:22
 * @LastEditors: litfa
 * @Description: 新增网站
 * @FilePath: /service/src/router/newSite.ts
 * 
 */
import { Router } from 'express';
import config from './../config/config'
import query from './././../utils/query';
import fs from 'fs'
const router = Router()

const check = (host: string) => {
  if (!host) {
    return false
  }
  // 正则验证
  if (!/^[a-z0-9-]{1,20}$/.test(host)) {
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

router.all('/check', async (req, res) => {
  const host = req.body.host || req.query.host
  if (!host) {
    return res.send({ status: 1, allow: false })
  }
  res.send({ status: 1, allow: check(host) })
})

router.post('/', async (req, res) => {
  let { host, name, desc } = req.body
  const user = req.user as any

  if (!name) name = user.username

  if (!check(host)) {
    return res.send({ status: 4 })
  }
  try {
    fs.mkdirSync(`./src/site/${host}`)
    fs.copyFileSync('./src/site/default/index.html', `./src/site/${host}/index.html`)
  } catch (e) {
    console.log(e);
    return res.send({ status: 5 })
  }
  let [err, results] = await query('INSERT INTO `sites` SET ?', {
    author: user.id,
    host,
    date: Date.now(),
    is_good: false,
    name,
    desc
  })
  if (err) return res.send({ status: 5 })

  return res.send({ status: 1, id: results.insertId })
})

export default router
