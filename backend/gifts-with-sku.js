// 礼物数据库 - 带京东 SKU
// 每个礼物对应一个京东商品，点击时生成推广链接
// 自动生成时间: 2026-02-22 21:37:49

const giftDatabase = {
  tech: [
    {
      name: '珀芙研舒缓修护补水保湿等渗 敏感肌改善泛...',
      desc: '精选好物，189.0元价位，佣金15.0%',
      emoji: '🔊',
      price: 189,
      keyword: '珀芙研舒缓修护补水保',
      jdSku: 'qu2SxeRbqrFXeNK1S7HrzvP0_3sdbAB0YmqekgZZjte',
      jdPrice: 189,
      commissionRate: 15
    },
    {
      name: '超能泡洗粉去黄增白爆炸盐活氧&复合酶技术...',
      desc: '精选好物，69.0元价位，佣金35.0%',
      emoji: '🔊',
      price: 69,
      keyword: '超能泡洗粉去黄增白爆',
      jdSku: 'wiGHlsPs4exhX909BXRXFeHJ_3as8HwTNt4lo9Erduf',
      jdPrice: 69,
      commissionRate: 35
    },
    {
      name: '漫花山茶花400张大包纸巾抽纸家用面巾纸...',
      desc: '精选好物，31.9元价位，佣金27.0%',
      emoji: '🔊',
      price: 31,
      keyword: '漫花山茶花400张大',
      jdSku: 'iwUlKesANSJnaoa3WnlDBkOT_3df4Tumn1NtFlPzjKg',
      jdPrice: 31,
      commissionRate: 27
    },
    {
      name: 'HERM'S三代山形刷头吸盘刷柄牙刷齿软...',
      desc: '精选好物，36.9元价位，佣金30.0%',
      emoji: '🔊',
      price: 36,
      keyword: 'HERM'S三代山形',
      jdSku: 'lx3PK9nVRXpoTkqIWW46iCai_3m8L815dnRLi2XcmHy',
      jdPrice: 36,
      commissionRate: 30
    },
    {
      name: '珀芙研舒缓保湿修护霜敏感肌保湿滋润次抛精...',
      desc: '精选好物，89.9元价位，佣金15.0%',
      emoji: '🔊',
      price: 89,
      keyword: '珀芙研舒缓保湿修护霜',
      jdSku: '82IGIHaWmYDYD646s2KhAIGz_3klNf8XuMm0axA0Sp9',
      jdPrice: 89,
      commissionRate: 15
    },
    {
      name: '小熊驾到速食意大利面  番茄肉酱意面方便...',
      desc: '精选好物，36.8元价位，佣金20.0%',
      emoji: '🔊',
      price: 36,
      keyword: '小熊驾到速食意大利面',
      jdSku: 'JSbyCrzbZnDXuNdWjJ9fLdM7_cIOfgHrs8Ioh2GScsS',
      jdPrice: 36,
      commissionRate: 20
    },
    {
      name: '钙尔奇金钙尔奇中老年成人补钙维d3片 补...',
      desc: '精选好物，160.0元价位，佣金15.0%',
      emoji: '🔊',
      price: 160,
      keyword: '钙尔奇金钙尔奇中老年',
      jdSku: 'teKraJm7IckBTdx3CMj7iOKH_3hj3LwRzbI8GZaXKKE',
      jdPrice: 160,
      commissionRate: 15
    },
    {
      name: '冷酸灵泵式直立式海洋薄荷香型美白牙齿国货...',
      desc: '精选好物，44.9元价位，佣金20.0%',
      emoji: '🔊',
      price: 44,
      keyword: '冷酸灵泵式直立式海洋',
      jdSku: 'KXejWC2cMv6ZvBIcAHNM9fP8_3KLpBNaQ0Mb2rhtC7y',
      jdPrice: 44,
      commissionRate: 20
    },
    {
      name: '悦哺婴儿润肤乳宝宝保湿身体乳儿童滋润补水...',
      desc: '精选好物，79.0元价位，佣金18.0%',
      emoji: '🔊',
      price: 79,
      keyword: '悦哺婴儿润肤乳宝宝保',
      jdSku: 'lx3PK9nVRXpoTkBllW46ieuD_3m8L815dnRLh9Ne5ny',
      jdPrice: 79,
      commissionRate: 18
    },
    {
      name: '悦哺儿童面霜婴儿滋润保湿润肤霜 宝宝干燥...',
      desc: '精选好物，138.0元价位，佣金18.0%',
      emoji: '🔊',
      price: 138,
      keyword: '悦哺儿童面霜婴儿滋润',
      jdSku: 'xlf4Wy4NtouvHKme8U6vdanq_364ty2PVEtYZ1xpH0T',
      jdPrice: 138,
      commissionRate: 18
    },
  ],

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
