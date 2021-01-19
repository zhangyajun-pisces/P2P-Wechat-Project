// pages/product/detail/detail.js
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
    this.setData({
      id:options.id
    })
    this.getDataInfo()
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
  getDataInfo:function(){
    var that=this
    util.request(api.queryProduct,{id:this.data.id,page:1,limit:1}).then(function (res) {
      var info=res.list[0]
      info.trait=parseFloat(info.trait)
      that.setData({info:info})
    })
  },
  toRes(){
    wx.navigateTo({
      url: '/pages/product/reservation/index?productId='+this.data.id,
    })
  }
})