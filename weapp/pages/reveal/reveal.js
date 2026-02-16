/**reveal.js**/
const app = getApp()

Page({
  data: {
    gift: {},
    message: '',
    keyword: ''
  },

  onLoad() {
    const gift = app.globalData.selectedGift
    const message = app.globalData.message
    const recommendation = app.globalData.currentRecommendation
    
    if (!gift) {
      wx.showToast({
        title: '请先选择礼物',
        icon: 'none',
        complete: () =>> {
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/blindbox/blindbox' })
          }, 1500)
        }
      })
      return
    }
    
    this.setData({
      gift,
      message,
      keyword: gift.keyword || '惊喜'
    })
  },

  goToPayment() {
    wx.navigateTo({
      url: '/pages/payment/payment'
    })
  },

  goBack() {
    wx.navigateBack()
  }
})