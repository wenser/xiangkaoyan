import {
  SET_CURRENT_ARTICLE_ID,
  SET_ARTICLE_CATEGORYs
} from '../constants/article'

export const setCurrentArticleId = (payload) => {
  return {
    type: SET_CURRENT_ARTICLE_ID,
    text: '设置当前浏览文章的id',
    payload
  }
}

export const setArticleCategorys = (payload) => {
  return {
    type: SET_ARTICLE_CATEGORYs,
    text: '设置文章类目列表',
    payload
  }
}
