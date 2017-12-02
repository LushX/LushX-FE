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

/**
 * 拼接图片 url
 * @param {String} url
 */
export function imgUrl (url) {
  if (url.split('//')[1].split('..').length > 1) {
    return `http://${ url.split('//')[1].split('..').join('.') }`
  } else {
    return `http://${ url.split('//')[1] }`
  }
}

/**
 * Lodash slice 函数
 * @param {Array} array
 * @param {Number} start
 * @param {Number} end
 */
export function slice (array, start, end) {
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

/**
 * Lodash chunk 函数
 * @param {Array} array
 * @param {Number} size
 */
export function chunk (array, size) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}
