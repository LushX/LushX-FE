import axios from 'axios'

axios.defaults.timeout = 1000000 // 响应时间
axios.defaults.headers['Content-Type'] = 'application/json' // 通信格式
axios.defaults.baseURL = 'http://139.224.135.245:8080/lushx' // 开发环境接口地址
// axios.defaults.baseURL = '' // 生产环境接口地址

const setAuthorization = (token) => {
  axios.defaults.headers['Authorization'] = token
}

// POST请求
export const post = obj => {
  return new Promise((resolve,reject) => {
    axios.post(obj.url, obj.data).then(data => {
      resolve(data.data)
    }).catch(data => {
      reject(data.data)
    })
  })
}

// GET请求
export const get = obj => {
  if(obj.authorization) {
    setAuthorization(obj.authorization)
  }

  return new Promise((resolve,reject) => {
    axios.get(obj.url, { params: obj.data }).then(data => {
      resolve(data.data)
    }).catch(data => {
      reject(data.data)
    })
  })
}

// PUT请求
export const put = obj => {
  if(obj.authorization) {
    setAuthorization(obj.authorization)
  }

  return new Promise((resolve,reject) => {
    axios.put(obj.url, obj.data).then(data => {
      resolve(data.data)
    }).catch(data => {
      reject(data.data)
    })
  })
}
