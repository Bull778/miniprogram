// component/showtime/index.js
import { getSevenDay } from '../../utils/util.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    weekTime: getSevenDay(),
    indexs: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      const {
        item,
        indexs
      } = e.currentTarget.dataset
      this.setData({
        indexs
      })
      // 传递给父元素
      this.triggerEvent('gettime', item)
    }
  }
})