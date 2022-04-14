/*
 * @Author: litfa
 * @Date: 2022-04-14 14:24:17
 * @LastEditTime: 2022-04-14 14:31:00
 * @LastEditors: litfa
 * @Description: token
 * @FilePath: /service/src/utils/token.ts
 * 
 */
import jwt from 'jsonwebtoken'
import config from './../config/config'
export default (data: object) => {
  // 不 在服务器端直接拼接上 Bearer 的前缀
  return jwt.sign(data, config.jwtSecretKey, {
    // expiresIn: '10h' // token 有效期为 10 个小时
    expiresIn: 1000 * 60 * 60 * 10 // token 有效期为 10 个小时
  })
}