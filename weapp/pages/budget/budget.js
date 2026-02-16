/**budget.js**/
const app = getApp()

Page({
  data: {
    message: '',
    selectedBudget: null,
    loading: false,
    budgetOptions: [
      { value: 30, label: '精致小物', tag: '暖心' },
      { value: 50, label: '品质之选', tag: '热门' },
      { value: 100, label: '心意满满', tag: '推荐' },
      { value: 200, label: '特别惊喜', tag: '精选' },
      { value: 500, label: '豪华礼物', tag: '奢华' },
      { value: 1000, label: '至尊之选', tag: '限量' }
    ]
  },

  onLoad() {
    // 从全局获取寄语
    const message = app.globalData.message || ''
    this.setData({ message })
    
    if (!message) {
      wx.showToast({
        title: '请先填写寄语',
        icon: 'none',
        complete: () => {
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/message/message' })
          }, 1500)
        }
      })
    }
  },

  selectBudget(e) {
    const value = e.currentTarget.dataset.value
    this.setData({ selectedBudget: value })
  },

  async nextStep() {
    if (!this.data.selectedBudget) {
      wx.showToast({
        title: '请选择预算',
        icon: 'none'
      })
      return
    }

    this.setData({ loading: true })

    try {
      // 调用后端API获取推荐
      const res = await this.requestRecommendation()
      
      if (res.success) {
        // 保存到全局
        app.globalData.currentRecommendation = res.data
        app.globalData.selectedBudget = this.data.selectedBudget
        
        wx.navigateTo({
          url: '/pages/blindbox/blindbox'
        })
      } else {
        throw new Error(res.error || '获取推荐失败')
      }
    } catch (error) {
      console.error('获取推荐失败:', error)
      wx.showToast({
        title: error.message || '网络错误，请重试',
        icon: 'none',
        duration: 2000
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  requestRecommendation() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.apiBaseUrl}/api/recommend`,
        method: 'POST',
        data: {
          message: this.data.message,
          budget: this.data.selectedBudget
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
  }
})
