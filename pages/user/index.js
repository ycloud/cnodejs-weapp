// pages/user/index.js
const app = getApp()
Page({
  onLoad(options) {
    let self = this
    if (options.loginname) {
      app.getUser(options.loginname, user => {
        app.fixGAvatar(user)
        user.recent_replies.forEach(item => {
          app.fixGAvatar(item.author)
          return item
        })
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