//index.js
//获取应用实例
const app = getApp()
const cal = require('./calculate')

Page({
  data: {
    discount: "QianDaMa"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    this.setData({
      count: cal.getDiscount()
    })
  }
})
