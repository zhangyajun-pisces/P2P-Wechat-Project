/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../config/api.js');


/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        　wx.login({})　　
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function loginByWeixin(detail) {

  return new Promise(function(resolve, reject) {
    return login().then((res) => {
      console.info(res)
      // return

      var userinfo=detail.userInfo
      var encryptedData=detail.encryptedData
      var iv=detail.iv
      var rawData=detail.rawData
      var signature=detail.signature
      //登录远程服务器
      util.request(api.loginByWeixin, 
        {
        code: res.code,
        encryptedData: encryptedData,
        iv: iv,
        rawData: rawData,
        signature: signature,
      }).then(res => {
          //存储用户信息
          wx.setStorageSync('token', res.token);
          resolve(res);
       
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function(resolve, reject) {
   
    if (wx.getStorageSync('token')) {
      resolve(true);
      //  checkSession().then(() => {
      //   resolve(true);
      // }).catch(() => {
      //   reject(false);
      // });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};