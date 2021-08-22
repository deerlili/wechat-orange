// 同时发送异步代码次数
let ajaxTimes = 0;
export const request=(params)=>{
    ajaxTimes++;
    // 显示加载中
    wx.showLoading({
        title: '加载中',
        mask: true
      })
    // 定义公共url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(res)=>{
                resolve(res)
                // resolve(res.data.message)
            },
            fail:(err)=>{
                reject(err)
            },
            complete:()=>{
                // 多次请求，最后一次关闭等待图标
                ajaxTimes--;
                if(ajaxTimes===0) {
                    // 关闭正在对等待的图标
                    wx.hideLoading();
                }           
            }
        })
    })
}