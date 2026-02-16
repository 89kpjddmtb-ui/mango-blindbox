# 芒果精灵盲盒 - 后端服务

## 技术栈
- Node.js 18+
- Express 4.x
- 内存存储（无需数据库）

## 快速开始

### 1. 安装依赖
```bash
cd backend
npm install
```

### 2. 启动服务
```bash
# 开发模式（热重载）
npm run dev

# 生产模式
npm start
```

服务默认运行在 `http://localhost:3000`

## API 文档

### POST /api/recommend
获取AI礼物推荐

**请求参数：**
```json
{
  "message": "我就是超人",  // 用户寄语
  "budget": 50              // 预算金额（元）
}
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "recommendationId": "rec_1707812345678_abc123",
    "gifts": [
      {
        "id": "1707812345678-0",
        "name": "漫威英雄手办套装",
        "desc": "经典英雄角色，精致收藏级手办",
        "price": 45,
        "keyword": "英雄守护",
        "platform": "淘宝"
      }
    ]
  }
}
```

### POST /api/order
创建订单（模拟支付直接成功）

**请求参数：**
```json
{
  "recommendationId": "rec_1707812345678_abc123",
  "selectedGiftId": "1707812345678-0"
}
```

### GET /api/order/:id
获取订单详情

## AI礼物推荐 Prompt 设计

### 基础Prompt（用于真实大模型API）

```
你是一位贴心的礼物推荐专家。请根据用户的寄语和预算，推荐3个最合适的礼物。

用户寄语: {message}
预算: {budget}元

请返回JSON格式（不要包含markdown标记）：
{
  "gifts": [
    {
      "name": "礼物名称",
      "desc": "简短描述，突出卖点",
      "price": 价格数字,
      "keyword": "2-4字关键词，用于盲盒展示线索",
      "platform": "淘宝/京东"
    }
  ]
}

要求：
1. 礼物价格必须严格控制在预算内
2. 关键词要有神秘感，不要过于直白
3. 礼物风格要与寄语情感匹配
4. 选择主流电商平台有售的商品
5. 描述要温馨有感染力

示例：
寄语"我就是超人"，预算50元 → 关键词可以用"英雄守护"、"力量之源"、"勇气徽章"
寄语"愿你温暖"，预算30元 → 关键词可以用"暖心温度"、"温柔陪伴"、"冬日暖阳"
```

### 扩展Prompt（带分类指引）

```
角色：你是一位情感细腻、擅长洞察人心的礼物推荐专家。

任务：根据用户的寄语，分析其中的情感倾向，推荐最契合的礼物。

情感分类指南：
- 英雄/力量型：包含"超人"、"勇敢"、"坚强"等关键词
- 浪漫/爱情型：包含"爱"、"心"、"浪漫"等关键词  
- 科技/潮流型：包含"酷"、"科技"、"游戏"等关键词
- 可爱/治愈型：包含"可爱"、"萌"、"软"等关键词
- 温暖/关怀型：包含"暖"、"关怀"、"贴心"等关键词

输入：
- 寄语: {message}
- 预算: {budget}元（严格限制，不能超过）

输出要求：
{
  "analysis": "对寄语的简短情感分析",
  "category": "分类名称",
  "gifts": [
    {
      "name": "具体商品名",
      "desc": "20字内的卖点描述", 
      "price": 价格,
      "keyword": "盲盒展示用的神秘感关键词",
      "platform": "淘宝/京东",
      "matchReason": "为什么这个礼物适合"
    }
  ]
}

注意：
1. 3个礼物要覆盖不同价位，给用户选择空间
2. 关键词要避免直接暴露礼物是什么
3. 描述要有画面感和情感温度
```

## 项目结构
```
backend/
├── app.js          # 主应用入口
├── package.json    # 依赖配置
└── README.md       # 本文件
```

## 部署说明

### 本地开发
```bash
npm install
npm run dev
```

### 服务器部署
1. 上传代码到服务器
2. 安装Node.js 18+
3. 执行 `npm install --production`
4. 使用PM2守护进程：
   ```bash
   npm install -g pm2
   pm2 start app.js --name mango-blindbox
   pm2 save
   pm2 startup
   ```

### 微信小程序配置
在小程序后台 - 开发管理 - 服务器域名中添加：
- request合法域名: `https://你的域名`
- uploadFile合法域名: `https://你的域名`
- downloadFile合法域名: `https://你的域名`

## 注意事项
- 当前使用内存存储，服务重启数据会丢失
- 如需持久化，可接入Redis或MongoDB
- 模拟支付直接返回成功，无需接入微信支付
- 物流状态基于时间模拟更新
