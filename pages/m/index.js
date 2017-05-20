// pages/m/index.js
const app = getApp()
Page({
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