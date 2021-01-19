//index.js
const app = getApp();
var isKong = require('../../utils/isKong.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  local_url:""
  },

 

  //功能暂未开放
  showMessage: function(e){
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 500
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var token = wx.getStorageSync('token');
    this.setData({
      local_url: options.url,
    });

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
    return {
      title: app.globalData.share_title,
      path: app.globalData.share_page_path,
      imageUrl: app.globalData.share_image,
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})
