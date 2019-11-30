import { SET_TOKEN, SET_USERINFO } from '../constants/login'

const INITIAL_STATE = {
  token: null,
  userInfo: {}
}

export default function login (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case SET_USERINFO:
      return {
        ...state,
        userInfo: action.payload
      }
    default:
      return state
  }
}
