import { combineReducers } from 'redux'
import counter from './counter'
import article from './article'
import login from './login'

export default combineReducers({
  counter,
  article,
  login
})
