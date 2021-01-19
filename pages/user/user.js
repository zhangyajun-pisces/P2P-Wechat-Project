var api = require('../../config/api.js');
var util = require('../../utils/util.js');
var user = require('../../utils/user.js');

var app = getApp();
Page({
  data: {
    info:{auth:null},
    hasLogin:false,//是否登录
    noticeInfo:null
  },
  onLoad: function(options) {

  },
  onReady: function() {

  },
  onShow: function() {
    console.info('是否已经登录~~~~~'+app.globalData.hasLogin)
    this.setData({
      hasLogin:app.globalData.hasLogin,
    })
    if(this.data.hasLogin){
      this.getUserinfo()
    }
    if(wx.getStorageSync('userinfo')){
      this.getNoticeList()
    }
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },
  //兑付公告
  getNoticeList:function(){
    var that=this
    //TOTO 这里要修改为返回list【0】
    if (!wx.getStorageSync('token') ) {return  }
    util.request(api.noticeList).then(function (res) {
      if(res.length){
        that.setData({noticeInfo:res[0]})
      }
     
    })
  },
  //获取个人信息
  getUserinfo:function(){
    let that=this
    //||wx.getStorageSync('userinfo')
    if (!wx.getStorageSync('token') ) 
    {
      return 
    }
    util.request(api.queryInfo).then(function (res) {
      // res.auth=true
      that.setData({info:res})
      wx.setStorageSync('userinfo', res);
    })
  },

  //  检查登录，未登录跳转到登录界面，然后中断操作
  chenckLogin: function(e) {
    var hasLogin=this.data.hasLogin
    if(!hasLogin){
      wx.navigateTo({
        url: '../auth/phoneLogin/phoneLogin'
      });
      return false
    }
    return true
  },
  //检查实名，未实名跳到实名界面去，然后中断操作
  checkAuth:function(){
   var auth= this.data.info.auth
   var mobile= this.data.info.mobile
   if(!auth){
    wx.navigateTo({
      url: './userAuth/userAuth?mobile='+mobile
    });
    return false
   }
   return true
  },
  //跳转个人设置
  settingInfo:function(){
   wx.navigateTo({
     url: './userinfo/userinfo',
   })
  },
  //我的预约
  myOrder:function(){
    if(this.chenckLogin() && this.checkAuth()){
      wx.navigateTo({
        url: './reservation/reservation',
      })
    }
  },
  //实名验证
  authName:function(){
    if(this.chenckLogin()){
      var auth= this.data.info.auth
      var mobile= this.data.info.mobile
      if(!auth){
       wx.navigateTo({
         url: './userAuth/userAuth?mobile='+mobile
       });
      }else{
        wx.navigateTo({
          url: './userAuthResult/userAuthResult'
        });
      }
    }
    
  },
  //风险评估
  riskCheck:function(){
    var that=this
    if(this.chenckLogin() && this.checkAuth()){
      if(!this,this.data.info.riskLevel){
        wx.navigateTo({
          url: `../risk/result/result?level=${that.data.info.riskLevel}&describe=${that.data.info.riskDest}&score=${that.data.info.riskScore}`,
        })
      }else{
        wx.navigateTo({
          url: '../risk/start/riskstart',
        })
      }
      
    }
  }
  
})