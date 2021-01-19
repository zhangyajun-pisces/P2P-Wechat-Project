var api = require('../config/api.js');
var app = getApp();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "POST") {
  var that = this
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        wx.hideLoading()
        console.info(res)
        console.info('-------接口success------------')
        if (res.statusCode == 200) {
          //接口正常 返回状态，进行code判断
          // if (res.data.result){
          //   resolve(res.data.data)
          // }
          if (res.data.code == 501) {
            // 501 清除所有状态进入登录界面
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
              wx.clearStorageSync()
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/auth/phoneLogin/phoneLogin'
            });
            // wx.showToast({
            //   title: res.data.message,
            //   icon: 'none',
            // })
          } else if (res.data.code == 200 || res.data.code == 0) {
            resolve(res.data.data);  //错误上面统一处理，这里返回 200状态后的data
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
            })
            reject(res.data); //其他状态， 一般也不会有
          }
        } else {
          console.info(`返回状态码！==200 res.errMsg`)
          console.info(res.errMsg)
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        wx.hideLoading()
        that.showErrorToast(err.errMsg)
        console.info('------接口fail-------------')
        console.info(err)
        reject(err)
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/images/icon_error.png'
  })
}
function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|6|7|8)\d{9}$/,
    username: /^[\u2E80-\u9FFF]+$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  }
  return reg;
}

function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'success',
  })
}
function showToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
  })
}
module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  showSuccessToast,
  showToast,
  regexConfig
}