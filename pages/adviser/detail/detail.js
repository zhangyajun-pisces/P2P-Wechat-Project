// pages/adviser/detail/detail.js
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    hiddenCanvas: true,
    canvas_width: 375,
    canvas_height: 667,
    wxQrcode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    var adviserId=options.adviserId ||options.scene
    util.request(api.adviserList, {id:adviserId,limit:1,page:1}).then(function (res) {
      var info = res.list[0]
      that.setData({userinfo:info})
    })

    util.request(api.getWxCode, {adviserId:adviserId,path:'pages/adviser/detail/detail'}).then(function (res) {
        that.setData({wxQrcode:res})
    })
    
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
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  //保存图片
  saveImage() {
    var _this = this;
    if(!_this.data.wxQrcode){
      
      util.showToast("保存分享海报失败，图片地址未生成！")
      return;
    }

    wx.showLoading({
      title: '保存中……',
    })

    //先创建一个画布
    _this.setData({
      hiddenCanvas: false,
    });
    var ctx = wx.createCanvasContext("image_canvas");

    //背景图片
    ctx.drawImage("/images/share.jpg", 0, 0, _this.data.canvas_width, _this.data.canvas_height);

    // var url
    //小程序码
    // ctx.drawImage("/images/wxqrcode.jpg", 10, 560, 100, 100);
    // ctx.drawImage(this.data.wxQrcode, 10, 560, 100, 100);

    //姓名
    ctx.setTextAlign('center')    // 文字居中
    ctx.setFillStyle('#000000')  // 文字颜色：白色
    ctx.setFontSize(24);
    ctx.fillText(_this.data.userinfo.name, 170, 580);

    //手机
    ctx.setTextAlign('center')    // 文字居中
    ctx.setFillStyle('#aaa')  // 文字颜色：白色
    ctx.setFontSize(18);
    ctx.fillText(_this.data.userinfo.mobile, 190, 610);

    //提示
    ctx.setTextAlign('center')    // 文字居中
    ctx.setFillStyle('#aaa')  // 文字颜色：白色
    ctx.setFontSize(14);
    ctx.fillText('点击识别 我的名片', 190, 650);


    //小程序码
    wx.downloadFile({
      url: _this.data.wxQrcode,
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode == 200) {
          var tempFilePath = res.tempFilePath;
          //小程序码
          ctx.drawImage(tempFilePath, 10, 560, 100, 100);
          //成功执行，draw方法中进行回调
          ctx.draw(false, function () {
            setTimeout(function () {
              //保存到相册
              _this.saveImageToPhotosAlbum();
            }, 500)
          })
        }
      },
      fail() {
        wx.hideLoading();
        _this.setData({
          hiddenCanvas: true,
        });
        wx.showToast({
          title: '保存图片失败，请稍后重试',
          icon: 'none',
          duration: 1000
        })
      }
    })
    //成功执行，draw方法中进行回调
    // ctx.draw(false, function () {
    //   setTimeout(function () {
    //     //保存到相册
    //     _this.saveImageToPhotosAlbum();
    //   }, 500)
    // })
  },

  //保存到相册
  saveImageToPhotosAlbum() {
    var _this = this;
    var ratio = _this.data.ratio;
    var unit = _this.data.canvas_width;
    var unith = _this.data.canvas_height;
    //保存临时图片
    wx.canvasToTempFilePath({
      canvasId: 'image_canvas',
      fileType: 'jpg',
      quality: 1,
      width: unit,
      height: unith,
      destWidth: ratio * 375,
      destHeight: ratio * 667,
      success: function (res) {
        _this.setData({
          hiddenCanvas: true,
        });

        //保存图片到相册
        var filePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: filePath,
          success(res) {
            wx.hideLoading();
            wx.showToast({
              title: '图片已经保存到相册，可以分享了',
              icon: 'none',
              duration: 1000
            })
          },
          fail: function () {
            _this.setData({
              hiddenCanvas: true,
            });
            wx.hideLoading();
            wx.openSetting({
              success(settingdata) {
                if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                  wx.showToast({
                    title: '获取权限成功，请重新保存',
                    icon: 'none',
                    duration: 1000
                  })
                } else {
                  wx.showToast({
                    title: '获取权限失败，请稍后重试',
                    icon: 'none',
                    duration: 1000
                  })
                }
              }
            })
          }
        })
      },
      fail: function () {
        wx.hideLoading();
        _this.setData({
          hiddenCanvas: true,
        });
        wx.showToast({
          title: '保存图片失败，请稍后重试',
          icon: 'none',
          duration: 1000
        })
      }
    });
  },
})
