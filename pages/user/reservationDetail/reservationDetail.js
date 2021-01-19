// pages/user/reservationDetail/reservationDetail.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    status: 0 //状态 1 ,预约，2 已签约，3 已取消

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
    var status = options.status
    var orderId = options.orderId
    var title = '受理详情'
    if(status=='2'){
      title = '签约详情'
    }else if(status=='3'){
      title = '取消详情'
    }
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({ status: status })
    this.getOrderInfo(orderId)
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
  getOrderInfo: function (id) {
    let that = this
    util.request(`${api.orderDetail}?orderId=${id}`).then(function (res) {
      that.setData({
        info: res,
      })
    })
  },
  goToProduct: function () {
    var that = this
    var productId = this.data.info.productId
    // util.showToast("用户点击了产品，跳转到产品详情界面，" + productId)
    wx.navigateTo({
      url: '/pages/product/detail/detail?id='+productId,
    })
  },
  cancelReservation: function () {
    var that = this
    var orderId = this.data.info.orderId
    wx.showModal({
      title: '',
      content: '您确定要取消预约吗?',
      success(res) {
        if (res.confirm) {
          util.request(`${api.orderCancel}?orderId=${orderId}`).then(function (res) {
            util.showToast("取消预约成功！" )
            wx.navigateBack({
              delta:1
            })
          })
        

        } else if (res.cancel) {
          console.log('用户点击取消，解绑')
        }
      }
    })
  },
})