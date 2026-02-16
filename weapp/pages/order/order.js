/**order.js**/
const app = getApp()

Page({
  data: {
    order: {
      id: '',
      status: 'paid',
      gift: {},
      logistics: null
    },
    logisticsStatusText: '准备发货'
  },

  onLoad() {
    const order = app.globalData.currentOrder
    
    if (!order) {
      wx.showToast({
        title: '暂无订单信息',
        icon: 'none'
      })
      return
    }
    
    // 获取物流状态文本
    const logisticsStatusText = this.getLogisticsStatusText(order.logistics?.status)
    
    this.setData({
      order,
      logisticsStatusText
    })
    
    // 刷新订单详情
    this.refreshOrderDetail()
  },

  onShow() {
    // 每次显示页面时刷新订单状态
    if (this.data.order.id) {
      this.refreshOrderDetail()
    }
  },

  async refreshOrderDetail() {
    try {
      const res = await this.getOrderDetail(this.data.order.id)
      
      if (res.success) {
        const logisticsStatusText = this.getLogisticsStatusText(res.data.logistics?.status)
        
        this.setData({
          order: res.data,
          logisticsStatusText
        })
        
        // 更新全局
        app.globalData.currentOrder = res.data
      }
    } catch (error) {
      console.error('刷新订单失败:', error)
    }
  },

  getOrderDetail(orderId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.apiBaseUrl}/api/order/${orderId}`,
        method: 'GET',
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

  getLogisticsStatusText(status) {
    const statusMap = {
      'pending': '准备发货',
      'shipped': '已发货',
      'delivered': '已送达'
    }
    return statusMap[status] || '准备发货'
  },

  formatDate(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  },

  copyOrderId() {
    wx.setClipboardData({
      data: this.data.order.id,
      success: () => {
        wx.showToast({
          title: '订单号已复制',
          icon: 'success'
        })
      }
    })
  },

  copyTrackingNo() {
    if (!this.data.order.logistics?.trackingNo) return
    
    wx.setClipboardData({
      data: this.data.order.logistics.trackingNo,
      success: () => {
        wx.showToast({
          title: '运单号已复制',
          icon: 'success'
        })
      }
    })
  },

  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  shareOrder() {
    // 分享给朋友
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    return {
      title: `我在芒果精灵盲盒抽到了${this.data.order.gift.name}！`,
      desc: '写下寄语，让AI为你挑选心意礼物',
      path: '/pages/index/index'
    }
  }
})