var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  data: {
    getSmsCodeBtnTxt:"发送验证码",
    smsCodeDisabled:false,
    getSmsCodeBtnColor:"#3699FF",
    registDisabled:false,

    mobile:'',
    vercode:'',
    type:'modifyMobile'

  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成


  },
  onReady: function() {

  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },

  checkUserName:function(param){ 
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if(phone.test(inputUserName)){
      return true;
    }else{
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },

  getSmsCode: function () {
    var phoneNum = this.data.mobile;
    var that = this;
    var count = 60;
    if (this.checkUserName(phoneNum)) {
      console.info("发送验证码，调用后台接口。。。。")

      util.request(api.sendSms, {
        mobile: phoneNum,
        type: that.data.type,
      }).then(function (res) {
        console.info(`短信发送成功 进行倒计时`)
        that.setData({
          registDisabled: true
        })

        var si = setInterval(function () {
          if (count > 0) {
            count--;
            that.setData({
              getSmsCodeBtnTxt: count + ' s后重试',
              getSmsCodeBtnColor: "#999",
              smsCodeDisabled: true
            });
          } else {
            that.setData({
              getSmsCodeBtnTxt: "发送验证码",
              getSmsCodeBtnColor: "#3699FF",
              smsCodeDisabled: false
            });
            count = 60;
            clearInterval(si);
          }
        }, 1000);

      })
    }
  },
  

 
  bindVerCodeInput:function(e){
    this.setData({
      vercode: e.detail.value
    });
  },
  bindPhoneInput: function(e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  clearInput: function(e) {
    switch (e.currentTarget.id) {
      case 'clear-phone':
        this.setData({
          mobile: ''
        });
        break;
        case 'clear-vercode':
          this.setData({
            vercode: ''
          });
          break;
    }
  },
  modifyUser(){
    var that=this
    if(!that.data.vercode){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入短信验证码！'
      });
      return
    }
    if(!that.data.mobile){
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '请输入手机号码！'
      });
      return
    }

    util.request(api.modifyUser, {
      mobile: that.data.mobile,
      type: that.data.type,
      smsCode:that.data.vercode
    }).then(function (res) {
      util.showToast("用户信息修改成功！")
      wx.navigateBack({
        delta: 1,
      })
    })
  }
})