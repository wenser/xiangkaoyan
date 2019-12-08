import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane, AtAvatar, AtIcon, AtSearchBar } from 'taro-ui'
import { getArticles, getCategorys } from '../../api/bbs'
import get from 'lodash/get'

import { setCurrentArticleId, setArticleCategorys } from '../../actions/article'

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
  article
}

type PageDispatchProps = {
  setCurrentArticleId: (id: string) => void
  setArticleCategorys: (id: string) => void
}
type PageOwnProps = {}

type PageState = {
  current: number,
  articles: Array<any>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ article }) => ({
  article
}), (dispatch) => ({
  setCurrentArticleId (payload) {
    dispatch(setCurrentArticleId(payload))
  },
  setArticleCategorys (payload) {
    dispatch(setArticleCategorys(payload))
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
      articles: []
    }
  }
  componentDidMount () {
    this._fatchData()
  }
  componentDidShow() {
    let tabbar = this.$scope.getTabBar()
    tabbar.$component.setState({
      current: 0
    })
  }
  async _fatchData () {
    let categorys: any = await getCategorys()
    this.props.setArticleCategorys((get(categorys, 'data.types') || []).map(item => ({
      ...item,
      title: item.name
    })))
    let articles: any = await getArticles()
    this.setState({
      articles: get(articles, 'data.page.content') || []
    })
  }
  activeTab (i) {
    this.setState({
      current: i
    })
  }
  navToArticle (id) {
    this.props.setCurrentArticleId(id)
    Taro.navigateTo({
      url: '/pages/article/index'
    })
  }
  format (text: any) {
    const reg = /<[^<]*>/g
    text = (text as string).replace(reg, '').substring(0, 150)
    return text
  }
  toEditorPage () {
    Taro.navigateTo({
      url: '/pages/editor/index'
    })
  }
  toSearchPage () {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }
  render () {
    const articles = this.state.articles
    const tabList = this.props.article.articleCategorys
    return (
      <View className='index'>
        <View className='search'>
          <View onClick={this.toSearchPage}>
            <AtIcon value='search' size='24' color='#fff' />
          </View>
          <View onClick={this.toEditorPage}>
            <AtIcon value='add' size='24' color='#fff' />
          </View>
        </View>
        <AtTabs className='nav' scroll={true} current={this.state.current} tabList={tabList} onClick={this.activeTab.bind(this)}>
          {
            tabList.map((item, i) => {
              return <AtTabsPane current={this.state.current} key={item.id} index={i}>
                <View onClick={this.toSearchPage}>
                  <AtSearchBar
                    value=''
                    onChange={() => {}}
                    disabled={true}
                    placeholder={`大家都在搜[${'6旬老汉午夜寻欢'}]`}
                  />
                </View>
                <ScrollView scrollY={true} className='scroll-view'>
                  {
                    articles.map((article) => {
                      return (
                        <View key={article.id} className='card'>
                          {/* 主要信息 */}
                          <View className='simple-article' onClick={() => this.navToArticle(article.id)}>
                            <Text className='title'>{article.title}</Text>
                            {/* 作者 */}
                            <View className='author a-i-c small'>
                              <AtAvatar circle size='small' text='作者'/>
                              <View className='author-info'>
                                <Text>李靓仔</Text>
                              </View>
                              {/* <AtIcon value='menu' size='30' color='#9c9c9c' /> */}
                            </View>
                            {/* <Image mode='aspectFill' src={article.firstPicture} /> */}
                            <Text className='description'>{this.format(article.content)}</Text>
                          </View>
                          {/* 操作栏 */}
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
                              <AtIcon value='heart-2' size='30' color='#ffb591' />
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
