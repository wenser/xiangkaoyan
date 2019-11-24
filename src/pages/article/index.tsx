import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, MovableArea, MovableView, Textarea } from '@tarojs/components'
import { AtAvatar, AtIcon, AtFab, AtTextarea, AtFloatLayout, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import SimpleArticle from '../../components/SimpleArticle'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  article: any
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  writing: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ article, counter }) => ({
  article,
}), () => ({
}))
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '文章详情'
  }
  constructor () {
    super()
    this.state ={
      writing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount () {
    console.log(this.props, this.state)
  }

  componentDidShow () { }

  componentDidHide () { }
  openWriting () {
    this.setState({
      writing: true
    })
  }
  render () {
    return (
      <View className='container'>
        {/* 文章区 */}
        <View className='card'>
          <View className='author a-i-c'>
            <AtAvatar circle text='作者'/>
            <View className='author-info'>
              <Text>李靓仔</Text>
            </View>
            <AtIcon value='menu' size='30' color='#9c9c9c' />
          </View>

          <SimpleArticle html={'article.content'} />
          
          <View className='action-bar-container'>
            <View className='action-bar'>
              <AtIcon value='message' size='30' color='#9c9c9c' />
              <Text className='text'>7</Text>
            </View>
            <View className='action-bar'>
              <AtIcon value='heart' size='30' color='#9c9c9c' />
              <Text className='text'>7</Text>
            </View>
            <View className='action-bar'>
              <AtIcon value='heart-2' size='30' color='#ffc5a1' />
              <Text className='text'>7</Text>
            </View>
          </View>
        </View>
        {/* 评论区 */}
        <View className='comment'>
          <View className='comment-bar'>
            <Text>评论区{2}</Text>
            <View className='comment-bar-handle'>
              <Text>最新</Text>
              <AtIcon value='arrow-up' size='30' color='rgb(21, 126, 255)' />
            </View>
          </View>
          <View className='comment-list'>
            <View className='leave-word'>
              <View className='leave-word-bar'>
                <AtAvatar circle text='' image={'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3010694652,2275025630&fm=26&gp=0.jpg'} />
                <View className='leave-word-user'>
                  <Text>曾阿牛</Text>
                  <Text className='time'>三天前</Text>
                </View>  
              </View>
              <Text>哇塞你写的好棒我肥肠的崇拜的哦，你含棒棒哦！！！</Text>
            </View>
          </View>
        </View>
        {/* 浮动按钮 */}
        <MovableArea className='float'>
          <MovableView direction='all' className='mover' onClick={this.openWriting}>
            <AtFab>
              <Text>评论</Text>
            </AtFab>
          </MovableView>
        </MovableArea>
        {/* 输入评论区 */}
        <AtFloatLayout
          isOpened={this.state.writing}
        >
          <View className='writing'>
            <Textarea value='' showConfirmBar={true} maxlength={200} placeholder='请输入评论内容...' autoHeight={true}></Textarea>
            <View className='writing-bar'>
              <AtButton type='primary'>发送</AtButton>
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass
