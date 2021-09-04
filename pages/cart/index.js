/**
 * 1 获取用户的收货地址
 *      1 绑定点击事件
 *      2 调用小程序内置api,获取用户的收货地址,wx.chooseAddress
 * 
 *      // 新版本微信可能不需要
 *      2 获取用户对小程序所授予获取地址的权限状态 scope
 *        1 假设用户点击获取收货地址提示框 确定 authSetting scope.address
 *          scope值为true 直接调用获取收货地址
 *        2 假设用户从来没有调过获取收货地址的api
 *          scope值为undefined 直接调用获取收货地址
 *        3 假设用户点击获取收货地址提示框 取消
 *          scope值为false
 *          让用户自己打开授权设置页面,重新给与地址权限,获取地址 wx.openSetting
 *        4 把获取到的地址放入缓存中
 * 2 页面加载完毕
 *    0 onLoad onShow-由于购物车页面频繁的被打开和隐藏，每次打开都从新做一个初始化
 *    1 获取本地存储中的地址数据
 *    2 把数据设置给data中的一个变量
 * 3 onShow
 *    0 回到了商品详情页第一次添加商品的时候添加属性
 *      1 num = 1;
 *      2 checked = true;
 *    1 获取缓存中的购物车数组
 *    2 把购物车数据填充到data中
 * 4 全选的实现 数据展示
 *    1 onShow 里面获取缓存中的购物车数组
 *    2 购物车中的商品数据 所有商品都被选中 checked = true 全选就被选中
*/

import { getSetting,chooseAddress,openSetting } from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({

  data: {
    address: {},
    cart: [],
    allChecked: true,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1 获取本地存储中的地址数据
    const address = wx.getStorageSync('address');
    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    // 1 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart')||[];
    // 2 给data赋值
    this.setData({
      address,
      cart
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  // 新版本
  // handleChooseAddress () {
  //   // 获取收货地址
  //   wx.chooseAddress({
  //     success: (result) => {
  //       console.log(result)
  //     }
  //   });
  // },

  // handleChooseAddress () {
  //    // 1.获取权限状态
  //    wx.getSetting({
  //      complete: (result1) => {
  //        // 2.获取权限状态,只要发现属性名很怪异,都要用[]来获取
  //        const scopeAddress = result1.authSetting["scope.address"];
  //        if (scopeAddress === true || scopeAddress===undefined) {
  //          wx.chooseAddress({
  //            complete: (res1) => {
  //             console.log(res1);
  //            }
  //          })
  //        } else {
  //         // 3.用户曾经拒绝过授予权限,诱导用户打开
  //         wx.openSetting({
  //           complete: (result2) => {
  //             // 4.调用收获地址代码
  //             wx.chooseAddress({
  //               complete: (res2) => {
  //                console.log(res2);
  //               }
  //             })
  //           }
  //         })
  //        }
  //      }
  //    })
  // }
  
  async handleChooseAddress () {
    try {
      // 1.获取权限状态
     const res1 = await getSetting();
     // 2.获取权限状态,只要发现属性名很怪异,都要用[]来获取
     const scopeAddress = res1.authSetting["scope.address"];
     if (scopeAddress === false) {
        // 3.用户曾经拒绝过授予权限,诱导用户打开
        await openSetting();
     }
     // 4.调用收获地址代码
     const address = await chooseAddress();
     // 5.数据存入缓存中
     wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error)
    }
  }

})