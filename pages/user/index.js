// pages/user/index.js
const app = getApp()
Page({
  onLoad (options) {
    let self = this
    if (options.loginname) {
      wx.request({
        url: `${app.globalData.api}/users/${options.loginname}`,
        success(res) {
          res.data.create_at = res.data.create_at.slice(0, 10)
          self.setData({
            user: res.data
          })
        }
      })
    } else {
      this.setData({
        error: true
      })
    }
  }
})