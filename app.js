App({
  globalData: {
    visited: {
      date: null,
      list: []
    }
  },
  onLaunch: function () {
    var visited = wx.getStorageSync('visited') || this.globalData.visited;
    this.globalData.visited = visited;
  }
})