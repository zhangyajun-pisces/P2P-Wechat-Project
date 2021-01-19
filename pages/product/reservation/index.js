// pages/product/reservation/index.js
var util = require('../../../utils/util');
var api = require('../../../config/api.js');
const user = require('../../../utils/user');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}, //产品信息
    productId:'',
    username: '',
    phone: '',
    money: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.info(options)
      this.setData({productId:options.productId})
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
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  moneyChange(e){
    this.setData({
      money: e.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-phone':
        this.setData({
          phone: ''
        });
        break;
      case 'clear-money':
        this.setData({
          money: ''
        });
        break;
    }
  },
  reservation: function () {
    var that = this
    var phonePx = util.regexConfig().phone;
    var namePx = util.regexConfig().username;
    var msg = ''
    if (!this.data.username) {
      msg = '请输入姓名！'
    }else if (!this.data.phone) {
      msg = '请输入手机号！'
    }else if(!this.data.money){
      msg = '请输入金额！'
    }
    if(!namePx.test(this.data.username.trim())){
      msg='姓名不合法，应为2-4为汉字作为姓名！'
    }
    if(!phonePx.test(this.data.phone.trim())){
      msg='手机号不合法，请输正确输入！'
    }
    if (msg != '') {
      util.showToast(msg)
      return
    }
    var params={ amount:this.data.money, mobile:this.data.phone, name:this.data.username,productId:this.data.productId}
    wx.showModal({
      title: '提示',
      content: `请确认您要预约的金额为:${this.data.money} 万?`,
      success(res) {
        if (res.confirm) {
          util.request(api.orderProduct,params).then(function (res) {
            wx.showToast({
              title: '您的预约信息提交成功！',
              icon: 'none',
              duration: 3000
            })
            wx.navigateBack({
              delta:1
            })
          })
        
        } else if (res.cancel) {
          console.log('用户点击取消，')
        }
      }
    })

    // var params = { idNo: this.data.idcard, mobile: this.data.mobile, name: username }
    // util.request(api.saveAuthName, params).then(function (res) {
    //   wx.redirectTo({
    //     url: '../userAuthWait/wait'
    //   })
    // })
  },
  getDataInfo:function(){
    var that=this
    util.request(api.queryProduct,{id:this.data.productId,page:1,limit:1}).then(function (res) {
      var info=res.list[0]
      that.setData({info:info})
    })
  },
})