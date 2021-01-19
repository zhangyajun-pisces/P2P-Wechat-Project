var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  data: {
    mobile: '',
    verCode: '',
    smsCode: '',
    type: 'login',

    checkCode: 'Ps7c',
    getSmsCodeBtnTxt: "发送验证码",
    smsCodeDisabled: false,
    getSmsCodeBtnColor: "#3699FF",
    registDisabled: false,


  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    this.createCode()

  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },

  checkUserName: function (param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if (phone.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
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


  regService: function () {
    var url = api.regProtocol
    // console.info(url);
    wx.navigateTo({
      url: '../../h5web/index?url=' + url
    });
  },



  phoneLogin: function () {
    var that = this;
    if (this.data.mobile.length < 1 || this.data.smsCode.length < 1) {
      wx.showModal({
        title: '错误信息',
        content: '请输入手机号和短信验证码',
        showCancel: false
      });
      return false;
    }
    util.request(api.mobileLogin, {
      mobile: this.data.mobile,
      smsCode: this.data.smsCode,
      type: this.data.type,
    }).then(function (res) {
      console.info(`手机登录成功==token=` + res.token)
      app.globalData.hasLogin = true;
      wx.setStorageSync('token', res.token);
      wx.switchTab({
        url: '/pages/user/user'
      });
    })
  },

  wxLogin: function (e) {
    console.info(e)
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }
    user.loginByWeixin(e.detail).then(res => {
      app.globalData.hasLogin = true;
      console.info(`微信登录==token=` + res.token)
      wx.setStorageSync('token', res.token);
      wx.navigateBack({
        delta: 1
      })
    }).catch((err) => {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
    });

    // user.checkLogin().catch(() => { });
  },

  //生成验证码
  createCode() {
    let code = ''
    let codeLength = 4 // 验证码的长度
    let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z') // 随机数
    for (let i = 0; i < codeLength; i++) { // 循环操作
      let index = Math.floor(Math.random() * 36) // 取得随机数的索引（0~35）
      code += random[index] // 根据索引取得随机数加到code上
    }
    this.setData({
      checkCode: code
    })
  },
  bindMobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    });
  },
  bindVerCodeInput: function (e) {
    this.setData({
      verCode: e.detail.value
    });
  },

  bindSmsInput: function (e) {
    this.setData({
      smsCode: e.detail.value
    });
  },

  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-mobile':
        this.setData({
          mobile: ''
        });
        break;
      case 'clear-vercode':
        this.setData({
          verCode: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})