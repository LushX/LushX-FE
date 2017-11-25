/**
 * 截取演员信息
 * @param {String} str
 */
export function actorLabel (str) {
  return str && str.split(' ').slice(0, 4).join(' ')
}

/**
 * 消除空格
 * @param {String} text
 */
export function cancelSpace (text) {
  return text && text.trim()
}
