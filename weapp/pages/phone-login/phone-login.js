/**phone-login.js**/
const app = getApp()

Page({
  data: {
    phone: '',
    code: '',
    countdown: 0,
    isPhoneValid: false,
    isCodeValid: false,
    loading: false,
    agreed: true
  },

  onPhoneInput(e) {
    const phone = e.detail.value
    const isPhoneValid = /^1[3-9]\d{9}$/.test(phone)
    this.setData({ phone, isPhoneValid })
  },

  onCodeInput(e) {
    const code = e.detail.value
    const isCodeValid = code.length === 6
    this.setData({ code, isCodeValid })
  },

  getCode() {
    if (!this.data.isPhoneValid || this.data.countdown > 0) return
    
    // 模拟发送验证码
    wx.showToast({ title: '验证码已发送', icon: 'success' })
    
    // 开始倒计时
    this.setData({ countdown: 60 })
    this.timer = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(this.timer)
        this.setData({ countdown: 0 })
      } else {
        this.setData({ countdown: this.data.countdown - 1 })
      }
    }, 1000)
  },

  toggleAgreement() {
    this.setData({ agreed: !this.data.agreed })
  },

  login() {
    if (!this.data.isPhoneValid || !this.data.isCodeValid) return
    if (!this.data.agreed) {
      wx.showToast({ title: '请先同意协议', icon: 'none' })
      return
    }
    
    this.setData({ loading: true })
    
    // 模拟登录
    setTimeout(() => {
      app.globalData.userInfo = {
        nickName: '用户' + this.data.phone.slice(-4),
        phone: this.data.phone
      }
      app.globalData.isLoggedIn = true
      
      this.setData({ loading: false })
      
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        complete: () => {
          setTimeout(() => {
            wx.switchTab({ url: '/pages/index/index' })
          }, 1000)
        }
      })
    }, 1500)
  },

  goBack() {
    wx.navigateBack()
  },

  onUnload() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
})