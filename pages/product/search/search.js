var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp()
Page({
  data: {
    keywrod: '',
    searchStatus: false,
    historyKeyword: [],
    list: [],
  },
  //事件处理函数
  closeSearch: function () {
    wx.navigateBack()
  },

  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false
    });
  },

  onLoad: function () {
    var his = wx.getStorageSync('historyProduct')
    // console.info(his)//保存在本地的历史搜索记录
    this.setData({
      historyKeyword: his
    })
  },


  inputChange: function (e) {
    this.setData({
      keyword: e.detail.value,
      searchStatus: false
    });
    // if (e.detail.value) {
    //   this.getHelpKeyword();
    // }
  },

  inputFocus: function () {
    // this.setData({
    //   searchStatus: false,
    //   goodsList: []
    // });
    // if (this.data.keyword) {
    //   this.getHelpKeyword();
    // }
  },

  clearHistory: function () {
    this.setData({
      historyKeyword: []
    })
    try {
      wx.removeStorageSync('historyProduct') //情况历史搜索记录
    } catch (e) {
    }
  },

  //点击查看详情
  productDetail(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.advisersList[index]
    var json = JSON.stringify(item)
    // console.info(json)
    wx.navigateTo({
      url: '../../adviser/detail/detail?item=' + json
    });
  },

  getDataList: function () {
    let that = this;
    var params={ page:1, limit:20, name: that.data.keyword}
    util.request(api.queryProduct, params).then(function (res) {
      var list = res.list
      that.setData({
        searchStatus: true,
        list: list,
      });
    })
  },

  //选中了历史搜索记录
  onKeywordTap: function (event) {
    this.getSearchResult(event.target.dataset.keyword);
  },
  //搜索ing
  getSearchResult(keyword) {
    console.info('搜索关键字为' + keyword)
    if (keyword) {
      var hisqu = { keyword: keyword }
      var hisList = this.data.historyKeyword
      if (!hisList) {
        hisList = []
      }
      hisList.unshift(hisqu) //头插
      if (hisList.length > 6) {
        hisList.splice(6, 1) //历史记录里面最多保留10位 ,从10开始删除1位 ,相当于队列先进先出
      }
      //将搜索记录加在 历史里面去
      this.setData({
        keyword: keyword,
        historyKeyword: hisList,
        list: []
      });
      wx.setStorageSync('historyProduct', hisList)
    }
    //按照搜索关键字去查询记录
    this.getDataList();
  },
  //点击搜索按钮
  goSearch: function () {
    console.info(this.data.keyword)
    if (this.data.keyword) {
      this.getSearchResult(this.data.keyword);
    }
  },
  //输入搜索 按回车键出发搜索
  onKeywordConfirm(event) {
    this.getSearchResult(event.detail.value);
  }
})