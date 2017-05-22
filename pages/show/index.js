// pages/show/index.js
const app = getApp()
import wemark from '../../wemark/wemark.js'
Page({
  data: {
    content: ''
  },
  onLoad(options) {
    let self = this
    if (options.id) {
      wx.request({
        url: `${app.globalData.api}/topics/${options.id}`,
        success(res) {
          wemark.parse(res.data.content, self, {
            name: 'content'
          })
          res.data.create_at = app.timeagoInstance.format(res.data.create_at)
          res.data.replies.forEach(reply => {
            app.fixGAvatar(reply.author)
            app.marked(reply)
            reply.create_at = app.timeagoInstance.format(reply.create_at)
          })
          self.setData({
            topic: res.data
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