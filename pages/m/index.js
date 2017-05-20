// pages/m/index.js
const app = getApp()
Page({
  signout() {
    app.globalData.token = ''
    app.globalData.account = null
    wx.removeStorage({
      key: 'token'
    })
    wx.reLaunch({
      url: '/pages/m/index'
    })
  },
  onLoad() {
    let self = this
    if (app.auth()) {
      app.getUser(app.globalData.account.loginname, user => {
        self.setData({
          sign: true,
          user
        })
      })
    }
  }
})