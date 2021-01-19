// pages/user/userinfo/userinfo.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
    this.getUserInfo()
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

  getUserInfo: function () {
    let that = this
    util.request(api.queryInfo).then(function (res) {
      that.setData({ info: res })
    })
  },
  selectPic: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['从手机相册选择', '拍照'],
      success: function (res) {
        console.log(res.tapIndex)
        var type = 'album' //默认是 0 从相册选
        if (res.tapIndex == 1) {
          type = 'camera'
        }
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: [type], // 'camera', 'album'可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            console.log(tempFilePaths[0]);
            wx.uploadFile({
              url: api.imgUpload, //此处换上你的接口地址
              filePath: tempFilePaths[0],
              name: 'img',
              header: {
                "Content-Type": "multipart/form-data",
                'accept': 'application/json'
              },
              formData: {},
              success: function (res) {
                var result=JSON.parse(res.data)
                var img=result.data[0]
                util.request(api.modifyUser, {avatarUrl: img}).then(function (res) {
                  util.showToast("用户头像修改成功！")
                  that.getUserInfo()
                })

              },
              fail: function (res) {
                util.showErrorToast('头像上传失败！')
                console.log('fail');
              },
            })
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  //修改手机号码
  updatePhone: function (e) {
    var mobile = e.currentTarget.dataset.mobile;
    if (mobile) {
      wx.navigateTo({
        url: '../updatePhone/updatePhone?mobile=' + mobile
      });
    }else{
      wx.navigateTo({
        url: '../updatePhone2/updatePhone2'
      });
    }
  },

  //解绑
  unbind: function (e) {
    let that=this
    // var wechat=e.currentTarget.dataset.text,
    wx.showModal({
      title: '',
      content: '要解绑微信号吗？解绑后您将无法使用此微信进行登录！',
      success(res) {
        if (res.confirm) {
          util.request(api.cancelWx).then(function (res) {
            util.showToast("解除解绑成功！")
            that.getUserInfo()
          })
          // util.showToast("点击确定，调用接口，解除绑定成功！")
        } else if (res.cancel) {
          console.log('用户点击取消，解绑')
        }
      }
    })
  },

  //绑定
  onbind: function (e) {
    let that=this
    // util.showToast("点击了绑定微信")
    if (e.detail.userInfo == undefined) {
      util.showErrorToast('微信登录失败！');
      return;
    }
    user.loginByWeixin(e.detail).then(res => {
      //微信绑定，更新token
      console.info(`绑定微信 更新token==token=` + res.token)
      wx.setStorageSync('token', res.token);
      util.showToast("微信解绑成功！")
      that.getUserInfo()
    }).catch((err) => {
      util.showErrorToast('微信绑定失败！');
    });

  },


  //退出登录
  logOut: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否退出登录？',
      success(res) {
        if (res.confirm) {
          try {
            app.globalData.hasLogin = false
            //清楚所有缓存
         
            wx.removeStorageSync('userInfo');
            wx.removeStorageSync('token');
            wx.clearStorageSync()
          } catch (e) {
          }
          wx.switchTab({
            url: '../../user/user',
          })
        } else if (res.cancel) {

        }
      }
    })
  },

})