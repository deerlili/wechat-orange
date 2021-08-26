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
 *          让用户自己打开授权设置页面，重新给与地址权限，获取地址
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  // }

  // 老本版
  handleChooseAddress () {
      
  }

})