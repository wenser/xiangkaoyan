import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'

const tabList = {
  0: '/pages/bbs/index',
  1: '/pages/user/index'
  // 1: '/pages/store/index',
  // 2: '/pages/tools/index',
}
type IProps = {
}
type pageState = {
  current: number,
}
class Index extends Component<IProps, pageState> {
  constructor () {
    super()
    this.state = {
      current: 0,
    }
  }
  switchTab = (index) => {
    Taro.switchTab({
      url: tabList[index]
    })
  }
  render () {
    return (
      <AtTabBar
        className='main-nav'
        fixed
        selectedColor='#b0deff'
        tabList={[
          { title: '社区', iconType: 'bullet-list' },
          { title: '我', iconType: 'user' }
          // { title: '商店', iconType: 'shopping-cart' },
          // { title: '工具', iconType: 'folder' },
        ]}
        onClick={this.switchTab}
        current={this.state.current}
      />
    )
  }
}

export default Index
