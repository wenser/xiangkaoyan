import requeset from '../utils/request'

export function login (data: object): Promise<any> {
  return requeset({
    url: 'cms/wechat/login',
    method: 'POST',
    data
  })
}
