const crypto = require('crypto');
const axios = require('axios');

// 京东联盟 API 配置
const JD_CONFIG = {
  appKey: process.env.JD_UNION_APP_KEY || '9f9b46ea14407e981732d846959610dc',
  appSecret: process.env.JD_UNION_SECRET_KEY || '2637eab8e68047279662ce3940d9ecb9',
  apiUrl: 'https://router.jd.com/api',  // 改成router.jd.com
  version: '1.0'
};

/**
 * 生成京东联盟 API 签名
 * 规则：md5(appSecret + key1value1 + key2value2 + ... + appSecret).toUpperCase()
 * 注意：参数值需要URL解码后再参与签名
 */
function generateSign(params, appSecret) {
  // 1. 过滤空值和sign参数，按key排序
  const sortedKeys = Object.keys(params)
    .filter(key => key !== 'sign' && params[key] !== undefined && params[key] !== '')
    .sort();
  
  // 2. 拼接字符串
  let signStr = appSecret;
  for (const key of sortedKeys) {
    signStr += key + params[key];
  }
  signStr += appSecret;
  
  // 3. MD5加密并转大写
  return crypto.createHash('md5').update(signStr).digest('hex').toUpperCase();
}

/**
 * 获取北京时间戳
 * 京东要求格式：YYYY-MM-DD HH:mm:ss （不能有Z）
 */
function getBeijingTimestamp() {
  const now = new Date();
  // 注意：不能使用 toISOString()，因为会带Z且是UTC时间
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 调用京东联盟 API
 * @param {string} method API 方法名
 * @param {Object} params 业务参数
 * @returns {Promise<Object>} API 响应
 */
async function callJDApi(method, params = {}) {
  const timestamp = getBeijingTimestamp();
  
  const commonParams = {
    app_key: JD_CONFIG.appKey,
    method: method,
    timestamp: timestamp,
    v: JD_CONFIG.version,
    sign_method: 'md5',
    format: 'json',
    ...params
  };
  
  // 生成签名
  commonParams.sign = generateSign(commonParams, JD_CONFIG.appSecret);
  
  try {
    const response = await axios.post(JD_CONFIG.apiUrl, null, {
      params: commonParams,
      timeout: 10000
    });
    
    return response.data;
  } catch (error) {
    console.error('京东API调用失败:', error.message);
    throw error;
  }
}

/**
 * 查询商品详情（通过SKU）
 * @param {string} skuIds 商品SKU，多个用逗号分隔
 * @returns {Promise<Array>} 商品列表
 */
async function queryGoodsBySku(skuIds) {
  const result = await callJDApi('jd.union.open.goods.query', {
    goodsReq: JSON.stringify({
      skuIds: skuIds
    })
  });
  
  if (result.error_response) {
    throw new Error(result.error_response.zh_desc || 'API调用失败');
  }
  
  return result.jd_union_open_goods_query_response?.data || [];
}

/**
 * 生成推广链接
 * @param {string} materialId 推广物料URL（商品链接）
 * @param {string} siteId 推广位ID
 * @returns {Promise<string>} 推广链接
 */
async function generatePromotionLink(materialId, siteId = '4103347364') {
  const result = await callJDApi('jd.union.open.promotion.common.get', {
    promotionCodeReq: JSON.stringify({
      materialId: materialId,
      siteId: siteId,
      // 可选参数
      // couponUrl: '', // 优惠券链接
      // ext1: '', // 扩展字段
    })
  });
  
  if (result.error_response) {
    throw new Error(result.error_response.zh_desc || '生成链接失败');
  }
  
  const link = result.jd_union_open_promotion_common_get_response?.data?.clickURL;
  return link;
}

/**
 * 搜索商品
 * @param {string} keyword 关键词
 * @param {number} pageIndex 页码
 * @param {number} pageSize 每页数量
 * @returns {Promise<Array>} 商品列表
 */
async function searchGoods(keyword, pageIndex = 1, pageSize = 20) {
  const result = await callJDApi('jd.union.open.goods.query', {
    goodsReq: JSON.stringify({
      keyword: keyword,
      pageIndex: pageIndex,
      pageSize: pageSize,
      // 筛选条件
      sortName: 'commissionShare', // 按佣金比例排序
      sort: 'desc',
      isCoupon: 0 // 不限制优惠券
    })
  });
  
  if (result.error_response) {
    throw new Error(result.error_response.zh_desc || '搜索失败');
  }
  
  return result.jd_union_open_goods_query_response?.data?.list || [];
}

/**
 * 根据关键词生成推广链接（简化版）
 * 先搜索商品，再生成推广链接
 * @param {string} keyword 关键词
 * @returns {Promise<Object>} 推广链接和商品信息
 */
async function getPromotionLinkByKeyword(keyword) {
  try {
    // 1. 搜索商品
    const goodsList = await searchGoods(keyword, 1, 5);
    
    if (!goodsList || goodsList.length === 0) {
      return {
        success: false,
        error: '未找到相关商品'
      };
    }
    
    // 2. 选择第一个符合条件的商品
    const goods = goodsList[0];
    
    // 3. 生成推广链接
    const materialId = goods.materialUrl || `https://item.jd.com/${goods.skuId}.html`;
    const promotionLink = await generatePromotionLink(materialId);
    
    return {
      success: true,
      data: {
        url: promotionLink,
        goods: {
          skuId: goods.skuId,
          skuName: goods.skuName,
          price: goods.priceInfo?.price,
          commission: goods.commissionInfo?.commission,
          commissionRate: goods.commissionInfo?.commissionShare,
          imgUrl: goods.imageInfo?.imageList?.[0]?.url
        }
      }
    };
    
  } catch (error) {
    console.error('生成推广链接失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  generateSign,
  callJDApi,
  queryGoodsBySku,
  generatePromotionLink,
  searchGoods,
  getPromotionLinkByKeyword,
  JD_CONFIG
};