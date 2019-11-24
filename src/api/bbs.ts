import requeset from '../utils/request'

export function getArticles (data?: object) {
  return requeset({
    url: 'cms/wechat/',
    method: 'GET',
    data
  })
}

export function getCategorys (data?: object) {
  return requeset({
    url: 'cms/wechat/types',
    method: 'GET',
    data
  })
}
