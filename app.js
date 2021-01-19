//app.js
var user = require('./utils/user.js');

App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager();
    wx.getUpdateManager().onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  onShow: function () {
     user.checkLogin().then(res => {
      this.globalData.hasLogin = true;
    }).catch(() => {
      this.globalData.hasLogin = false;
    });
  },

  globalData: {
  
    hasLogin: false,

    //wx5b3fc71a2c15b7c7 能用的
    // appid: 'wxfc76a53d7ec47038',
    // secret: 'ef9b3695c447e2a3713a6d48e0647b27',

    // wx_login_appid: 'wxf411d56b2310c51d',
    // wx_login_secret: '9d0194ba53cbb2ac69dcb41673fcc41f',

    share_page_path: '',//分享页面路径
    share_title: '!',//分享标题
    share_image: '',//分享图片

  }
})