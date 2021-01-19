// pages/user/reservation/reservation.js
const util = require("../../../utils/util.js");
var api = require('../../../config/api.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tabList: [{ name: '待受理' }, { name: '已签约' }, { name: '已取消' }],
    winHeight: "",
    toView: '',
    orderList:[]
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        // console.log(clientHeight);
        that.setData({
          winHeight: clientHeight
        });
      }
    });
    this.getResList()
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
  //tab 选中tab
  swichTab(e){
    let current = e.currentTarget.dataset.current;
    console.info('---------'+current)
    if (this.data.currentTab != current){
      this.setData({
        currentTab:current,
        toView:"current"+current
      });
    }
  },
  // 滚动切换标签样式
  scollTab: function (e) {
    var toViewId = 'current' + e.detail.current;
    if (e.detail.current > 0) {
      toViewId = 'current' + (e.detail.current - 1);
    }
    this.setData({
      currentTab: e.detail.current,
      toView: toViewId
    });
    this.getResList()
  },
  getResList: function () {
    let that = this
    var params={page:1,limit:1000,status:this.data.currentTab+1}
    util.request(api.orderList,params).then(function (res) {
      that.setData({
        orderList: res.list,
      })
    })
  },
  reservationDetail:function(e){
    var orderId=e.currentTarget.dataset.orderid;
    var status=e.currentTarget.dataset.status;
    wx.navigateTo({
      url: `../reservationDetail/reservationDetail?status=${status}&orderId=${orderId}`,
    })
  },
})