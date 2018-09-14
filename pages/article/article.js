Page({
  data: {
  },
  onLoad: function (obj) {
    var that = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + obj.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var articleData = res.data;
        var articleContent = articleData.body.replace(/<p>/gi, '<p class="paragraph">')
          .replace(/<figure>/gi, '').replace(/<\/figure>/gi, '')
          .replace(/<img /gi, '<img style="width: 100%" ');
        articleData.body = articleContent;
        console.log(articleContent);
        that.setData({
          article: articleData
        })
      }
    })
  }
});