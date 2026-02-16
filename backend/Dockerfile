FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
# 复制根目录的数据文件（如果存在）
COPY data.json* ../data.json 2>/dev/null || true

EXPOSE 3000

CMD ["node", "app.js"]
