import Taro from '@tarojs/taro'

const base = 'http://www.zhuimeng.group:8081/'

type option = {
  url: string,
  data?: object,
  method?: "OPTIONS" | "GET" | 'POST' | 'DELETE' | 'PUT'
}

export default function request (option: option) {
  return new Promise(async (resolve, reject) => {
    let res = await Taro.request({
      header: 'application/json; charset=utf-8',
      ...option,
      url: base + option.url
    })
    if (res.statusCode === 200) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}
