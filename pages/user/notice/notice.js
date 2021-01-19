// pages/user/notice/notice.js
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeList()
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
  getNoticeList:function(){
    var that=this
    //TOTO 这里要修改为返回list【0】
    if (!wx.getStorageSync('token') ) {return  }
    util.request(api.noticeList).then(function (res) {
       that.setData({noticeList:res})
    })
  },

  noticeDetail:function(e){
    var id=e.currentTarget.dataset.id;
    console.info('兑付公告点击 调用后台已读接口=='+id)
    wx.redirectTo({
      url: '../noticeDetail/noticeDetail?id='+id,
    })
  }
})