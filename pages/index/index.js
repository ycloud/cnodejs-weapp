//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    hasMore: true,
    tab: 'all',
    tabs: [{
      id: 'all',
      label: '全部'
    }, {
      id: 'good',
      label: '精华'
    }, {
      id: 'share',
      label: '分享'
    }, {
      id: 'ask',
      label: '问答'
    }, {
      id: 'job',
      label: '招聘'
    }],
    page: 1,
    topics: []
  },
  tapTab(event) {
    let tab = event.target.id
    let title;
    this.setData({
      tab,
      hasMore: true,
      loading: false,
      page: 1,
      topics: []
    })
    this.getTopics()
    switch (tab) {
      case 'all':
        title = 'cnodejs wexin app share.la'
        break;
      case 'good':
        title = '精华话题'
        break;
      default:
        title = this.data.tabs.find(item => item.id === tab).label + '版块'
    }
    wx.setNavigationBarTitle({ title })
  },
  getTopics(cb) {
    let { hasMore, topics, loading, page, tab } = this.data
    if (!hasMore || loading) return
    let data = { page }
    if (tab !== 'all') data.tab = tab
    this.setData({
      loading: true
    })
    let self = this
    wx.request({
      url: `${app.globalData.api}/topics`,
      data,
      success(res) {
        if (self.data.tab !== tab) return
        let { data } = res
        self.setData({
          loading: false
        })
        data.forEach(item => {
          app.fixGAvatar(item.author)
          item.last_reply = app.timeagoInstance.format(item.last_reply_at)
        })
        if (data.length < 40 || page === 9) {
          self.setData({
            hasMore: false
          })
        } else {
          page++
          self.setData({
            page
          })
        }
        self.setData({
          topics: topics.concat(data)
        })
      }
    })
  },
  onLoad() {
    this.getTopics()
  }
})
