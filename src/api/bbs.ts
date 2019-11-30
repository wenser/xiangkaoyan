import requeset from '../utils/request'

export function getArticles (data?: object) {
  return requeset({
    url: 'cms/wechat/',
    method: 'GET',
    data
  })
}

export function getArticle (id) {
  return requeset({
    url: 'cms/wechat/blog/detail',
    method: 'GET',
    data: {
      blogId: id
    }
  })
}

export function getCategorys (data?: object) {
  return requeset({
    url: 'cms/wechat/types',
    method: 'GET',
    data
  })
}
