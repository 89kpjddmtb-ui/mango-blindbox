/**payment.js**/
const app = getApp()

Page({
  data: {
    gift: {},
    selectedMethod: 'wechat',
    processing: false,
    showSuccess: false,
    totalPrice: 0,
    orderId: ''
  },

  onLoad() {
    const gift = app.globalData.selectedGift
    
    if (!gift) {
      wx.showToast({
        title: '请先选择礼物',
        icon: 'none',
        complete: () => {
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/blindbox/blindbox' })
          }, 1500)
        }
      })
      return
    }
    
    const totalPrice = (gift.price + 1).toFixed(2)
    
    this.setData({
      gift,
      totalPrice
    })
  },

  selectMethod(e) {
    const method = e.currentTarget.dataset.method
    this.setData({ selectedMethod: method })
  },

  async processPayment() {
    if (this.data.processing) return
    
    this.setData({ processing: true })
    
    try {
      // 调用后端创建订单
      const result = await this.createOrder()
      
      if (result.success) {
        // 模拟支付成功
        await this.mockPayment()
        
        this.setData({
          showSuccess: true,
          orderId: result.data.orderId,
          processing: false
        })
        
        // 保存订单信息到全局
        app.globalData.currentOrder = result.data
        
        // 震动反馈
        if (wx.vibrateLong) {
          wx.vibrateLong()
        }
      } else {
        throw new Error(result.error || '支付失败')
      }
    } catch (error) {
      console.error('支付失败:', error)
      wx.showToast({
        title: error.message || '支付失败，请重试',
        icon: 'none'
      })
      this.setData({ processing: false })
    }
  },

  createOrder() {
    return new Promise((resolve, reject) => {
      const recommendation = app.globalData.currentRecommendation
      const gift = app.globalData.selectedGift
      
      wx.request({
        url: `${app.globalData.apiBaseUrl}/api/order`,
        method: 'POST',
        data: {
          recommendationId: recommendation.recommendationId,
          selectedGiftId: gift.id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(new Error(`HTTP ${res.statusCode}`))
          }
        },
        fail: reject
      })
    })
  },

  mockPayment() {
    return new Promise((resolve) => {
      // 模拟支付过程
      setTimeout(() => {
        resolve()
      }, 1500)
    })
  },

  viewOrder() {
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },

  goBack() {
    wx.navigateBack()
  }
})