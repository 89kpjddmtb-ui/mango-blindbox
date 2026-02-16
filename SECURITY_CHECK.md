# 🔍 芒果精灵安全检查报告

**检查时间**: 2026-02-16 13:45
**检查人**: Sophie
**服务状态**: ✅ 运行正常 (71访问，11条寄语，12次选择)

---

## ⚠️ 发现的安全问题

### 1. CORS 配置过于宽松 🔴 高优先级
**问题**: `app.use(cors())` 允许所有来源访问 API
**风险**: 恶意网站可调用接口刷数据
**修复**: 限制只允许 GitHub Pages 域名
```javascript
app.use(cors({
  origin: 'https://89kpjddmtb-ui.github.io'
}));
```

### 2. 静态文件服务暴露 🔴 高优先级
**问题**: `express.static(path.join(__dirname, '../'))` 指向父目录
**风险**: 可能暴露后端代码、package.json 等敏感文件
**修复**: 只提供前端文件目录
```javascript
app.use(express.static(path.join(__dirname, '../'))); // 当前
// 改为只提供 index.html 和 product-images
app.use('/images', express.static(path.join(__dirname, '../product-images')));
```

### 3. 管理员密码硬编码 🟡 中优先级
**问题**: 用户名密码写在代码里 (admin1234/mangguojingling2027)
**风险**: 代码泄露 = 后台暴露
**修复**: 使用 Railway 环境变量
```javascript
const ADMIN_USERNAME = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASS || 'default';
```

### 4. 输入验证不足 🟡 中优先级
**问题**: 直接从 req.body/req.query 取值，无验证过滤
**风险**: XSS 攻击、数据注入
**修复**: 添加类型检查和长度限制
```javascript
// 当前
category = req.query.category;
// 建议
const category = req.query.category?.toString().slice(0, 20);
```

### 5. 缺少 API 限流 🟢 低优先级
**问题**: 无频率限制
**风险**: 容易被刷接口
**修复**: 添加 express-rate-limit

---

## ✅ 已确认安全
- 无 SQL 注入风险 (JSON 文件存储)
- 管理后台有 Token 认证 (24小时过期)
- 服务运行稳定

---

## 🔧 修复建议优先级
1. **立即修复**: CORS + 静态文件
2. **尽快修复**: 密码移到环境变量
3. **后续优化**: 输入验证 + API 限流

要我立即修复这些问题吗？
