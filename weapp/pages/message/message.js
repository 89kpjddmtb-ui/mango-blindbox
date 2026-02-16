/**message.js**/
const app = getApp()

Page({
  data: {
    message: '',
    examples: [
      '我就是超人，为自己加油',
      '送给最温暖的你',
      '谢谢你一直以来的陪伴',
      '愿你每天都被可爱包围',
      '给勇敢追梦的你'
    ]
  },

  onInput(e) {
    this.setData({
      message: e.detail.value
    })
  },

  selectExample(e) {
    const text = e.currentTarget.dataset.text
    this.setData({
      message: text
    })
  },

  nextStep() {
    if (!this.data.message.trim()) {
      wx.showToast({
        title: '请先写下寄语',
        icon: 'none'
      })
      return
    }
    
    // 保存到全局
    app.globalData.message = this.data.message.trim()
    
    wx.navigateTo({
      url: '/pages/budget/budget'
    })
  }
})
