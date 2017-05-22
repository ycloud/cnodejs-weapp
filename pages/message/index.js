const app = getApp()
Page({
  data: {
    activeId: null
  },
  active(event) {
    this.setData({
      activeId: event.currentTarget.id
    })
  },
  onShow() {
    let self = this
    if (app.auth()) {
      if (!this.data.messages) {
        wx.request({
          url: `${app.globalData.api}/messages`,
          data: {
            accesstoken: app.globalData.token
          },
          success(res) {
            let messages = res.data.hasnot_read_messages.concat(res.data.has_read_messages)
            messages.forEach(message => {
              app.marked(message.reply)
            })
            self.setData({
              messages
            })
          }
        })
      }
    }
  }
})