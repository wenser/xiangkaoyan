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
        html={`
          <div>
            <h1>标题标题标题</h1>
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1354955884,3649724707&fm=26&gp=0.jpg" />
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2246258957,1508957268&fm=26&gp=0.jpg" />
          </div>
        `}
      ></ParserRichText>
    )
  }
}
