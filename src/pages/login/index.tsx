import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtToast } from 'taro-ui'
import { login } from '../../api/login'
import { setToken, setUserInfo } from '../../actions/login'
import './index.less'

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
  setToken: (token: string) => void
  setUserInfo: (payload: object) => void
}

type PageOwnProps = {}

type PageState = {
  loading: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(() => ({
}), (dispatch) => ({
  setToken (token) {
    dispatch(setToken(token))
  },
  setUserInfo (payload) {
    dispatch(setUserInfo(payload))
  }
}))
class Index extends Component<IProps, PageState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount () {
    this.login()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getUserInfo (payload) {
    if (payload.detail.userInfo) {
      this.login()
    }
  }
  login () {
    this.setState({
      loading: true
    })
    Taro.login({
      success: (loginRes) => {
        Taro.getUserInfo({
          success: async (infoRes) => {
            let res: any = await login({
              code: loginRes.code,
              iv: infoRes.iv,
              encryptedData: infoRes.encryptedData
            })
            this.setState({
              loading: false
            })
            this.props.setUserInfo(infoRes.userInfo)
            this.props.setToken(res.data.token)
            this.launch()
          },
          fail: err => {
            console.log(err)
          },
        })
      }
    })
  }
  launch () {
    Taro.switchTab({
      url: '/pages/bbs/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <Button
          className='getUserInfoBtn btn-block'
          hoverClass='btn-hover'
          openType='getUserInfo' onGetUserInfo={this.getUserInfo}
        >一键登录</Button>
        <AtToast isOpened={this.state.loading} duration={3000} status={'loading'} text='加载中' />
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
