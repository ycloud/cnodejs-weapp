//app.js
import timeago from './utils/timeago.min.js'
const timeagoInstance = timeago(null, 'zh_CN')

App({
  timeagoInstance,
  onLaunch() {
    let self = this
    wx.getStorage({
      key: 'token',
      success(res) {
        self.globalData.token = res.data
        self.sign()
      }
    })
  },
  sign() {
    let self = this
    let accesstoken = this.globalData.token
    wx.request({
      url: 'https://cnodejs.org/api/v1/accesstoken',
      method: 'POST',
      data: {
        accesstoken
      },
      success(res) {
        if (res.statusCode > 299) {
          return wx.removeStorage({
            key: 'token'
          })
        }
        self.globalData.account = res.data
        self.globalData.token = accesstoken
      },
      fail() {
        wx.removeStorage({
          key: 'token'
        })
      }
    })
  },
  auth() {
    if (this.globalData.token) return true
    let routes = getCurrentPages()
    this.globalData.redirect = routes[routes.length - 1].__route__
    wx.redirectTo({
      url: `/pages/sign/index`
    })
  },
  getUser(loginname, cb) {
    let self = this
    wx.request({
      url: `${self.globalData.api}/users/${loginname}`,
      success(res) {
        res.data.create_at = self.timeagoInstance.format(res.data.create_at)
        cb(res.data)
      }
    })
  },
  globalData: {
    api: 'https://share.la/cnodejs'
  }
})