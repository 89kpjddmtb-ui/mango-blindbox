// 礼物数据库 - 带京东 SKU
// 每个礼物对应一个京东商品，点击时生成推广链接

const giftDatabase = {
  hero: [
    {
      name: '漫威钢铁侠手办',
      desc: '正版授权，精致收藏级手办，漫威迷必备',
      emoji: '🦸',
      price: 45,
      keyword: '英雄守护',
      // 京东商品信息
      jdSku: '100012043978',  // 示例SKU，需要替换为真实商品
      jdPrice: 45,
      commissionRate: 10  // 佣金比例 %
    },
    {
      name: '超人披风毛毯',
      desc: '柔软舒适法兰绒，盖上变身超级英雄',
      emoji: '🦸‍♂️',
      price: 38,
      keyword: '超人力量',
      jdSku: '100008348542',
      jdPrice: 38,
      commissionRate: 12
    },
    {
      name: '英雄主题马克杯',
      desc: '每天一杯，充满力量，办公室必备',
      emoji: '☕',
      price: 28,
      keyword: '英雄日常',
      jdSku: '100023456789',
      jdPrice: 28,
      commissionRate: 15
    }
  ],
  warm: [
    {
      name: '星空投影灯',
      desc: '浪漫星空氛围灯，卧室必备，送礼神器',
      emoji: '✨',
      price: 35,
      keyword: '星光守护',
      jdSku: '100014785236',
      jdPrice: 35,
      commissionRate: 15
    },
    {
      name: '香薰蜡烛套装',
      desc: '天然大豆蜡，舒缓身心，浪漫气息',
      emoji: '🕯️',
      price: 32,
      keyword: '香氛浪漫',
      jdSku: '100018965472',
      jdPrice: 32,
      commissionRate: 12
    },
    {
      name: '暖手宝充电宝二合一',
      desc: '冬日温暖握在手心，还能给手机充电',
      emoji: '🔥',
      price: 33,
      keyword: '温暖守护',
      jdSku: '100021547896',
      jdPrice: 33,
      commissionRate: 10
    }
  ],
  cute: [
    {
      name: '芒果精灵玩偶',
      desc: '超萌芒果造型，治愈系伙伴，女生最爱',
      emoji: '🥭',
      price: 36,
      keyword: '萌力全开',
      jdSku: '100025896347',
      jdPrice: 36,
      commissionRate: 15
    },
    {
      name: '毛绒钥匙扣',
      desc: '软萌挂件，随身携带，每天好心情',
      emoji: '🧸',
      price: 16,
      keyword: '萌趣随行',
      jdSku: '100028741596',
      jdPrice: 16,
      commissionRate: 20
    },
    {
      name: '卡通发夹套装',
      desc: '可爱造型，少女心爆棚，多种款式',
      emoji: '🎀',
      price: 15,
      keyword: '甜美可爱',
      jdSku: '100031254789',
      jdPrice: 15,
      commissionRate: 18
    }
  ],
  tech: [
    {
      name: '迷你蓝牙音箱',
      desc: '小巧便携，音质出色，桌面好物',
      emoji: '🔊',
      price: 49,
      keyword: '声动人心',
      jdSku: '100034567891',
      jdPrice: 49,
      commissionRate: 10
    },
    {
      name: '创意手机支架',
      desc: '懒人神器，追剧必备，多档调节',
      emoji: '📱',
      price: 18,
      keyword: '解放双手',
      jdSku: '100037894561',
      jdPrice: 18,
      commissionRate: 15
    },
    {
      name: 'LED小夜灯',
      desc: '智能感应，温馨守护，夜间好伴侣',
      emoji: '💡',
      price: 28,
      keyword: '温暖微光',
      jdSku: '100041237856',
      jdPrice: 28,
      commissionRate: 12
    }
  ],
  warm: [
    {
      name: '暖手宝',
      desc: '冬日温暖，握在手心',
      emoji: '🔥',
      price: 33,
      keyword: '温暖守护',
      jdSku: '100021547896',
      jdPrice: 33,
      commissionRate: 10
    },
    {
      name: '羊绒围巾',
      desc: '柔软亲肤，温暖如春',
      emoji: '🧣',
      price: 46,
      keyword: '温暖围绕',
      jdSku: '100044569823',
      jdPrice: 46,
      commissionRate: 8
    },
    {
      name: '保温杯',
      desc: '恒温守护，贴心陪伴',
      emoji: '🥤',
      price: 39,
      keyword: '暖心温度',
      jdSku: '100047896321',
      jdPrice: 39,
      commissionRate: 12
    }
  ]
};

module.exports = giftDatabase;

/**
 * 获取礼物推广链接
 * @param {string} sku 商品SKU
 * @param {string} siteId 推广位ID
 * @returns {string} 推广链接
 */
function getJdPromotionUrl(sku, siteId = '4103347364') {
  // 构造京东商品链接
  const materialUrl = `https://item.jd.com/${sku}.html`;
  
  // 返回商品链接（后续接入联盟API生成真实推广链接）
  // 目前先用商品详情页，佣金通过联盟后台的「订单效果查询」追踪
  return materialUrl;
}

module.exports.getJdPromotionUrl = getJdPromotionUrl;