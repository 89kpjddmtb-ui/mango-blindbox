/**blindbox.js**/
const app = getApp()

Page({
  data: {
    gifts: [],
    selectedIndex: null,
    revealed: false
  },

  onLoad() {
    // 从全局获取推荐结果
    const recommendation = app.globalData.currentRecommendation
    
    if (!recommendation || !recommendation.gifts) {
      wx.showToast({
        title: '请先选择预算',
        icon: 'none',
        complete: () => {
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/budget/budget' })
          }, 1500)
        }
      })
      return
    }
    
    this.setData({
      gifts: recommendation.gifts
    })
  },

  selectBlindbox(e) {
    if (this.data.revealed) return
    
    const index = e.currentTarget.dataset.index
    this.setData({ selectedIndex: index })
    
    // 添加震动反馈
    if (wx.vibrateShort) {
      wx.vibrateShort({ type: 'light' })
    }
  },

  revealGift() {
    if (this.data.selectedIndex === null) return
    
    // 添加震动反馈
    if (wx.vibrateLong) {
      wx.vibrateLong()
    }
    
    this.setData({ revealed: true })
    
    // 保存选中的礼物
    const selectedGift = this.data.gifts[this.data.selectedIndex]
    app.globalData.selectedGift = selectedGift
    
    // 播放音效（如果有）
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.src = '/audio/reveal.mp3'
    // innerAudioContext.play()
  },

  resetSelection() {
    this.setData({
      selectedIndex: null,
      revealed: false
    })
    app.globalData.selectedGift = null
  },

  goToPayment() {
    wx.navigateTo({
      url: '/pages/payment/payment'
    })
  }
})
