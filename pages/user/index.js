// pages/user/index.js
const app = getApp()
Page({
  onLoad(options) {
    let self = this
    if (options.loginname) {
      app.getUser(options.loginname, user => {
        self.setData({
          user
        })
      })
    } else {
      this.setData({
        error: true
      })
    }
  }
})