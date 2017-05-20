// pages/sign/index.js
const app = getApp()
Page({
  data: {
    token: ''
  },
  updateToken(event) {
    let token = event.detail.value
    this.setData({
      token
    })
  },
  qr() {
    let self = this
    wx.scanCode({
      success: res => {
        self.setData({
          token: res.result
        })
        self.sign()
      }
    })
  },
  sign() {
    let self = this
    let accesstoken = this.data.token
    let {storage} = this.data
    if (!storage) {
      if (accesstoken === '') return wx.showModal({
        showCancel: false,
        title: 'Access Token 不能为空！'
      })
      if (!/^[a-z\d\\-]{36}$/i.test(accesstoken)) return wx.showModal({
        showCancel: false,
        title: 'Access Token 格式错误！'
      })
    }
    wx.showLoading({
      title: '正在登录',
      mask: true
    })


    wx.request({
      url: 'https://cnodejs.org/api/v1/accesstoken', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        accesstoken
      },
      success(res) {
        if (res.statusCode > 299) {
          return wx.showModal({
            showCancel: false,
            title: '登录失败，请检查Access Token！'
          })
        }

        if (!storage) {
          wx.setStorage({
            key: 'token',
            data: accesstoken
          })
        }
        app.globalData.account = res.data
        app.globalData.token = accesstoken
        wx.reLaunch({
          url: '/' + app.globalData.redirect
        })
      },
      fail() {
        if (storage) {
          storage = false
          wx.removeStorage({
            key: 'token'
          })
          self.setData({
            storage
          })
        }
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  onLoad() {
    let self = this
    wx.getStorage({
      key: 'token',
      success(res) {
        self.setData({
          storage: true,
          token: res.data
        })
        self.sign()
      }
    })
  }
})