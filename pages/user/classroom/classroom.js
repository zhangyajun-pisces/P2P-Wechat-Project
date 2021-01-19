// pages/user/classroom/classroom.js// pages/user/notice/notice.js
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,//推荐
    rows: 10,
    dataList: [],//
    isHideLoadMore: false,
    canLoadMore: true,
    winHeight: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        that.setData({
          winHeight: clientHeight
        });
      }
    });
    this.getDataList();
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
  loadMore() {
    if(this.data.canLoadMore){
      this.setData({
        page: this.data.page + 1
      })
      this.getDataList();
    }
  },

  // //车生活例子调试
  // getDataList() {
  //   var _this = this;
  //   _this.setData({
  //     isHideLoadMore: false
  //   });
  //   var params={page: _this.data.page, rows: _this.data.rows, code: 'tuijian'}
  //   util.request(api.carLifeTest,params).then(function (res) {
  //    var list=res.article_list
  //     console.info(list)
  //     if(_this.data.page==5){
  //       console.info(list2)
  //     }
  //     var dataList = _this.data.dataList;
  //     dataList = dataList.concat(list);
  //     _this.setData({
  //       dataList: dataList,
  //       isHideLoadMore: true
  //     });
  //   })
  // },

  getDataList: function () {
    var that = this
    that.setData({
      isHideLoadMore: false
    });
    var params = { page: that.data.page, limit: that.data.rows }
    util.request(api.queryClassRoom, params).then(function (res) {
      var list = res.list
      if(list.length==0){ //没有数据了，不允许触发上拉加载更多
        that.setData({canLoadMore:false,isHideLoadMore: true})
        return 
      }

      var dataList = that.data.dataList;
      dataList = dataList.concat(list);
      that.setData({
        dataList: dataList,
        isHideLoadMore: true
      });
    })
  },
})