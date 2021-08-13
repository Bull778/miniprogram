// component/tabbar/index.js
 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIdx: {// 定义下标
      type: Number,
      value: 0
    },
    bool: { // 定义不允许点击
      type: Boolean,
      value: true
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    tabbarList: [
      {
        "pagePath": "firstpages/home/index",
        "text": "首页",
        "iconPath": "../../images/homeicon.png",
        "selectedIconPath": "../../images/homeicon1.png",
        "auth": 1
      },
      {
        "pagePath": "firstpages/discover/index",
        "text": "发现",
        "iconPath": "../../images/findicon.png",
        "selectedIconPath": "../../images/findicon1.png",
        "auth": 1
      },
      {
        "pagePath": "firstpages/shopping/index",
        "text": "商城",
        "iconPath": "../../images/shopping.png",
        "selectedIconPath": "../../images/shopping1.png",
        "auth": 1
      },
      {
        "pagePath": "firstpages/my/index",
        "text": "我的",
        "iconPath": "../../images/myicon.png",
        "selectedIconPath": "../../images/myicon1.png",
        "auth": 1
      },
    ],
    tabBarHeight: getApp().globalData.tabBarHeight,
    cartNum:false
  },
  lifetimes: {
    attached: function () {
      // getApp().getconfig(this);
    }
  },
  ready:function(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      const { idx,path } = e.currentTarget.dataset
      if (idx === this.data.activeIdx) return
      wx.switchTab({
        url: `/${path}`,
      })
    },
  },
  //显示购物袋中的showIcon
})