var api = require('../../config/api.js');
var util = require('../../utils/util.js')
Page({
  data: {
    page: 1,//推荐
    rows: 10,
    dataList: [],//
    isHideLoadMore: false,
    canLoadMore: true,
    winHeight: "",
  },
  onLoad: function (options) {
    let that=this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        that.setData({
          winHeight: clientHeight
        });
      }
    });
    this.getDataList();
  },

  onShow() {
  
  },
  refreshLoad(){
    //下拉刷新
    this.setData({
      page: 1,
      rows: 10,
      dataList: []
    })
    this.getDataList()

  },
  //上拉加载更多
  loadMore() {
    if(this.data.canLoadMore){
      this.setData({
        page: this.data.page + 1
      })
      this.getDataList();
    }
  },
  //加载数据
  getDataList: function () {
    var that = this
    that.setData({
      isHideLoadMore: false
    });
    var params = { page: that.data.page, limit: that.data.rows ,keyword:''}
    util.request(api.adviserList, params).then(function (res) {
      var list = res.list
      if(list.length==0){ //没有数据了，不允许触发上拉加载更多
        that.setData({canLoadMore:false,isHideLoadMore: true})
        return 
      }
      var dataList = that.data.dataList;
      dataList = dataList.concat(list);
      that.setData({
        dataList: dataList,
        isHideLoadMore: true
      });
    })
  },
  //点击进入详情
  adviserDetail(e) {
    console.info(e.currentTarget.dataset.id)
    var  id=e.currentTarget.dataset.id

    // var index = e.currentTarget.dataset.index;
    // var item=this.data.dataList[index]
    // var json=JSON.stringify(item)
    // console.info(json)
    wx.navigateTo({
      url: '../adviser/detail/detail?adviserId=' + id
    });
  },
})