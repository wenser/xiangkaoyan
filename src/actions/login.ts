import {
  SET_TOKEN,
  SET_USERINFO
} from '../constants/login'

export const setToken = (payload) => {
  return {
    type: SET_TOKEN,
    text: '设置token',
    payload
  }
}

export const setUserInfo = (payload) => {
  return {
    type: SET_USERINFO,
    text: '设置用户信息',
    payload
  }
}
