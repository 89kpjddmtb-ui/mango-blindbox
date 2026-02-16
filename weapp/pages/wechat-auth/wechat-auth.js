/**wechat-auth.js**/
const app = getApp()

Page({
  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      // 用户同意授权
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.isLoggedIn = true
      
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        complete: () => {
          setTimeout(() => {
            wx.switchTab({ url: '/pages/index/index' })
          }, 1000)
        }
      })
    } else {
      // 用户拒绝授权
      wx.showToast({
        title: '需要授权才能使用',
        icon: 'none'
      })
    }
  },

  cancelAuth() {
    wx.navigateBack()
  }
})