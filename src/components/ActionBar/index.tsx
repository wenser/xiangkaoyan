import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

type IProps = {
}
type PageState = {
}

export default class ActionBar extends Component<IProps, PageState> {
  constructor () {
    super()
    this.state = {

    }
  }
  render () {
    return (
      <View className='action-bar-container'>
      </View>
    )
  }
}
