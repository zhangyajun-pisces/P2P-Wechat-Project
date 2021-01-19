const util = require("../../../utils/util.js");
var api = require('../../../config/api.js');
var app = getApp()
// pages/risk/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_item: null,
    current_index: 0,
    answerList: [], //用户选中的答案
    questionList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRiskList()
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
  getRiskList: function () {
    //去加载题List  然后默认为第一题
    let that = this
    util.request(api.riskQuestionList).then(function (res) {
      var item = res[0]
      that.setData({
        questionList: res,
        current_item: item
      })
    })
  },
  //下一题
  next_question: function () {
    var questionList = this.data.questionList;//所有题目
    var current_item = this.data.current_item; //当前题
    var _index = this.data.current_index + 1;//当前题下标
    if (_index == questionList.length) {
      util.showToast("已经是最后一题了")
      return;
    } else {
      current_item = questionList[_index]
    }
    this.setData({
      current_item: current_item,
      current_index: _index,
    });
  },
  //上一题
  last_question: function () {
    var questionList = this.data.questionList;
    var current_item = this.data.current_item;
    var _index = this.data.current_index - 1;//当前题下标
    if (this.data.current_index == 0) {
      util.showToast("已经是第一题了")
      return;
    } else {
      current_item = questionList[_index]
    }
    this.setData({
      current_item: current_item,
      current_index: _index,
    });
  },
  //单选按钮改变（单选题、判断题）
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    //用户答案
    var user_answer = e.detail.value;
    var naswerList = this.data.answerList;
    var _index = this.data.current_index;
    var ops = { id: user_answer, checked: true }
    naswerList[_index] = ops
    this.setData({
      answerList: naswerList
    });
    //跳到下一题
    this.next_question();
  },
  //
  subimt_question: function () {
    let that = this
    var ansList = this.data.answerList
    var listId=ansList.map(r=>{
      return r.id
    })
    if(listId.length !==this.data.questionList.length){
      util.showToast(' 请检查所有题目是否都选择了答案！')
      return
    }
    console.info(listId)
 
    util.request(api.riskSubmit,listId).then(function (res) {
      wx.redirectTo({
        url: `../result/result?level=${res.level}&describe=${res.describe}&score=${res.score}`
      })
    })   
  },
})