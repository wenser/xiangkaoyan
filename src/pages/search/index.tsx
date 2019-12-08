import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'

import './index.scss'
import { AtAvatar } from 'taro-ui'

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
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  keyword: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}
@connect(() => ({
}), () => ({
}))
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '搜索内容',
    usingComponents: {
      'rich-text': '../../components/rich-text/rich-text'
    }
  }
  constructor () {
    super()
    this.state = {
      keyword: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow() {
  }

  componentDidHide () { }

  changeKeyword () {
  }

  render () {
    return (
      <View className='search'>
        <AtSearchBar focus={true} placeholder={`大家都在搜【六旬老汉寻死腻活】`} value={this.state.keyword} onChange={this.changeKeyword} />
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

export default Index as ComponentClass<PageOwnProps, PageState>
