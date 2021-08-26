// pages/goods_detail/index.js
/**
 * 点击轮播图 预览大图
 *    1 给轮播图绑定点击事件
 *    2 调用小程序的api previewImage
 * 底部工具栏
 *    客服
 *    分享
 *    购物车
 *    加入购物车
 *      绑定点击事件
 *      获取缓存中的购物车数据（数组格式）
 *      先判断当前是否已经存在购物车
 *        已经存在，修改商品数据，购物车商品数量++
 *          重新把购物车数组填充到缓存中
 *        不存在购物车里面，直接购物车数组添加新元素，带上购买数量熟悉num
 *          重新把购物车数组填充到缓存中
 *      弹出提示
 *    立即购买 
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
  },
  /**
   * 加入购物车
   */
  handleCartAdd(e) {
    // 1 获取缓存中的购物车数组
    let cart = wx.getStorageSync('cart')||[]; // 第一次获取是空字符串，转换成数组
    // 2 判断商品对象是否存在购物车数组中
    let index = cart.findIndex(v => v.goods_id===this.goodsInfo.goods_id);
    if (index === -1) {
      // 3 不存在，第一次添加
      this.goodsInfo.num = 1;
      cart.push(this.goodsInfo);
    } else {
      // 4 已经存在购物车数据，执行num++
      cart[index].num++; 
    }
    // 5 把购物车数据重新添加回缓存中
    wx.setStorageSync('cart', cart);
    // 6 弹出提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true // 防止用户疯狂点击按钮，事件持续1.5s
    });
  }

})