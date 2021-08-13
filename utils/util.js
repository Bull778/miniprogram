const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const renderTime = (date) => {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

const timeFormat = function (timedata, e) {
  const that = this
  const date = new Date(timedata.substr(0, 19));
  const Year = date.getFullYear();
  const Month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const newMonth = date.getMonth() + 1
  const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const newd = date.getDate();
  const Hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const Minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const Seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const over_time = Year + "/" + Month + "/" + d + " " + Hours + ":" + Minutes + ":" + Seconds
  //***至此以上是将时间2021-07-18T01:57:23.000+0000转为正常时间格式，以下为将时间进行增加8小时解决时区差异的操作***
  const time = new Date(Date.parse(over_time));
  time.setTime(time.setHours(time.getHours() + 8));
  const Y = time.getFullYear();
  const M = formatNumber(time.getMonth() + 1);
  const D = formatNumber(time.getDate());
  const h = formatNumber(time.getHours()) + ':';
  const m = formatNumber(time.getMinutes()) + ':';
  const s = formatNumber(time.getSeconds());
  if (e == 1) {
    return (Y + '-' + M + '-' + D);
  } else if (e == 2) {
    return (Y + '年' + M + '月' + D + '日');
  } else if (e == 3) {
    return newd
  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 电话格式
const regMobile = (mobile) => {
  let new_mobile
  if (mobile.length > 7) {
    new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
  }
  return new_mobile
}

// 判断是否为对象
const isObj = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}


// 转换时间戳
const getTime = (time, e) => {
  let date = new Date(time);
  let y = date.getFullYear(); // 年
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m; // 月
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d; // 天
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h; // 小时
  let minute = formatNumber(date.getMinutes());
  let second = formatNumber(date.getSeconds());
  if (e == 1) {
    return y + '-' + m + '-' + d + '  ' + h + ':' + minute + ':' + second;
  } else if (e == 2) {
    return y + '/' + m + '/' + d;
  } else if (e == 3) {
    return y + m + d;
  } else if (e == 4) {
    return y + '年' + m + '月';
  } else if (e == 5) {
    return y.toString() + m.toString();
  } else if (e == 6) {
    return y + '年' + m + '月' + d + '日';
  } else if (e == 7) {
    return y + '-' + m + '-' + d + '  ' + h + ':' + minute;
  } else {
    return y + '-' + m + '-' + d;
  }

}

// 防抖
const throttle = (fn, gapTime) => {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }
  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

/***
 * 判断用户滑动
 * 左滑还是右滑
 */
const getTouchData = (endX, endY, startX, startY) => {
  let turn = "";
  if (endX - startX > 50 && Math.abs(endY - startY) < 50) { //右滑
    turn = "right";
  } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) { //左滑
    turn = "left";
  }
  return turn;
}

// 获取服务title
const getitle = (str) => {
  let title = ''
  switch (str) {
    case 1:
      title = '很不满意'
      break;
    case 2:
      title = '不满意'
      break;
    case 3:
      title = '一般'
      break;
    case 4:
      title = '满意'
      break;
    case 5:
      title = '非常满意'
      break;
    default:
      title = '待评价'
      break;
  }
  return title
}

// 保留2位小数，如：2，会在2后面补上00,即2.00  
const toDecimal2 = (x) => {
  // if(x == null || x == undefined );{
  //   x = 0
  // }
  let num = parseFloat(x);
  if (isNaN(num)) {
    return false;
  }
  num = Math.round(x * 100) / 100;
  let s = num.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

// 获取未来七天时间
const getSevenDay = () => {
  let List = []
  for (let i = 0; i < 7; i++) {
    let weekDayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"] //星期映射数组
    let weekNumArr = [7, 1, 2, 3, 4, 5, 6]
    let weekKeyArr = ["weekday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] //星期映射数组
    let myDate = new Date()
    let milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * i; //当i为0代表当前日期，为1时可以得到明天的日期，以此类推
    let newMyDate = new Date(milliseconds);
    let weekDay = newMyDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    let year = newMyDate.getFullYear(); //获取当前年
    let month = newMyDate.getMonth() + 1; //获取当前月
    let newmonth = month < 10 ? ('0' + month) : month; // 月
    let day = newMyDate.getDate(); //获取当前日
    let newday = day < 10 ? ('0' + day) : day; // 日
    let Obj = {
      Day: weekDayArr[weekDay],
      Key: weekKeyArr[weekDay],
      num: weekNumArr[weekDay],
      Week: month + '月' + day + '日',
      orderWeek: year + '-' + newmonth + '-' + newday
    }
    List = [...List, Obj]
  }
  return List
}

// 获取当天日期
const getToDay = (num) => {
  let List = []
  for (let i = 0; i < 7; i++) {
    let weekDayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"] //星期映射数组
    let weekKeyArr = ["weekday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] //星期映射数组
    let weekNumArr = [7, 1, 2, 3, 4, 5, 6]
    let myDate = new Date()
    let milliseconds = myDate.getTime() + 1000 * 60 * 60 * 24 * i; //当i为0代表当前日期，为1时可以得到明天的日期，以此类推
    let newMyDate = new Date(milliseconds);
    let weekDay = newMyDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    let year = newMyDate.getFullYear(); //获取当前年
    let month = newMyDate.getMonth() + 1; //获取当前月
    let newmonth = month < 10 ? ('0' + month) : month; // 月
    let day = newMyDate.getDate(); //获取当前日
    let newday = day < 10 ? ('0' + day) : day; // 日
    let Obj = {
      Day: weekDayArr[weekDay],
      Key: weekKeyArr[weekDay],
      Num: weekNumArr[weekDay],
      Week: month + '月' + day + '日',
      orderWeek: year + '-' + newmonth + '-' + newday
    }
    List = [...List, Obj]
  }
  let DayObj = List.filter(item => {
    if (item.Num == num) {
      return item
    }
  })
  return DayObj[0]
}

module.exports = {
  formatTime,
  isObj,
  getTime,
  throttle,
  timeFormat,
  getitle,
  getTouchData,
  toDecimal2,
  getSevenDay,
  getToDay,
  regMobile
}