/**
 * promise形式的getSetting
 * @returns 
 */
export const getSetting =() =>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            reject(res);
          }
        })
    })
}

/**
 * promise形式的chooseAddress
 * @returns 
 */
 export const chooseAddress =() =>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            reject(res);
          }
        })
    })
}

/**
 * promise形式的openSetting
 * @returns 
 */
 export const openSetting =() =>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            reject(res);
          }
        })
    })
}