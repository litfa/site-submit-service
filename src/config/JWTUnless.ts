/*
 * @Author: litfa
 * @Date: 2022-04-13 20:26:21
 * @LastEditTime: 2022-04-14 14:05:03
 * @LastEditors: litfa
 * @Description: JWTUnless
 * @FilePath: /service/src/config/JWTUnless.ts
 * 
 */

import config from './config'
export default [
  new RegExp(`^${config.apiBaseUrl}/login`),
  new RegExp(`^(?!${config.apiBaseUrl}/)`),
]