/*
 * @Author: litfa
 * @Date: 2022-04-13 20:06:24
 * @LastEditTime: 2022-04-14 15:34:19
 * @LastEditors: litfa
 * @Description: 登录
 * @FilePath: /service/src/router/login.ts
 * 
 */
import { Router } from 'express';
import axios from 'axios'
import config from './../config/config'
import md5 from 'md5'
import query from './././../utils/query';
import jwt from './../utils/token'
const router = Router()

const createSign = (data: any, token: string): string => {
  // 1. 将所有参数的key按照字符串进行排序
  let key = ''
  for (let i in data) {
    // 2. 如果参数的value不为空，则将key和value以=号链接，且在后面增加&，例如参数r 为 1Nm882l7， 则拼接为r=1Nm882l7&
    if (data[i]) {
      // 3. 按照排序的顺序拼接所有的参数
      key += `${i}=${data[i]}&`
    }
  }
  // 4. 拼接完成后，在末尾拼接 token=密钥Token， 其中密钥Token可在用户中心查看，请注意密钥Token不要泄露。
  key += `token=${config.token}`

  // 5. 对拼接后的字符串进行 md5 加密，然后全部转为小写
  return md5(key).toLowerCase()
}

router.post('/', async (req, res) => {
  const { mobile, token } = req.body
  const data = {
    app_id: config.app_id,
    id: token,
    mobile,
    r: Math.random().toString()
  }
  const key = createSign(data, config.token)
  console.log({
    ...data,
    key
  });

  const { data: results } = await axios({
    url: 'https://api.jijiancode.com/api/s/third/verify_id',
    method: 'POST',
    data: {
      ...data,
      key
    }
  })
  if (results.code != 200) return res.send({ status: 5 })
  // 验证成功
  if (results.data.status == 1) {
    let err, results
    // 查询是否注册过
    [err, results] = await query('select * from users where phone=?', mobile)
    // 找到该用户
    if (results?.length == 1) {
      const token = jwt({ ...results[0] })
      return res.send({ status: 1, type: 'login', token })
    }
    // 若首次登录 自动注册
    [err, results] = await query('insert into users set ?', {
      username: `用户 ${mobile}`,
      phone: mobile,
      status: 1,
      permissions: 1,
      date: Date.now()
    })
    // SQL 语句执行成功，但影响行数不为 1
    if (err || results?.affectedRows !== 1) {
      return res.send({ status: 5, message: '登录失败，请稍后再试！' })
    }
    const token = jwt({
      id: results.insertId,
      username: `用户 ${mobile}`,
      phone: mobile,
      status: 1,
      permissions: 1,
      date: Date.now()
    })
    res.send({ status: 1, type: 'register', token })
  }
})

export default router