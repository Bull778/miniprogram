// component/ordertail/index.js
const app = getApp() // 引入app
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: {
      type: Object
    },
    status: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: app.globalData.imgUrl, //全局img路径
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
