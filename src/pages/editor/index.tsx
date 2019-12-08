import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, CoverView, CoverImage } from '@tarojs/components'
import { AtToast, AtActionSheet } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { publishArticle as _publishArticle } from '../../api/bbs'

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
  articleCategorys
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  focusIdx: number | null
  title: string
  paragraphs: Array<any>
  loading: boolean
  categorySelector: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

const textType = {
  P: 'paragraph',
  IMG: 'image'
}

const id = {
  _value: 0,
  get v () {
    return this._value++
  }
}
@connect(({ article: { articleCategorys } }) => ({
  articleCategorys
}), () => ({
}))
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '发布文章',
    usingComponents: {
      'my-textarea': '../../components/my-textarea/my-textarea'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      title: '',
      focusIdx: null,
      loading: false,
      categorySelector: false,
      paragraphs: [
        {
          id: id.v,
          type: textType.P,
          value: '',
          focus: false
        }
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount () {
  }
  getCurRow () {
    if (this.state.focusIdx === null) {
      return null
    }
    return this.state.paragraphs[this.state.focusIdx]
  }
  tapContent () {
    let paragraphs = [...this.state.paragraphs]
    paragraphs.forEach((p, i) => {
      p.focus = false
    })
    this.setState({
      paragraphs
    }, () => {
      paragraphs[paragraphs.length - 1].focus = true
      this.setState({
        paragraphs
      })
    })
  }
  editTitle (e) {
    this.setState({
      title: e.detal.value
    })
  }
  editRow (e, i) {
    console.log('editRow')
    let paragraphs = [...this.state.paragraphs]
    // if (e.detail.keyCode === 8 && paragraphs[i].value === '') {
    //   this.deleteRow(i)
    //   return
    // }
    paragraphs[i].value = e.detail.value.replace(/[\r\n]/g, '')
    this.setState({
      paragraphs
    })
  }
  deleteRow (i) {
    console.log('deleteRow')
    if (this.state.paragraphs.length <= 1) return
    let paragraphs = [...this.state.paragraphs]
    paragraphs.splice(i, 1)
    this.setState({
      paragraphs: []
    }, () => {
      let curI = i - 1
      if (curI <= 0) curI = 0
      if (paragraphs[curI].type === textType.P) {
        paragraphs[curI].focus = true
      }
      this.setState({
        paragraphs
      })
    })
  }
  addRow (i) {
    console.log('addRow')
    if (i === null) {
      i = this.state.paragraphs.length - 1
    }
    let paragraphs = [...this.state.paragraphs]
    paragraphs.splice(i + 1, 0, {
      id: id.v,
      type: textType.P,
      value: '',
      focus: false
    })
    this.setState({
      paragraphs
    }, () => {
      setTimeout(() => {
        paragraphs.forEach(p => {
          p.focus = false
        })
        paragraphs[i + 1].focus = true
        this.setState({
          paragraphs
        })
      }, 0)
    })
  }
  addImage () {
    console.log('addImage')
    Taro.chooseImage({
      count: 1,
      success: res => {
        let image = res.tempFilePaths[0]
        let i = this.state.focusIdx
        if (i === null) {
          i = this.state.paragraphs.length - 1
        }
        let paragraphs = [...this.state.paragraphs]
        paragraphs.splice(i + 1, 0, {
          id: id.v,
          type: textType.IMG,
          value: image
        })
        paragraphs.splice(i + 2, 0, {
          id: id.v,
          type: textType.P,
          value: '',
          focus: false
        })
        this.setState({
          paragraphs
        }, () => {
          paragraphs.forEach(p => {
            p.focus = false
          })
          paragraphs[i + 2].focus = true
          this.setState({
            paragraphs
          })
        })
      }
    })
  }
  rowBlur (i) {
    console.log('rowBlur' + i)
    if (this.state.focusIdx === i) {
      this.setState({
        focusIdx: null
      })
    }
  }
  rowFocus (e, i) {
    console.log('rowFocus')
    if (i !== this.state.focusIdx) {
      this.setState({
        focusIdx: i
      })
    }
  }
  focusRow (i) {
    console.log('focusRow')
    let paragraphs = this.state.paragraphs
    paragraphs.forEach(p => {
      if (p.focus) {
        p.focus = false
      }
    })
    this.setState({
      paragraphs
    }, () => {
      if (paragraphs[i].type === textType.P) {
        paragraphs[i].focus = true
      }
      this.setState({
        focusIdx: i,
        paragraphs
      })
    })
  }
  // 延迟事件的触发，避免点击事件在失去焦点前触发
  delayEvent (callback) {
    return () => {
      setTimeout(() => {
        callback()
      }, 100)
    }
  }
  openCategorySelector () {
    this.setState({
      categorySelector: true
    })
  }
  async publishArticle (id) {
    let article = {
      title: this.state.title,
      content: this.state.paragraphs.map(p => {
        if (p.type === textType.P) {
          return `<p>${p.html}</p>`
        } else {
          return ''
        }
      }).join(''),
      typeId: id
    }
    console.log(article)
    this.setState({
      loading: true
    })
    await _publishArticle(article)
    this.setState({
      loading: false
    })
  }
  render () {
    return (
      <View className='container'>
        {/* 内容 */}
        <View className='content'>
          {/* 标题 */}
          <View className='title'>
            <my-textarea
              custom='title-ipt'
              value={this.state.title}
              focus={true}
              maxlength={20}
              placeholder='输入文章标题'
              onInput={e => this.editTitle(e)}
            ></my-textarea>
          </View>
          {
            this.state.paragraphs.map((p, i)=> {
              return (
                <View className='row' key={p.id}>
                  <View className='row-wrap' onClick={() => this.focusRow(i)}>
                    {
                      p.type === textType.P ? (
                        // 段落
                        <my-textarea
                          custom='row-ipt'
                          value={p.value}
                          maxlength={200}
                          onFocus={e => this.rowFocus(e, i)}
                          onBlur={e => this.rowBlur(i)}
                          onInput={(e) => this.editRow(e, i)}
                          focus={p.focus}
                          placeholder={i === 0? '写文章...' : ''}
                        ></my-textarea>
                      ) : (
                        // 图片类型
                        <View className={`image ${this.state.focusIdx === i ? 'active' : ''}`}>
                          <Image src={p.value} />
                        </View>
                      )
                    }
                  </View>
                  {/* 文本操作栏 */}
                  {
                    this.state.focusIdx === i ?
                    <View className='handle-bar'>
                      <CoverView className='handle-wrap'>
                        <CoverView
                          onClick={this.delayEvent(() => this.deleteRow(i))}
                          style={{display: this.state.focusIdx > 0 ? 'flex' : 'none'}}
                          className='handle-row'>
                          <CoverImage style={{width: '25px', height: '25px'}} className='handlebar-icon' src={require('../../assets/delete.png')} />
                        </CoverView>
                        <CoverView className='handle-row' onClick={this.delayEvent(() => this.addRow(i))}>
                          <CoverImage style={{width: '25px', height: '25px'}} className='handlebar-icon' src={require('../../assets/duanluo.png')} />
                        </CoverView>
                        <CoverView className='handle-row' onClick={this.delayEvent(() => this.addImage())}>
                          <CoverImage style={{width: '25px', height: '22px'}} className='handlebar-icon' src={require('../../assets/tupian.png')} />
                        </CoverView>
                      </CoverView>
                    </View>
                    : ''
                  }
                </View>
              )
            })
          }
          <View className='content-bg'></View>
        </View>
        <View className='commit'>
          <Button onClick={this.openCategorySelector}>发表文章</Button>
        </View>
        <AtToast isOpened={this.state.loading} duration={0} status={'loading'} text='加载中' />
        <AtActionSheet isOpened={this.state.categorySelector}>
          {
            this.props.articleCategorys.map(category => {
              return (
                <View key={category.id} onClick={() => this.publishArticle(category.id)}>
                  <Text>{category.name}</Text>
                </View>
              )
            })
          }
        </AtActionSheet>
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
