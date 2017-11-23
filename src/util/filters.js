/**
 * 转化时间格式
 * @param {String} time
 */
export function timeLabel (time) {
  return time.slice(0, 10).split('.').join('-')
}
