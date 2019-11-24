import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane, AtAvatar, AtIcon } from 'taro-ui'
import { getArticles, getCategorys } from '../../api/bbs'
import _ from 'lodash'

import { setCurrentArticleId } from '../../actions/article'

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
  counter: any,
  article: any
}

type PageDispatchProps = {
  setCurrentArticleId: (id: string) => void
}
type PageOwnProps = {}

type PageState = {
  current: number,
  tabList: Array<any>,
  articles: Array<any>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter, article }) => ({
  counter,
  article
}), (dispatch) => ({
  setCurrentArticleId (payload) {
    dispatch(setCurrentArticleId(payload))
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
      current: 0,
      tabList: [],
      articles: []
    }
  }
  componentDidMount () {
    console.log(this.props)
    this._fatchData()
  }
  async _fatchData () {
    let categorys: any = await getCategorys()
    this.setState({
      tabList: (_.get(categorys, 'data.types') || []).map(item => ({
        ...item,
        title: item.name
      }))
    })
    let articles: any = await getArticles()
    this.setState({
      articles: _.get(articles, 'data.page.content') || []
    })
  }
  to (id) {
    this.props.setCurrentArticleId(id)
    Taro.navigateTo({
      url: '/pages/store/index'
    })
  }
  activeTab (i) {
    this.setState({
      current: i
    })
  }
  componentDidShow() {
    let tabbar = this.$scope.getTabBar()
    tabbar.$component.setState({
      current: 0
    })
  }
  navToArticle () {
    Taro.navigateTo({
      url: '/pages/article/index'
    })
  }
  render () {
    const articles = this.state.articles
    return (
      <View className='index'>
        <AtTabs className='nav' scroll={true} current={this.state.current} tabList={this.state.tabList} onClick={this.activeTab.bind(this)}>
          {
            this.state.tabList.map((item, i) => {
              return <AtTabsPane current={this.state.current} key={item.id} index={i}>
                <ScrollView scrollY={true} className='scroll-view'>
                  {
                    articles.map((article) => {
                      return (
                        <View key={article.id} className='card'>
                          <View className='author a-i-c'>
                            <AtAvatar circle text='作者'/>
                            <View className='author-info'>
                              <Text>李靓仔</Text>
                            </View>
                            <AtIcon value='menu' size='30' color='#9c9c9c' />
                          </View>

                          <View className='simple-article' onClick={this.navToArticle}>
                            <Image mode='aspectFill' src={article.firstPicture} />
                            <Text className='title'>{article.title}</Text>
                            <Text className='description'>{article.description}</Text>
                          </View>

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
                              <Text className='text'>1201</Text>
                            </View>
                          </View>
                        </View>
                      )   
                    })
                  }
                </ScrollView>
              </AtTabsPane>
            })
          }
        </AtTabs>
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
