import { SET_CURRENT_ARTICLE_ID } from '../constants/article'

const INITIAL_STATE = {
  currentArticleId: null
}

export default function article (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_ARTICLE_ID:
      return {
        ...state,
        currentArticleId: action.payload
      }
    default:
      return state
  }
}
