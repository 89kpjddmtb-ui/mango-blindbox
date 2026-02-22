const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
// 使用新的商品库 gifts-with-sku.js（包含动漫手办专区）
const giftDatabase = require('./gifts-with-sku');
const { getJdPromotionUrl } = require('./gifts-with-sku');

// 为保持兼容性，创建 promotionLinks 别名
const promotionLinks = giftDatabase;
const getPromotionUrl = getJdPromotionUrl;
const { generatePromotionLink, searchGoods } = require('./jd-union');

const app = express();
const PORT = process.env.PORT || 3000;
// 使用环境变量指定数据目录，Railway 可挂载 Volume 持久化
const DATA_DIR = process.env.DATA_DIR || __dirname;
const DATA_FILE = path.join(DATA_DIR, 'data.json');

// 登录配置 - 从环境变量读取，提供默认值
const ADMIN_USERNAME = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASS || 'mangguojingling2027';
const sessions = new Map(); // 简单的 session 存储

// 内存存储
let analytics = {
  visits: [],        // 访问记录
  messages: [],      // 用户寄语
  selections: [],    // 盲盒选择
  clicks: []         // 购买点击
};

// 数据持久化
async function loadData() {
  try {
    // 首先尝试从历史数据文件恢复
    const historyDataFile = path.join(__dirname, 'history-data.json');
    try {
      const historyData = await fs.readFile(historyDataFile, 'utf8');
      const historyAnalytics = JSON.parse(historyData);
      // 只要有历史数据就恢复到 Volume
      if (historyAnalytics.visits && historyAnalytics.visits.length > 0) {
        analytics = historyAnalytics;
        await fs.writeFile(DATA_FILE, JSON.stringify(analytics, null, 2));
        console.log(`📊 已恢复历史数据: ${analytics.visits.length}条访问记录`);
        return;
      }
    } catch (historyErr) {
      // 历史数据文件不存在，继续正常加载
    }
    
    const data = await fs.readFile(DATA_FILE, 'utf8');
    analytics = JSON.parse(data);
    console.log('📊 数据已加载');
  } catch (err) {
    console.log('📊 新建数据文件');
    await saveData();
  }
}

async function saveData() {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(analytics, null, 2));
  } catch (err) {
    console.error('保存数据失败:', err);
  }
}

// 中间件 - CORS 限制只允许指定域名
const corsOptions = {
  origin: [
    'https://89kpjddmtb-ui.github.io',
    'https://mangguojingling.vercel.app',
    'http://localhost:3000',
    'http://localhost:8080'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 验证登录中间件
function requireAuth(req, res, next) {
  const token = req.headers.authorization || req.query.token;
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ success: false, error: '未登录' });
  }
  next();
}

// 登录 API
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessions.set(token, { username, loginTime: new Date().toISOString() });
    
    // 24小时后自动过期
    setTimeout(() => sessions.delete(token), 24 * 60 * 60 * 1000);
    
    res.json({ success: true, data: { token } });
  } else {
    res.status(401).json({ success: false, error: '用户名或密码错误' });
  }
});

// 登出 API
app.post('/api/admin/logout', (req, res) => {
  const token = req.headers.authorization || req.body.token;
  if (token) sessions.delete(token);
  res.json({ success: true });
});

// 静态文件（管理后台页面需要登录）
app.use('/admin', (req, res, next) => {
  // 如果是 API 请求，需要验证
  if (req.path.startsWith('/api/')) return next();
  
  // 如果是 GET 请求页面，检查是否有 token
  const token = req.query.token;
  if (!token || !sessions.has(token)) {
    // 返回登录页面
    return res.send(loginPageHtml);
  }
  next();
});

// 静态文件服务 - 图片资源
const imagesPath = path.join(__dirname, '../product-images');
app.use('/images', express.static(imagesPath));

// 根路径重定向到 Vercel 前端
app.get('/', (req, res) => {
  res.redirect('https://mangguojingling.vercel.app');
});

// ==================== 京东联盟配置（已移至 jd-union.js）====================

// 获取礼物列表（带推广链接）- 提高hero分类权重
app.get('/api/gifts', (req, res) => {
  const { category, budget } = req.query;
  
  let gifts = [];
  if (category && promotionLinks[category]) {
    gifts = promotionLinks[category];
  } else {
    // 加权随机选择：hero分类权重更高
    // hero (手办/模型): 权重 3
    // tech (车模): 权重 2  
    // cute (萌趣): 权重 1
    // warm (温暖): 权重 1
    const weightedCategories = [
      ...Array(3).fill('hero'),    // 手办/模型 - 高权重
      ...Array(2).fill('tech'),    // 车模 - 中权重
      'cute',                      // 萌趣 - 普通权重
      'warm'                       // 温暖 - 普通权重
    ];
    
    // 随机选择3个分类（可重复，提高hero出现概率）
    const selectedCategories = [];
    for (let i = 0; i < 3; i++) {
      const randomCat = weightedCategories[Math.floor(Math.random() * weightedCategories.length)];
      selectedCategories.push(randomCat);
    }
    
    // 从选中的分类中各取1个商品
    gifts = selectedCategories.map(cat => {
      const catGifts = promotionLinks[cat] || [];
      if (catGifts.length === 0) return null;
      return catGifts[Math.floor(Math.random() * catGifts.length)];
    }).filter(g => g !== null);
    
    // 如果不够3个，从所有商品中补充
    if (gifts.length < 3) {
      const allGifts = Object.values(promotionLinks).flat();
      const shuffled = [...allGifts].sort(() => Math.random() - 0.5);
      while (gifts.length < 3 && shuffled.length > 0) {
        const g = shuffled.pop();
        if (!gifts.includes(g)) {
          gifts.push(g);
        }
      }
    }
  }
  
  // 按预算筛选
  if (budget) {
    gifts = gifts.filter(g => g.price <= parseInt(budget));
  }
  
  // 确保返回3个商品
  const selected = gifts.slice(0, 3);
  
  res.json({
    success: true,
    data: selected.map((g, index) => ({
      id: `gift_${Date.now()}_${index}`,
      name: g.name,
      desc: g.desc,
      price: g.price,
      keyword: g.keyword,
      sku: g.jdSku || g.sku,
      image: g.image,
      emoji: g.emoji,
      boxNum: ['A', 'B', 'C'][index]
    }))
  });
});

// 生成京东推广链接（通过SKU）- 使用京东联盟API实时生成
app.post('/api/jd-link', async (req, res) => {
  try {
    const { sku, name, price } = req.body;
    
    if (!sku) {
      return res.status(400).json({ success: false, error: '缺少商品SKU' });
    }
    
    // 构建商品详情页URL作为物料ID
    const materialId = `https://item.jd.com/${sku}.html`;
    
    // 调用京东联盟API生成实时推广链接
    const promotionUrl = await generatePromotionLink(materialId);
    
    if (promotionUrl) {
      res.json({
        success: true,
        data: {
          url: promotionUrl,
          sku,
          name,
          price,
          isPromotion: true,
          note: '使用京东联盟API实时生成的推广链接'
        }
      });
    } else {
      // API生成失败，使用静态链接兜底
      const staticUrl = getPromotionUrl(sku);
      if (staticUrl) {
        res.json({
          success: true,
          data: {
            url: staticUrl,
            sku,
            name,
            price,
            isPromotion: true,
            note: '使用静态推广链接（API生成失败）'
          }
        });
      } else {
        // 完全找不到，用搜索兜底
        const searchUrl = `https://search.jd.com/Search?keyword=${encodeURIComponent(name || sku)}&enc=utf-8`;
        res.json({
          success: true,
          data: {
            url: searchUrl,
            sku,
            name,
            price,
            isPromotion: false,
            note: '使用搜索链接（商品未配置）'
          }
        });
      }
    }
    
  } catch (error) {
    console.error('生成链接错误:', error);
    // 出错时返回静态链接
    const { sku, name, price } = req.body;
    const staticUrl = getPromotionUrl(sku);
    if (staticUrl) {
      res.json({
        success: true,
        data: {
          url: staticUrl,
          sku,
          name,
          price,
          isPromotion: true,
          note: '使用静态推广链接（API调用异常）'
        }
      });
    } else {
      res.status(500).json({ success: false, error: '生成链接失败' });
    }
  }
});

// ==================== 数据收集 API ====================

// 记录页面访问
app.post('/api/analytics/visit', async (req, res) => {
  const { page, userAgent, referer } = req.body;
  const visit = {
    id: `visit_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    page,
    userAgent: userAgent || req.headers['user-agent'],
    referer: referer || req.headers.referer,
    ip: req.ip,
    timestamp: new Date().toISOString()
  };
  analytics.visits.push(visit);
  await saveData();
  res.json({ success: true });
});

// 记录用户寄语
app.post('/api/analytics/message', async (req, res) => {
  const { message, budget } = req.body;
  const record = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    message,
    budget,
    timestamp: new Date().toISOString()
  };
  analytics.messages.push(record);
  await saveData();
  res.json({ success: true });
});

// 记录盲盒选择
app.post('/api/analytics/selection', async (req, res) => {
  const { message, budget, selectedBox, giftName, giftPrice } = req.body;
  const record = {
    id: `sel_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    message,
    budget,
    selectedBox,
    giftName,
    giftPrice,
    timestamp: new Date().toISOString()
  };
  analytics.selections.push(record);
  await saveData();
  res.json({ success: true });
});

// 记录购买点击
app.post('/api/analytics/click', async (req, res) => {
  const { giftName, giftPrice, keyword } = req.body;
  const record = {
    id: `click_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    giftName,
    giftPrice,
    keyword,
    timestamp: new Date().toISOString()
  };
  analytics.clicks.push(record);
  await saveData();
  res.json({ success: true });
});

// ==================== 管理后台 API ====================

// 获取统计数据（需要登录）
app.get('/api/admin/stats', requireAuth, (req, res) => {
  const today = new Date().toDateString();
  const todayVisits = analytics.visits.filter(v => 
    new Date(v.timestamp).toDateString() === today
  ).length;
  
  res.json({
    success: true,
    data: {
      totalVisits: analytics.visits.length,
      todayVisits,
      totalMessages: analytics.messages.length,
      totalSelections: analytics.selections.length,
      totalClicks: analytics.clicks.length,
      conversionRate: analytics.selections.length > 0 
        ? ((analytics.clicks.length / analytics.selections.length) * 100).toFixed(1)
        : 0
    }
  });
});

// 获取最近的寄语（需要登录）
app.get('/api/admin/messages', requireAuth, (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const messages = [...analytics.messages]
    .reverse()
    .slice(0, limit);
  res.json({ success: true, data: messages });
});

// 获取用户选择分析（需要登录）
app.get('/api/admin/selections', requireAuth, (req, res) => {
  const { startDate, endDate, hasClick, limit = 50 } = req.query;
  
  let selections = [...analytics.selections];
  
  // 时间筛选
  if (startDate || endDate) {
    selections = selections.filter(s => {
      const date = new Date(s.timestamp);
      if (startDate && date < new Date(startDate)) return false;
      if (endDate && date > new Date(endDate + 'T23:59:59')) return false;
      return true;
    });
  }
  
  // 添加点击状态标记
  selections = selections.map(s => {
    const hasClicked = analytics.clicks.some(c => 
      c.giftName === s.giftName && 
      new Date(c.timestamp) >= new Date(s.timestamp) &&
      new Date(c.timestamp) <= new Date(new Date(s.timestamp).getTime() + 30 * 60 * 1000) // 30分钟内
    );
    return { ...s, hasClicked, clickedAt: hasClicked ? analytics.clicks.find(c => 
      c.giftName === s.giftName && 
      new Date(c.timestamp) >= new Date(s.timestamp)
    )?.timestamp : null };
  });
  
  // 点击状态筛选
  if (hasClick !== undefined && hasClick !== '') {
    const clickFilter = hasClick === 'true' || hasClick === '1';
    selections = selections.filter(s => s.hasClicked === clickFilter);
  }
  
  // 倒序排列
  selections.reverse();
  
  // 统计预算分布
  const budgetStats = {};
  analytics.selections.forEach(s => {
    budgetStats[s.budget] = (budgetStats[s.budget] || 0) + 1;
  });
  
  // 统计关键词
  const keywordStats = {};
  analytics.selections.forEach(s => {
    if (s.giftName) {
      keywordStats[s.giftName] = (keywordStats[s.giftName] || 0) + 1;
    }
  });
  
  // 点击转化率统计
  const clickStats = {
    total: selections.length,
    clicked: selections.filter(s => s.hasClicked).length,
    notClicked: selections.filter(s => !s.hasClicked).length,
    rate: selections.length > 0 ? ((selections.filter(s => s.hasClicked).length / selections.length) * 100).toFixed(1) : 0
  };
  
  res.json({
    success: true,
    data: {
      list: selections.slice(0, parseInt(limit)),
      stats: {
        budget: budgetStats,
        keyword: keywordStats,
        click: clickStats
      }
    }
  });
});

// 登录页面 HTML
const loginPageHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>芒果精灵 - 管理后台登录</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
      background: linear-gradient(135deg, #FFF9F0 0%, #FFE8D6 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-container {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(255, 107, 53, 0.2);
      width: 100%;
      max-width: 400px;
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo-icon {
      font-size: 60px;
      margin-bottom: 10px;
    }
    .logo h1 {
      color: #FF6B35;
      font-size: 24px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #666;
      font-size: 14px;
    }
    .form-group input {
      width: 100%;
      padding: 15px;
      border: 2px solid #eee;
      border-radius: 10px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.3s;
    }
    .form-group input:focus {
      border-color: #FF6B35;
    }
    .btn-login {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #FFB347, #FF6B35);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .btn-login:hover {
      transform: translateY(-2px);
    }
    .btn-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .error-msg {
      color: #ff4d4f;
      font-size: 14px;
      margin-top: 10px;
      text-align: center;
      display: none;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="logo">
      <div class="logo-icon">🥭</div>
      <h1>芒果精灵管理后台</h1>
    </div>
    <form id="loginForm">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" id="username" placeholder="请输入用户名" required>
      </div>
      <div class="form-group">
        <label>密码</label>
        <input type="password" id="password" placeholder="请输入密码" required>
      </div>
      <button type="submit" class="btn-login">登 录</button>
      <div class="error-msg" id="errorMsg"></div>
    </form>
  </div>
  
  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const errorMsg = document.getElementById('errorMsg');
      
      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // 保存 token 并跳转
          localStorage.setItem('adminToken', data.data.token);
          window.location.href = '/admin/dashboard?token=' + data.data.token;
        } else {
          errorMsg.textContent = data.error || '登录失败';
          errorMsg.style.display = 'block';
        }
      } catch (err) {
        errorMsg.textContent = '网络错误，请重试';
        errorMsg.style.display = 'block';
      }
    });
  </script>
</body>
</html>
`;

// ==================== 管理后台页面 ====================
app.get('/admin/dashboard', requireAuth, (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>芒果精灵 - 数据后台</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #FFB347, #FF6B35);
      color: white;
      padding: 30px;
      border-radius: 20px;
      margin-bottom: 30px;
    }
    .header h1 { font-size: 28px; margin-bottom: 10px; }
    .header p { opacity: 0.9; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .stat-value {
      font-size: 36px;
      font-weight: 700;
      color: #FF6B35;
      margin-bottom: 5px;
    }
    .stat-label {
      color: #666;
      font-size: 14px;
    }
    .section {
      background: white;
      border-radius: 15px;
      padding: 25px;
      margin-bottom: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .section h2 {
      font-size: 18px;
      margin-bottom: 20px;
      color: #333;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      text-align: left;
      padding: 12px;
      border-bottom: 1px solid #eee;
    }
    th {
      color: #666;
      font-weight: 600;
      font-size: 13px;
    }
    td {
      font-size: 14px;
      color: #333;
    }
    .tag {
      background: rgba(255, 107, 53, 0.1);
      color: #FF6B35;
      padding: 4px 10px;
      border-radius: 10px;
      font-size: 12px;
    }
    .refresh-btn {
      background: linear-gradient(135deg, #FFB347, #FF6B35);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .empty {
      text-align: center;
      color: #999;
      padding: 40px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🥭 芒果精灵数据后台</h1>
    <p>实时监控用户行为和业务数据</p>
    <button onclick="logout()" style="margin-top: 15px; padding: 8px 20px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.5); color: white; border-radius: 20px; cursor: pointer;">退出登录</button>
  </div>
  
  <button class="refresh-btn" onclick="loadData()">🔄 刷新数据</button>
  
  <div class="stats-grid" id="stats">
    <div class="stat-card">
      <div class="stat-value" id="totalVisits">-</div>
      <div class="stat-label">总访问量</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="todayVisits">-</div>
      <div class="stat-label">今日访问</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="totalMessages">-</div>
      <div class="stat-label">用户寄语数</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="totalSelections">-</div>
      <div class="stat-label">盲盒选择数</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="conversionRate">-</div>
      <div class="stat-label">点击转化率 %</div>
    </div>
  </div>
  
  <div class="section">
    <h2>📝 最近的用户寄语</h2>
    <div id="messages">
      <div class="empty">暂无数据</div>
    </div>
  </div>
  
  <div class="section">
    <h2>🎁 盲盒选择记录</h2>
    
    <!-- 筛选区域 -->
    <div class="filter-section" style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
      <div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center;">
        <div>
          <label style="font-size: 12px; color: #666; display: block; margin-bottom: 5px;">开始时间</label>
          <input type="date" id="filterStartDate" style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px;">
        </div>
        <div>
          <label style="font-size: 12px; color: #666; display: block; margin-bottom: 5px;">结束时间</label>
          <input type="date" id="filterEndDate" style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px;">
        </div>
        <div>
          <label style="font-size: 12px; color: #666; display: block; margin-bottom: 5px;">点击状态</label>
          <select id="filterHasClick" style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px; min-width: 120px;">
            <option value="">全部</option>
            <option value="true">已点击</option>
            <option value="false">未点击</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; color: #666; display: block; margin-bottom: 5px;">显示条数</label>
          <select id="filterLimit" style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px;">
            <option value="20">20条</option>
            <option value="50" selected>50条</option>
            <option value="100">100条</option>
            <option value="200">200条</option>
          </select>
        </div>
        <div style="margin-top: 17px;">
          <button onclick="applyFilters()" style="padding: 8px 20px; background: linear-gradient(135deg, #FFB347, #FF6B35); color: white; border: none; border-radius: 8px; cursor: pointer;">应用筛选</button>
          <button onclick="resetFilters()" style="padding: 8px 20px; background: #f0f0f0; color: #666; border: none; border-radius: 8px; cursor: pointer; margin-left: 10px;">重置</button>
        </div>
      </div>
      
      <!-- 点击统计 -->
      <div id="clickStats" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; display: none;">
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <div><strong>总记录:</strong> <span id="statTotal">0</span></div>
          <div style="color: #52c41a;"><strong>已点击:</strong> <span id="statClicked">0</span></div>
          <div style="color: #ff4d4f;"><strong>未点击:</strong> <span id="statNotClicked">0</span></div>
          <div style="color: #FF6B35;"><strong>转化率:</strong> <span id="statRate">0%</span></div>
        </div>
      </div>
    </div>
    
    <div id="selections">
      <div class="empty">暂无数据</div>
    </div>
  </div>

  <script>
    // 获取 token
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token') || localStorage.getItem('adminToken');
    
    if (!token) {
      alert('请先登录');
      window.location.href = '/admin';
    }
    
    async function loadData() {
      try {
        // 加载统计数据
        const statsRes = await fetch('/api/admin/stats', {
          headers: { 'Authorization': token }
        });
        const stats = await statsRes.json();
        if (stats.success) {
          document.getElementById('totalVisits').textContent = stats.data.totalVisits;
          document.getElementById('todayVisits').textContent = stats.data.todayVisits;
          document.getElementById('totalMessages').textContent = stats.data.totalMessages;
          document.getElementById('totalSelections').textContent = stats.data.totalSelections;
          document.getElementById('conversionRate').textContent = stats.data.conversionRate + '%';
        }
        
        // 加载寄语
        const msgRes = await fetch('/api/admin/messages?limit=20', {
          headers: { 'Authorization': token }
        });
        const msgs = await msgRes.json();
        if (msgs.success && msgs.data.length > 0) {
          const msgHtml = \`
            <table>
              <tr><th>时间</th><th>寄语</th><th>预算</th></tr>
              \${msgs.data.map(m => \`
                <tr>
                  <td>\${new Date(m.timestamp).toLocaleString()}</td>
                  <td>\${m.message}</td>
                  <td><span class="tag">¥\${m.budget}</span></td>
                </tr>
              \`).join('')}
            </table>
          \`;
          document.getElementById('messages').innerHTML = msgHtml;
        }
        
        // 加载选择记录
        await loadSelections();
      } catch (err) {
        console.error('加载数据失败:', err);
        if (err.message.includes('401')) {
          alert('登录已过期，请重新登录');
          localStorage.removeItem('adminToken');
          window.location.href = '/admin';
        }
      }
    }
    
    async function loadSelections() {
      try {
        // 获取筛选参数
        const startDate = document.getElementById('filterStartDate').value;
        const endDate = document.getElementById('filterEndDate').value;
        const hasClick = document.getElementById('filterHasClick').value;
        const limit = document.getElementById('filterLimit').value;
        
        let url = '/api/admin/selections?limit=' + limit;
        if (startDate) url += '&startDate=' + startDate;
        if (endDate) url += '&endDate=' + endDate;
        if (hasClick !== '') url += '&hasClick=' + hasClick;
        
        const selRes = await fetch(url, {
          headers: { 'Authorization': token }
        });
        const sels = await selRes.json();
        
        if (sels.success) {
          // 更新点击统计
          if (sels.data.stats.click) {
            document.getElementById('clickStats').style.display = 'block';
            document.getElementById('statTotal').textContent = sels.data.stats.click.total;
            document.getElementById('statClicked').textContent = sels.data.stats.click.clicked;
            document.getElementById('statNotClicked').textContent = sels.data.stats.click.notClicked;
            document.getElementById('statRate').textContent = sels.data.stats.click.rate + '%';
          }
          
          if (sels.data.list.length > 0) {
            let html = '<table><tr><th>时间</th><th>寄语</th><th>选中礼物</th><th>价格</th><th>点击状态</th></tr>';
            for (const s of sels.data.list) {
              const msg = s.message ? s.message.substring(0,20) + "..." : "-";
              const name = s.giftName || "-";
              const price = parseFloat(s.giftPrice || 0).toFixed(2);
              const click = s.hasClicked ? "<span style=color:green>已点击</span>" : "<span style=color:gray>未点击</span>";
              html += "<tr><td>" + new Date(s.timestamp).toLocaleString() + "</td>";
              html += "<td>" + msg + "</td><td>" + name + "</td>";
              html += "<td><span class=tag>¥" + price + "</span></td><td>" + click + "</td></tr>";
            }
            html += "</table>";
            document.getElementById('selections').innerHTML = html;
          } else {
            document.getElementById('selections').innerHTML = '<div class="empty">暂无符合条件的数据</div>';
          }
        }
      } catch (err) {
        console.error('加载选择记录失败:', err);
      }
    }
    
    // 退出登录
    async function logout() {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    
    function applyFilters() {
      loadSelections();
    }
    
    function resetFilters() {
      document.getElementById('filterStartDate').value = '';
      document.getElementById('filterEndDate').value = '';
      document.getElementById('filterHasClick').value = '';
      document.getElementById('filterLimit').value = '50';
      loadSelections();
    }
    
    loadData();
    setInterval(loadData, 10000); // 每10秒自动刷新
  </script>
</body>
</html>
  `);
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    data: {
      visits: analytics.visits.length,
      messages: analytics.messages.length,
      selections: analytics.selections.length,
      clicks: analytics.clicks.length
    }
  });
});

// 启动
loadData().then(() => {
  app.listen(PORT, () => {
    console.log(`🥭 芒果精灵后端服务启动成功！`);
    console.log(`📡 服务地址: http://localhost:${PORT}`);
    console.log(`📊 管理后台: http://localhost:${PORT}/admin`);
    console.log(`🔥 API 列表:`);
    console.log(`   POST /api/analytics/visit     - 记录访问`);
    console.log(`   POST /api/analytics/message   - 记录寄语`);
    console.log(`   POST /api/analytics/selection - 记录选择`);
    console.log(`   POST /api/analytics/click     - 记录点击`);
    console.log(`   GET  /api/admin/stats         - 统计数据`);
    console.log(`   GET  /api/admin/messages      - 寄语列表`);
    console.log(`   GET  /api/admin/selections    - 选择记录`);
  });
});

module.exports = app;