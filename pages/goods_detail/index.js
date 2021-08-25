// pages/goods_detail/index.js
/**
 * 点击轮播图 预览大图
 *    1 给轮播图绑定点击事件
 *    2 调用小程序的api previewImage  
 */
import { request } from "../../request/index.js"
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  /**
   * 商品对象
   */
  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },

  // 获取数据
  async getGoodsDetail(goods_id) {
    const res = await request({url:"/goods/detail",data:{goods_id}});
    let goodsObj = res.data.message;
    this.goodsInfo = goodsObj;
    this.setData({
      // goodsObj: res.data.message
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机不能识别webp图片格式,最好让后台进行修改
        // 临时改 1.webp 改为 1.jpg goods_introduce..replace(/\.webp/g,'.jpg')
        goods_introduce: goodsObj.goods_introduce,
        pics: goodsObj.pics
      }
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

  /**
   * 点击轮播图放大预览
   */
  handlePreviewImage(e) {
    // 1 构造需要预览的图片数组
    const urls = this.goodsInfo.pics.map(v => v.pics_mid);
    // 2 接收传递过来的url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  }

})