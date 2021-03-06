import { SET_CURRENT_ARTICLE_ID, SET_ARTICLE_CATEGORYs } from '../constants/article'

const INITIAL_STATE = {
  currentArticleId: null,
  articleCategorys: []
}

export default function article (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_ARTICLE_ID:
      return {
        ...state,
        currentArticleId: action.payload
      }
    case SET_ARTICLE_CATEGORYs:
      return {
        ...state,
        articleCategorys: action.payload
      }
    default:
      return state
  }
}
