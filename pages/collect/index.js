const app = getApp()
Page({
  onShow() {
    let self = this
    if (app.auth()) {
      if (!this.data.collects) {
        wx.request({
          url: `${app.globalData.api}/collects/${app.globalData.account.loginname}`,
          success(res) {
            res.data.forEach(item => {
              app.fixGAvatar(item.author)
              return item
            })
            self.setData({
              collects: res.data
            })
          }
        })
      }
    }
  }
})