/*
 * @Author: litfa
 * @Date: 2022-04-13 20:26:21
 * @LastEditTime: 2022-04-15 20:16:29
 * @LastEditors: litfa
 * @Description: JWTUnless
 * @FilePath: /service/src/config/JWTUnless.ts
 * 
 */

import config from './config'
export default [
  new RegExp(`^${config.apiBaseUrl}/login`),
  new RegExp(`^${config.apiBaseUrl}/getAllSite`),
  new RegExp(`^(?!${config.apiBaseUrl}/)`),
]