// pages/goods_list/index.js
import { request } from "../../request/index.js"
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {id:0,value:"综合",isActive:true},
      {id:1,value:"销量",isActive:false},
      {id:2,value:"价格",isActive:false}
    ],
    goodsList: []
  },
  
  // 接口参数
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({url:"/goods/search",data:this.request});
    // 获取总条数
    const total = res.data.message.total;
    // 计算总页数
    this.totalPages = Math.ceil(total/this.queryParams.pagesize);
    this.setData({
      // 拼接数组
      // goodsList: res.data.message.goods
      goodsList: [...this.data.goodsList,...res.data.message.goods]
    })
  },

  // 标题点击事件，从子组件传递过来的
  handleTabsItemChange(e) {
    // 获取被点击的标题索引
    const {index} = e.detail;
    // 修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    // 赋值到data中
    this.setData({
      tabs
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
     // 重置数组
     this.setData({
       goodsList: []
     })
     // 重置页码
     this.queryParams.pagenum = 1;
     // 发送请求
     this.getGoodsList();
     // 关闭下拉刷新窗口,放在getGoodsList()中也可以
     wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断还有没有下一页数据
    if (this.queryParams.pagenum >= this.totalPages) {
      // 没有下一页
      wx.showToast({
        title: '没有下一页数据'
      })
    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})