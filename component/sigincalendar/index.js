// component/sigincalendar/index.js
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
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
  },

  lifetimes: {
    attached() {
      this.onLoad()
    }, //在组件实例进入页面节点树时执行
    detached() {}, //在组件实例被从页面节点树移除时执行
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      this.dateInit();
      this.setData({
        year: year,
        month: month,
        isToday: '' + year + month + now.getDate()
      })
    },
    dateInit(setYear, setMonth) {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let dateArr = []; //需要遍历的日历数组数据
      let arrLen = 0; //dateArr的数组长度
      let now = setYear ? new Date(setYear, setMonth) : new Date();
      let year = setYear || now.getFullYear();
      let nextYear = 0;
      let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
      let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
      let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
      let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
      let obj = {};
      let num = 0;
      if (month + 1 > 11) {
        nextYear = year + 1;
        dayNums = new Date(nextYear, nextMonth, 0).getDate(); 
        console.log(nextYear,dayNums);
      }

      // 加上这个月的第一天之前的会有是多少天
      arrLen = startWeek + dayNums;
      for (let i = 0; i < arrLen; i++) {
        if (i >= startWeek) {
          num = i - startWeek + 1;
          obj = {
            isToday: '' + year + (month + 1) + num,
            dateNum: num,
            weight: ''
          }
        } else {
          obj = {};
        }
        dateArr[i] = obj;
      }
      this.setData({
        dateArr: dateArr
      })
      console.log(this.data,'ss');
    },

    // 上个月
    lastMonth() {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
      let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.dateInit(year, month);
    },

    // 下个月
    nextMonth() {
      //全部时间的月份都是按0~11基准，显示月份才+1
      let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
      let month = this.data.month > 11 ? 0 : this.data.month;
      this.setData({
        year: year,
        month: (month + 1)
      })
      this.dateInit(year, month);
    }
  }
})