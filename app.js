//app.js
import timeago from './utils/timeago.min.js'
const timeagoInstance = timeago(null, 'zh_CN')

App({
  timeagoInstance,
  auth() {
    if (this.globalData.token) return true
    this.globalData.redirect = getCurrentPages()[0].__route__
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