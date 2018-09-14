const app = getApp();

Page({
  data: {
  },

  onLoad: function () {
    this._getArticleList();
  },

  onPullDownRefresh: function () {
    this._getArticleList();
  },

  goToArticle: function (event) {
    var id = event.currentTarget.dataset.id;
    
    // set article id to storage
    var visited = app.globalData.visited;
    if (visited.list.indexOf(id) < 0) {
      visited.list.push(id);
      wx.setStorageSync('visited', visited);
    }

    this._checkIfVisited();

    wx.navigateTo({
      url: '../article/article?id=' + id
    });
  },

  _getArticleList: function () {
    var that = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // set api date to storage
        var visited = app.globalData.visited;
        visited.date = res.data.date;
        wx.setStorageSync('visited', visited);

        // set api stories to list
        that.setData({
          list: res.data.stories
        });

        that._checkIfVisited();

        wx.stopPullDownRefresh();
      }
    });
  },

  _checkIfVisited: function () {
    var articles = this.data.list;
    var visited = app.globalData.visited;
    for (var i = 0, len = articles.length; i < len; i++) {
      if (visited.list.indexOf(articles[i].id) > -1) {
        articles[i].visited = true;
      }
    }
    this.setData({
      list: articles
    });
  }
});