import Taro from '@tarojs/taro'
import store from '../store'
const base = 'http://www.zhuimeng.group:8081/'

type option = {
  url: string,
  data?: object,
  method?: "OPTIONS" | "GET" | 'POST' | 'DELETE' | 'PUT'
}

export default function request (option: option): Promise<any> {
  const { login: { token } } = store.getState()
  const _token = token ? {
    token
  } : null
  return new Promise(async (resolve, reject) => {
    let res: any = await Taro.request({
      header: {
        'content-type': 'application/json; charset=utf-8',
        ..._token
      },
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
