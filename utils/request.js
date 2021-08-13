const app = getApp() // 引入app
// 根据路由显示不同的加载文字
let degree = 0
const setTitle = (url) => {
    let title = '加载中'
    switch (url) {
        case '/user/login':
            title = '登陆中'
            break;
        case '/user/loginWXAdds':
            title = '登陆中'
            break;
        default:
            break;
    }
    return title
}

// 防止重复弹出Modal
const onLogin = () => {
    wx.showModal({
        title: '您还未登录',
        content: '请先登录再进行操作',
        success(res) {
            if (res.confirm) {
                wx.reLaunch({
                    url: '/firstpages/authorization/index',
                })
                degree = 0
            } else if (res.cancel) {
                degree = 0
            }
        }
    })
}

const retard = () => {
    onLogin()
        ++degree
}

const request = (url, options,modules) => {
    // 根据不同路由携带不同header参数(暂时可有可无)
    let head
    if (url == '/user/wxAppletlogin' || url == '/user/loginWXAdds') {
        head = {
            'content-type': options.isObj ? 'application/json' : 'application/x-www-form-urlencoded',
        }
    } else {
        head = {
            'content-type': options.isObj ? 'application/json' : 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
        }
    }
    let urls
    if (modules) {
        urls = `${app.globalData.msgurl}${url}`
    } else {
        urls = `${app.globalData.baseurl}${url}`
    }
    return new Promise((resolve, reject) => {
        // 监听网络状态，失败则跳转网络失败页面
        wx.onNetworkStatusChange(function (res) {
            if (res.isConnected == false && res.networkType == "none") {
                wx.navigateTo({
                    url: '/pages/networkanomaly/index',
                })
            }
        })
        // 加载状态文字
        wx.showLoading({
            title: setTitle(url),
        })
        wx.request({
            url: urls,
            method: options.method,
            data: options.data,
            header: {
                ...head
            },
            success(request) {
                resolve(request)
                // 不想提示该用是否是创客
                if (request.data.code !== 200 && (request.data.message != '用户不是创客' || request.data.code != 400)) {
                    wx.showToast({
                        title: request.data.message,
                        icon: 'none',
                        duration: 1000
                    })
                    if (request.data.code === 300 && degree == 0) {
                        retard()
                    }
                } else {
                    // wx.showToast({
                    //     title: request.data.message,
                    //     icon: 'none',   
                    //     duration: 1000   
                    // })
                }
            },
            fail(error) {
                console.error(error, 'error');
                reject(error.data)
            },
            complete: () => {
                setTimeout(() => {
                    wx.hideLoading();
                }, 1000);
            }
        })
    })
}

const get = (url, options,modules) => {
    return request(url, {
        method: 'GET',
        data: options
    },modules)
}

//post对象
const postObj = (url, options,modules) => {
    return request(url, {
        method: 'POST',
        data: options,
        isObj: true
    },modules)
}

//post参数
const post = (url, options,modules) => {
    return request(url, {
        method: 'POST',
        data: options,
        isObj: false
    },modules)
}

const put = (url, options,modules) => {
    return request(url, {
        method: 'PUT',
        data: options
    },modules)
}

// 不能声明DELETE（关键字）
const remove = (url, options,modules) => {
    return request(url, {
        method: 'DELETE',
        data: options
    },modules)
}

module.exports = {
    get,
    post,
    put,
    remove,
    postObj,
}