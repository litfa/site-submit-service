/*
 * @Author: litfa
 * @Date: 2022-04-13 20:06:24
 * @LastEditTime: 2022-04-14 14:11:31
 * @LastEditors: litfa
 * @Description: 登录
 * @FilePath: /service/src/router/login.ts
 * 
 */
import { Router } from 'express';
import axios from 'axios'
import config from './../config/config'
import md5 from 'md5'
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
  console.log(results)
  if (results != 200) return res.send({ status: 5 })
  res.send(results.data)
})

export default router