/**index.js**/
const app = getApp()

Page({
  data: {
    userInfo: null
  },

  onLoad() {
    console.log('首页加载')
  },

  startBlindBox() {
    wx.navigateTo({
      url: '/pages/message/message'
    })
  }
})
