import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
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
  login: {
    userInfo: any
  }
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}
@connect(({ login }) => ({
  login
}), () => ({
}))
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '我的',
    usingComponents: {
      'rich-text': '../../components/rich-text/rich-text'
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow() {
    let tabbar = this.$scope.getTabBar()
    tabbar.$component.setState({
      current: 1
    })
  }

  componentDidHide () { }

  login () {
    if (!this.props.login.userInfo.nickName) {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
  }

  render () {
    const userInfo = this.props.login.userInfo
    return (
      <View className='user'>
        {/* 个人信息 */}
        <View className='me'>
          <View className='avatar' onClick={this.login}>
            <AtAvatar circle text={userInfo.nickName || '用户'} image={userInfo.avatarUrl} />
            <Text className='name'>{userInfo.nickName || '未登录'}</Text>
            <Text>ID: 98798afdafs987</Text>
          </View>
        </View>
        {/* 交互统计 */}
        <View className='statistics'>
          <View>
            <Text className='count'>0</Text>
            <Text className='des'>获赞</Text>
          </View>
          <View>
            <Text className='count'>0</Text>
            <Text className='des'>点赞</Text>
          </View>
          <View>
            <Text className='count'>0</Text>
            <Text className='des'>关注</Text>
          </View>
          <View>
            <Text className='count'>0</Text>
            <Text className='des'>获赞</Text>
          </View>
          <View>
            <Text className='count'>0</Text>
            <Text className='des'>访客</Text>
          </View>
        </View>
        {/* 功能 */}
        <View className='function'>
          <Text className='function-title'>
            考研小工具
          </Text>
          <View className='function-card'>
            
          </View>
        </View>
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
