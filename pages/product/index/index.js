// pages/studentRemind/index.js
var api = require('../../../config/api.js');
var util = require('../../../utils/util.js')
Page({
  data: {
    currentTab: 0,
    winHeight: "",
    toView: '',
    tabList: [],// 产品类型 {政府定融，房产销融}
    dropDownMenuTitle: ['产品期限', '风险评级', '收益率'],
    data1: [], //产品期限
    data2: [],//风险评级
    data3: [],//收益率
    productType: '',//查询条件  产品类型-默认第一个选中 -id
    productTerm: '', //查询条件  产品期限 -id
    productTrait: '',//查询条件 风险等级 -id
    productRisk: '',//查询条件 预期收益 -id
    rows: 10,
    pageIndex: 1,
    pageIndex2: 1,
    pageIndex3: 1,
    pageIndex4: 1,
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    isHideLoadMore: false,
    canLoadMore: true,
    isHideLoadMore2: false,
    canLoadMore2: true,
    isHideLoadMore3: false,
    canLoadMore3: true,
    isHideLoadMore4: false,
    canLoadMore4: true,
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    var toViewId = 'current' + e.detail.current;
    if (e.detail.current > 0) {
      toViewId = 'current' + (e.detail.current - 1);
    }
    this.setData({
      currentTab: e.detail.current,
      toView: toViewId
    });
    console.info('-----选中----' + this.data.currentTab)
    //根据切换，选中对应产品类型id
    var id=this.data.tabList[this.data.currentTab].id
    this.setData({
      productType:id
    })
    var currTab = this.data.currentTab + 1
    if (currTab == 1 && this.data.list1.length == 0) {
      this.loadList1();
    } else if (currTab == 2 && this.data.list2.length == 0) {
      this.loadList2();
    } else if (currTab == 3 && this.data.list3.length == 0) {
      this.loadList3();
    } else if (currTab == 4 && this.data.list4.length == 0) {
      this.loadList4();
    }
  },
  //根据选中的tab卡片，自动选择加载数据list
  getDateListAuto: function () {
    var currTab = this.data.currentTab + 1
    if (currTab == 1) {
      this.setData({list1:[],pageIndex:1})
      this.loadList1();
    } else if (currTab == 2) {
      this.setData({list2:[],pageIndex2:1})
      this.loadList2();
    } else if (currTab == 3) {
      this.setData({list3:[],pageIndex3:1})
      this.loadList3();
    } else if (currTab == 4) {
      this.setData({list4:[],pageIndex4:1})
      this.loadList4();
    }
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //二级下拉选择筛选条件 ，选中回调事件
  selectedItem: function (e) {
    var selectIndex = e.detail.selectType
    // console.log("type:"+e.detail.selectType); // 1 2 3 对应 ['产品期限', '风险评级', '收益率'],
    console.log('id --' + e.detail.selectedId + "title = " + e.detail.selectedTitle);
    if (selectIndex == 1) {//产品期限
      this.setData({
        productTerm: e.detail.selectedId
      });
    } else if (selectIndex == 2) {//风险评级
      this.setData({
        productTrait: e.detail.selectedId
      });
    } else if (selectIndex == 3) {//收益率
      this.setData({
        productRisk: e.detail.selectedId
      });
    }
    this.getDateListAuto()
  },


  //上拉加载数据
  pullUpLoading: function () {
    console.log("---tab1---分页加载---")
    if(this.data.canLoadMore){
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.loadList1();
    }
  },

  pullUpLoading2: function () {
    console.log("---tab2---分页加载---")
    if(this.data.canLoadMore2){
      this.setData({
        pageIndex2: this.data.pageIndex2 + 1
      })
      this.loadList2();
    }
  },

  pullUpLoading3: function () {
    console.log("---tab3---分页加载---")
    if(this.data.canLoadMore3){
      this.setData({
        pageIndex3: this.data.pageIndex3 + 1
      })
      this.loadList3();
    }
  },

  pullUpLoading4: function () {
    console.log("---tab4---分页加载---")
    if(this.data.canLoadMore4){
      this.setData({
        pageIndex4: this.data.pageIndex4 + 1
      })
      this.loadList4();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight;
        console.log(clientHeight);
        that.setData({
          winHeight: clientHeight - 120
        });
      }
    });
    this.getDict()
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
  //获取字典， tab 选项和 筛选条件都从这里面来
  getDict: function () {
    var that = this
    util.request(api.productDict).then(function (res) {
      var tab = res.product_type //产品类型 {政府定融，房产销融，租凭信托等}
      var d1 = res.product_term //产品期限 {不限，6个月，12个月，24个月等}
      var d2 = res.product_trait //风险等级 {2颗星，三颗星。。}
      var d3 = res.product_risk //收益率 {6%以内 ，6%-8% ，12%以上}
      var tab_list = []
      var d1_list = []
      var d2_list = []
      var d3_list = []
      tab.map(m => {
        var ops = { name: m.dictValue, id: m.dictName }
        tab_list.push(ops)
      })
      d1.map(m => {
        var ops = { title: m.dictValue, id: m.dictName }
        d1_list.push(ops)
      })
      d2.map(m => {
        var ops = { title: m.dictValue, id: m.dictName }
        d2_list.push(ops)
      })
      d3.map(m => {
        var ops = { title: m.dictValue, id: m.dictName }
        d3_list.push(ops)
      })
      that.setData({
        productType:tab_list[0].id, //默认类型选中第一个
        tabList: tab_list,
        data1: d1_list,
        data2: d2_list,
        data3: d3_list
      })
      //onload初始化字典完成后，加载tab1
      that.loadList1()
    })
  },
  loadList1: function () {
    console.info('tab1----加载数据---')
    var that=this
    var params={
      page:this.data.pageIndex,
      limit:this.data.rows,
      productType:this.data.productType,//产品类型
      productTerm:this.data.productTerm,//产品期限
      productTrait:this.data.productTrait,//风险等级
      productRisk:this.data.productRisk//预期收益
    }
    util.request(api.queryProduct,params).then(function (res) {
      var list = res.list
      if(list.length==0){ //没有数据了，不允许触发上拉加载更多
        that.setData({canLoadMore:false,isHideLoadMore: true})
        return 
      }
      var dataList = that.data.list1;
      list.forEach(r=>{
        r.trait=parseFloat(r.trait)
      })
      dataList = dataList.concat(list);
      that.setData({
        list1: dataList,
        isHideLoadMore: true
      });
    })
  },
  loadList2: function () {
    console.info('tab2----加载数据---')
    var that=this
    var params={
      page:this.data.pageIndex2,
      limit:this.data.rows,
      productType:this.data.productType,//产品类型
      productTerm:this.data.productTerm,//产品期限
      productTrait:this.data.productTrait,//风险等级
      productRisk:this.data.productRisk//预期收益
    }
    util.request(api.queryProduct,params).then(function (res) {
      var list = res.list
      if(list.length==0){ //没有数据了，不允许触发上拉加载更多
        that.setData({canLoadMore2:false,isHideLoadMore2: true})
        return 
      }
      var dataList = that.data.list2;
      list.forEach(r=>{
        r.trait=parseFloat(r.trait)
      })
      dataList = dataList.concat(list);
      that.setData({
        list2: dataList,
        isHideLoadMore2: true
      });
    })
  },
  loadList3: function () {
    console.info('tab3----加载数据---')
    var that=this
    var params={
      page:this.data.pageIndex3,
      limit:this.data.rows,
      productType:this.data.productType,//产品类型
      productTerm:this.data.productTerm,//产品期限
      productTrait:this.data.productTrait,//风险等级
      productRisk:this.data.productRisk//预期收益
    }
    util.request(api.queryProduct,params).then(function (res) {
      var list = res.list
      if(list.length==0){ //没有数据了，不允许触发上拉加载更多
        that.setData({canLoadMore3:false,isHideLoadMore3: true})
        return 
      }
      var dataList = that.data.list3;
      list.forEach(r=>{
        r.trait=parseFloat(r.trait)
      })
      dataList = dataList.concat(list);
      that.setData({
        list3: dataList,
        isHideLoadMore3: true
      });
    })
  },
  loadList4: function () {
    console.info('tab4----加载数据---')
    var that=this
    var params={
      page:this.data.pageIndex4,
      limit:this.data.rows,
      productType:this.data.productType,//产品类型
      productTerm:this.data.productTerm,//产品期限
      productTrait:this.data.productTrait,//风险等级
      productRisk:this.data.productRisk//预期收益
    }
    util.request(api.queryProduct,params).then(function (res) {
      var list = res.list
      if(list.length==0){ //没有数据了，不允许触发上拉加载更多
        that.setData({canLoadMore4:false,isHideLoadMore4: true})
        return 
      }
      var dataList = that.data.list4;
      list.forEach(r=>{
        r.trait=parseFloat(r.trait)
      })
      dataList = dataList.concat(list);
      that.setData({
        list4: dataList,
        isHideLoadMore4: true
      });
    })
  },
})