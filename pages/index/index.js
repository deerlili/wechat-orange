// 0 引入用来发送请求发方法
import { request } from "../../request/index.js"

Page({
  data: {
    // 轮播图
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },

  // 页面开始加载就会触发
  onLoad() {
    // 1 发送异步请求 
    // 优化的手段可以通过es6的promise来解决(问题：异步地域,请求成功或者失败后请求其他接口,里面再请求其他接口,那么整个代码很复杂
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res) => {
    //     console.log(res.data)
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // })
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
    
  },

  // 获取轮播图数据
  getSwiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  },
  // 获取导航数组
  getCatesList(){
    request({url:"/home/catitems"})
    .then(res=>{
      this.setData({
        catesList:res.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(res=>{
      this.setData({
        floorList:res.data.message
      })
    })
  }

})
