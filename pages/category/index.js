// pages/category/index.js
import { request } from "../../request/index.js"
import  regeneratorRuntime  from "../../lib/runtime/runtime.js"

Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧滚动条距离顶部的距离
    scrollTop: 0
  },
  // 接口返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // this.getCates();

    /**
     * 0.web中的本地存储和小程序中的本地存储的区别
     *    web: localStorage.setItem("key","value")
     *         localStorage.getItem("key")
     *         会调用toString变成字符串存入
     *    小程序：wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
     *           wx.getStorageSync('cates')
     *           存什么类型，取就是什么类型
     * 1.先判断本地缓存中是否有旧数据
     *    存一个对象：{time:Date.now(),data:[...]}
     * 2.没有，发送新清酒
     * 3.有，同时旧的数据没有过期，旧使用本地存储中的旧数据即可
     */
    // 1.获取本地存储中的数据(小程序也存在本地存储)
    const Cates = wx.getStorageSync('cates');
    // 2.判断
    if(!Cates){
      // 不存在，发送请求
      this.getCates();
    }else{
      // 有旧数据，定义过期时间 10s 改为 5分钟
      if(Date.now()-Cates.time>600000){
        // 重新发送请求
        this.getCates();
      }else{
        // 使用旧数据
        this.Cates = Cates.data
        // 构造 左侧菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造 右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 同步
  async getCates(){
    // 1.使用es7的async await来发送异步请求
    const res = await request({url: '/categories'})
    this.Cates = res.data.message;
    // 把接口的数据存入到本地存储中
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    // 构造 左侧菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 构造 右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  // 获取 分类数据
  // getCates(){
  //   request({url: '/categories'})
  //   .then(res=>{   
  //     this.Cates = res.data.message;
  //     // 把接口的数据存入到本地存储中
  //     wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
  //     // 构造 左侧菜单数据
  //     let leftMenuList = this.Cates.map(v => v.cat_name);
  //     // 构造 右侧商品数据
  //     let rightContent = this.Cates[0].children;
  //     this.setData({
  //       leftMenuList,
  //       rightContent
  //     })
  //   })
  // },

  // 左侧菜单点击事件
  handleItemTap(e){
    // console.log(e)
    /**
     * 获取被点击的标题的索引
     * 给data中currentIndex赋值
     * 修改点击后颜色改变
     */
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index, // 修改点击后颜色改变
      rightContent,   // 点击后的内容
      scrollTop:0// 重新设置右侧scrollTop的距离

    })
    
    
  }
})


// 测试