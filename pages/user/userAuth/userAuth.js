// pages/user/userAuth/userAuth.js
var util = require('../../../utils/util');
var api = require('../../../config/api.js');
const user = require('../../../utils/user');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    userType:'居民身份证',
    idcard:'',
    mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mobile=options.mobile
    if(mobile){
      this.setData({mobile:mobile})
    }
   
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
  bindUsernameInput:function(e){
    this.setData({
      username: e.detail.value
    });
  },
  bindIdcardInput: function(e) {
    this.setData({
      idcard: e.detail.value
    });
  },
  clearInput: function(e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
        case 'clear-idcard':
          this.setData({
            idcard: ''
          });
          break;
    }
  },
  userAuth:function(){
    var that=this
    var userpx = util.regexConfig().username;
    var card = util.regexConfig().idcard;
    var msg=''
    if(!card.test(this.data.idcard.trim())){
      msg='身份证件号不合法，请输正确输入！'
    }
    var username= this.data.username.trim()
    if(username.length>4 || username.length<2 || !userpx.test(username)){
      msg='姓名不合法，应为2-4为汉字作为姓名！'
    }
    if(!this.data.idcard.trim()){
      msg='请输入身份证号码！'
    }
    if(!username){
      msg='请输入姓名！'
    }
    if(msg!=''){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: msg
      });
      return 
    }
    var params={idNo:this.data.idcard,mobile:this.data.mobile,name:username}
    util.request(api.saveAuthName,params).then(function (res) {
      wx.redirectTo({
        url: '../userAuthWait/wait'
      })
    })
    // util.showToast('身份验证成功，提交后台TODO，跳转认证等待界面')
   
  },
})