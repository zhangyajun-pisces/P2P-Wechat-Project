// pages/user/noticeDetail/noticeDetail.js
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
const htmlSnip =
`
<div>
<h3>1、简介</h3>
<div class="tfont">
<p>科目三沙坪坝土主考场</p>
<p>考场名称：重庆市机动车驾驶人科目三<strong>.</strong>沙坪坝土主考场</p>
<p>考场类别：汽车</p>
<p>所在区县：沙坪坝区</p>
<p>考场地址：重庆市沙坪坝区土主镇大川国际建材城7区10栋</p>
<p>联系电话：88928086</p>
</div>
</div>
<div>
<h3>2、考试流程</h3>
<div class="tfont">
<p>　　考生在选择好考试的时间地点后，在122互联网交通安全综合服务管理平台（cq.122gov.cn）上进行自主预约。</p>
<p>　　122网上自主预约成功后，通过网上交易平台（http://cqjj.ggjfw.com:9688/veh/）支付考试费用。</p>
<p>　　考生考试当天进入考场后，在考场通过考场门禁系统审核后进入考场考试。</p>
<p>　　考生考试结束后前往成绩打印处确认并签字。</p>
</div>
</div>
<div>
<h3>3、考试线路</h3>
<div class="tfont">
<p>&nbsp;</p>
<p>垄安大道月台路+远怀路</p>
<p>线路长度：8000米</p>
<p>线路描述：垄安大道+月台路+远怀路</p>
<br />
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>垄安大道月台路+远怀路</p>
<p>线路长度：4000米</p>
<p>线路描述：垄安大道西+垄安立交+回龙坝</p>
<br />
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>垄安大道月台路+远怀路</p>
<p>线路长度：4000米</p>
<p>线路描述：垄安大道南段+垄安立交+土主</p>
</div>
</div>
`
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // {
    //   "content": htmlSnip,
    //   "date": "2020-06-25T01:18:01.303Z",
    //   "noticeId": "2",
    //   "read": false,
    //   "subject": "公司主题",
    //   "title": "关于北京天健有限公司2019年定向融资计划收益的兑付公告"
    //  }
    console.info(options)
     var noticeId=options.noticeId
    this.getNoticeDetail(noticeId) 
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

  }
  ,
  getNoticeDetail: function (noticeId) {
    var that=this
    util.request(`${api.noticeDetail}?noticeId=${noticeId}`).then(function (res) {
      res.content = res.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
                            .replace(/<section/g, '<div')
                            .replace(/\/section>/g, '\div>')
                            .replace(/&nbsp;/g, '\xa0')
       that.setData({info:res})
    })
  }
})