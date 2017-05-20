const app = getApp()
Page({
  onLoad() {
    let self = this
    if (app.auth()) {
      if (!this.data.collects) {
        wx.request({
          url: `${app.globalData.api}/collects/${app.globalData.account.loginname}`,
          success(res) {
            res.data.create_at = app.timeagoInstance.format(res.data.create_at)
            self.setData({
              collects: res.data
            })
          }
        })
      }
    }
  }
})