/*
 * @Author: litfa
 * @Date: 2022-04-14 14:13:57
 * @LastEditTime: 2022-04-14 14:14:39
 * @LastEditors: litfa
 * @Description: query
 * @FilePath: /service/src/utils/query.ts
 * 
 */
import db from '../db/index'
export default (sql: string, values: any = '') => {
  return new Promise<any>((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      resolve([err, results])
    })
  })
}