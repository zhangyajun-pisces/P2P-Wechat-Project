// 以下是业务服务器API地址
// 本机开发时使用
var WxApiRoot = 'http://47.114.38.106:8081/min/';


// 云平台上线时使用
// var WxApiRoot = '';

module.exports = {

  img1:WxApiRoot + 'static/images/1.png', //公司简介
  img2:WxApiRoot + 'static/images/2.png', //公司简介
  img3:WxApiRoot + 'static/images/3.png', //公司简介

  getWxCode:WxApiRoot + 'minApi/getWxCode',

  imgUpload:WxApiRoot + 'attr/upload/header', //图片上传
  productDict:WxApiRoot + 'minApi/productDict', // 产品字典（tab ,和筛选条件都从字典里面来）
  queryProduct:WxApiRoot + 'minApi/queryProduct', // 产品列表 +详情
  orderProduct:WxApiRoot + 'minApi/productOrder', // 产品下单预约

  adviserList:WxApiRoot + 'minApi/adviserList', // 顾问列表
  regProtocol:WxApiRoot + 'minApi/registerProtocol', //用户注册服务
  sendSms:WxApiRoot + 'minApi/sendSms', //登录注册发送短信
  smsValidMobile:WxApiRoot + 'minApi/validMobile', //对短信进行验证
  modifyUser:WxApiRoot + 'minApi/modifyUser', //修改用户信息
  cancelWx:WxApiRoot + 'minApi/cancelWx', // 微信解绑
  
  mobileLogin:WxApiRoot + 'minApi/mobileLogin', //手机验证码登录
  queryInfo:WxApiRoot + 'minApi/queryInfo', //查询用户登录信息
  saveAuthName:WxApiRoot + 'minApi/saveCertification', //保存实名验证
  queryAuthName:WxApiRoot + 'minApi/queryCertification', //查询实名验证信息
  loginByWeixin: WxApiRoot + 'minApi/wxLogin', //微信登录
  riskQuestionList: WxApiRoot + 'minApi/riskList', //风险评估 获取题目
  riskSubmit: WxApiRoot + 'minApi/riskSubmit', //风险评估提交答案，获取描述
  orderList: WxApiRoot + 'minApi/orderList', //我的预约List
  orderDetail: WxApiRoot + 'minApi/orderDetail', //我的预约 orderid查询详情
  orderCancel: WxApiRoot + 'minApi/orderCancel', //取消预约
  noticeList: WxApiRoot + 'minApi/notice', //兑付公告
  noticeDetail: WxApiRoot + 'minApi/noticeDetail', //兑付公告,详情
  queryClassRoom: WxApiRoot + 'minApi/queryClassRoom', // 理财 小课堂
  classRoomDetail:WxApiRoot + 'minApi/classRoomDetail', // 小课堂详情
  
  IndexUrl: WxApiRoot + 'home/index', //首页数据接口
  SearchIndex: WxApiRoot + 'adviser/search/index', //顾问搜索关键字
  AdvisersList: WxApiRoot + 'adviser/search/index', //获取顾问用户列表（可以带关键字搜索）
  
};