import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ParserRichText from './ParserRichText/parserRichText'

type IProps = {
}
type PageState = {
}

export default class UserHandleBar extends Component<IProps, PageState> {
  constructor () {
    super()
    this.state = {

    }
  }
  render () {
    return (
      <View>
        <ParserRichText html={
          `<div style="background:red">afadsf</div>`
        }></ParserRichText>
      </View>
    )
  }
}
