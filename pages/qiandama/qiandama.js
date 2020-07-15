// pages/qiandama.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount: 1,
    input: '',
    prices: [],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从缓存获取任务列表数据，并用setData设置
    var prices = wx.getStorageSync('prices') // 调用 WX API 从本地缓存中获取数据
    if (prices) {
      this.setData({
        prices: prices
      })
    }

    this.setData({
      discount: this.getDiscount()
    })
    this.calTotal()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addNewItem: function (e) {
    if (!this.data.input || !this.data.input.trim()) return

    let prices = this.data.prices
    let finalPrice = this.multiply(this.data.input, this.data.discount)
    prices.push(finalPrice)
    this.setData({
      input: '',
      prices: prices
    })
    this.save();
    this.calTotal()
  },
  save: function () {
    wx.setStorageSync('prices', this.data.prices)
  },
  clearStorage: function () {
    wx.setStorageSync('prices', []),
      this.setData({
        prices: []
      })
    this.calTotal()
  },
  inputChangeHandle: function (e) {
    this.setData({
      input: e.detail.value
    })
  },
  calTotal: function () {
    let total = 0;
    let prices = this.data.prices;
    prices.forEach(price => {
        total = total + parseFloat(price)
      }),
      this.setData({
        total: total
      })
  },
  getDiscount: function () {
    let discount = 10;

    let now = new Date();

    Date.prototype.clone = function () {
      return new Date(this.valueOf());
    }

    let today19 = now.clone();
    //get today 19:00
    today19.setHours(19, 0, 0);

    //30min period ms.
    let period30min = 30 * 60 * 1000;

    let diffMillis = now.getTime() - today19.getTime();

    if (now >= today19) {
      console.log(diffMillis / period30min)
      //因为19点开始要减1，所以要多减掉1折。
      let step = parseInt(diffMillis / period30min) + 1;
      discount -= step;
    }

    return discount / 10;
  },
  multiply: function (arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {}
    try {
      m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  }
})