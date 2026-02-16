#!/bin/bash

# 芒果精灵盲盒 - 一键启动脚本
# 使用方法: ./start.sh

echo "🥭 芒果精灵盲盒 - 启动脚本"
echo "========================================"

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装Node.js"
    echo "请先安装Node.js 18+ : https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 错误: Node.js版本过低 (需要18+)"
    echo "当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js版本: $(node -v)"

# 启动后端
echo ""
echo "📦 启动后端服务..."
cd backend

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "  安装依赖中..."
    npm install
fi

echo "  后端服务启动中 (端口: 3000)..."
npm start &
BACKEND_PID=$!

# 等待后端启动
sleep 2

# 检查后端是否启动成功
if curl -s http://localhost:3000/health > /dev/null; then
    echo "  ✅ 后端服务已启动"
else
    echo "  ⚠️  后端服务可能未正常启动，请检查日志"
fi

cd ..

echo ""
echo "========================================"
echo "🎉 服务状态:"
echo "   后端API: http://localhost:3000"
echo "   健康检查: http://localhost:3000/health"
echo ""
echo "📝 下一步:"
echo "   1. 打开微信开发者工具"
echo "   2. 导入 weapp 目录"
echo "   3. 开始体验芒果精灵盲盒！"
echo ""
echo "🛑 停止服务: 按 Ctrl+C"
echo "========================================"

# 等待用户停止
trap "echo ''; echo '🛑 正在停止服务...'; kill $BACKEND_PID 2>/dev/null; exit 0" INT
wait