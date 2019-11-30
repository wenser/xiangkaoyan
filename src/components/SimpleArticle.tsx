import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'
import ParserRichText from './ParserRichText/parserRichText'

type IProps = {
  html: string
}
type PageState = {
  tagStyle: object
}

export default class SimpleArticle extends Component<IProps, PageState> {
  constructor (props) {
    super(props)
    this.state = {
      tagStyle: {
        img: 'border-radius: 10px'
      }
    }
  }
  render () {
    return (
      <ParserRichText 
        showWithAnimation={true}
        animationDuration={1000}
        tagStyle={this.state.tagStyle}
        // html={this.props.html}
        html={this.props.html}
      ></ParserRichText>
    )
  }
}
