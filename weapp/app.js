App({
  globalData: {
    userInfo: null,
    apiBaseUrl: 'http://localhost:3000',
    currentRecommendation: null,
    selectedGift: null,
    currentOrder: null
  },

  onLaunch() {
    // 初始化本地存储
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    console.log('🥭 芒果精灵盲盒小程序启动')
  }
})
