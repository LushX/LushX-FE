import axios from 'axios'

axios.defaults.timeout = 1000000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json' //通信格式
axios.defaults.baseURL = 'https://easy-mock.com/mock/5a0103fca6bee23c9c2a4a7b/api/v1/' //配置接口地址
// axios.defaults.baseURL = '' //配置接口地址

export default {
  // POST请求
  post(obj) {
    return new Promise((resolve,reject) => {
      axios.post(obj.url, obj.data).then((data) => {
        if(data.status === 0) {
          resolve(data.data)
        } else {
          resolve(data.data)
        }
      }).catch((data) => {
        reject(data)
      })
    })
  },

  // GET请求
  get(obj) {
    return new Promise((resolve,reject) => {
      axios.get(obj.url, obj.data).then((data) => {
        if(data.status === 0) {
          resolve(data.data.data)
        } else {
          resolve(data.data.data)
        }
      }).catch((data) => {
        reject(data)
      })
    })
  }
}
