Component({

  behaviors: [],

  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function(newVal, oldVal, changedPath) {
         // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
         // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    maxlength: { // 属性名
      type: Number,
      value: '400'
    },
    placeholder: String,
    value: String,
    focus: Boolean,
    custom: String // 简化的定义方式
  },
  data: {}, // 私有数据，可用于模版渲染

  lifetimes: {
    ready: function () {
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  methods: {
    onMyButtonTap: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function(){
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function(newVal, oldVal) {

    },
    bindinput (e) {
      this.triggerEvent('input', e.detail)
    },
    bindblur (e) {
      this.triggerEvent('blur', e)
    },
    bindfocus (e) {
      this.triggerEvent('focus', e)
    }
  }

})
