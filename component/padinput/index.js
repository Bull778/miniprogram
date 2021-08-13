// component/padinput/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bool: { // 定义是否清空
      type: Boolean,
      value: false
    },
    Value:{ // 定义是否清空
      type: String,
      value: ''
    },
    isFocus:{
      type: Boolean,
      value: false, //聚焦
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    Length: 6, //输入框个数
    // Value: "", //输入的内容
    ispassword: true, //是否密文显示 true为密文， false为明文。
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Focus(e) {
      let that = this;
      let inputValue = {
        inputValue: e.detail.value
      };
      // 传递给父元素
      that.triggerEvent('infotan', inputValue)
      that.setData({
        Value: e.detail.value
      })
      if(e.detail.value.length == 6 && that.data.bool){
        setTimeout(() => {
          that.setData({
            Value: ''
          })
        }, 500);
      }
    },
    Tap() {
      let that = this;
      that.setData({
        isFocus: true,
      })
    },
  }
})