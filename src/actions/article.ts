import {
  SET_CURRENT_ARTICLE_ID
} from '../constants/article'

export const setCurrentArticleId = (payload) => {
  return {
    type: SET_CURRENT_ARTICLE_ID,
    text: '设置当前浏览文章的id',
    payload
  }
}
