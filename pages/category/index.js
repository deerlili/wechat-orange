// pages/category/index.js
import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContentList: []
  },
  // 接口返回数据
  categoryList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList();
  },

  // 获取 分类数据
  getCategoryList(){
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
    .then(res=>{   
      this.categoryList = res.data.message;
      // 构造 左侧菜单数据
      let leftMenuList = this.categoryList.map(v => v.cat_name);
      // 构造 右侧商品数据
      let rightContentList = this.categoryList[0].children;
      this.setData(
        leftMenuList,
        rightContentList
      )
    })
  }
})