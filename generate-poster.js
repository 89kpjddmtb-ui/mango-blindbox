const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const H5_URL = 'https://89kpjddmtb-ui.github.io/mango-blindbox/';

// 生成二维码海报
async function generatePoster() {
    const outputPath = path.join(__dirname, 'poster.png');
    const { createCanvas } = require('canvas');
    
    // 画布尺寸 1080x1920
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext('2d');
    
    // 背景渐变
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#FFF9F0');
    gradient.addColorStop(0.5, '#FFE8D6');
    gradient.addColorStop(1, '#FFD4BA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);
    
    // 装饰圆点
    ctx.fillStyle = 'rgba(255, 107, 53, 0.08)';
    const circles = [
        [150, 200, 80], [900, 300, 60], [100, 600, 100],
        [950, 800, 70], [200, 1000, 90], [850, 1200, 80],
        [180, 1500, 60], [920, 1700, 100], [300, 1800, 50]
    ];
    circles.forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // === 精致芒果精灵 ===
    drawH5MangoMascot(ctx, 540, 380);
    
    // 标题 - 更大更醒目
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FF6B35';
    ctx.font = 'bold 110px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    ctx.fillText('芒果精灵盲盒', 540, 620);
    
    // 副标题 - 更大
    ctx.fillStyle = '#555';
    ctx.font = '48px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    ctx.fillText('AI为你挑选惊喜礼物', 540, 700);
    
    // 分隔线
    ctx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(320, 740);
    ctx.lineTo(760, 740);
    ctx.stroke();
    
    // 功能介绍 - 更大
    ctx.fillStyle = '#444';
    ctx.font = '42px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    const features = [
        '输入寄语，AI智能推荐礼物',
        '盲盒三选一，揭晓惊喜',
        '送给TA一份特别的心意'
    ];
    features.forEach((text, i) => {
        ctx.fillText(text, 540, 830 + i * 65);
    });
    
    // 生成二维码
    const qrCanvas = createCanvas(400, 400);
    await QRCode.toCanvas(qrCanvas, H5_URL, {
        width: 400,
        margin: 2,
        color: { dark: '#FF6B35', light: '#FFFFFF' }
    });
    
    // 二维码白色背景卡片
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(255, 107, 53, 0.2)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;
    ctx.beginPath();
    ctx.roundRect(340, 1050, 400, 580, 24);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    
    // 放置二维码
    ctx.drawImage(qrCanvas, 340, 1070);
    
    // 扫码提示 - 更大
    ctx.fillStyle = '#FF6B35';
    ctx.font = 'bold 56px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    ctx.fillText('扫码开启盲盒之旅', 540, 1700);
    
    // 底部小字
    ctx.fillStyle = '#888';
    ctx.font = '32px "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
    ctx.fillText('长按识别二维码', 540, 1755);
    
    // 保存
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log('✅ 海报生成成功:', outputPath);
}

// 绘制 H5 同款芒果精灵
function drawH5MangoMascot(ctx, x, y) {
    // 身体阴影
    ctx.fillStyle = 'rgba(255, 107, 53, 0.15)';
    ctx.beginPath();
    ctx.ellipse(x + 10, y + 160, 100, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 身体 - 渐变芒果色
    const bodyGradient = ctx.createRadialGradient(x - 30, y - 30, 0, x, y, 120);
    bodyGradient.addColorStop(0, '#FFD54F');
    bodyGradient.addColorStop(0.5, '#FFB347');
    bodyGradient.addColorStop(1, '#FF8C42');
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.ellipse(x, y + 20, 100, 115, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 身体阴影层次
    ctx.fillStyle = 'rgba(255, 140, 66, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x + 20, y + 60, 60, 70, 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // 高光
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.ellipse(x - 35, y - 20, 25, 35, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 叶子 - 渐变绿色
    const leafGradient = ctx.createLinearGradient(x - 20, y - 130, x + 20, y - 80);
    leafGradient.addColorStop(0, '#9CCC65');
    leafGradient.addColorStop(0.5, '#7CB342');
    leafGradient.addColorStop(1, '#558B2F');
    ctx.fillStyle = leafGradient;
    ctx.beginPath();
    ctx.ellipse(x, y - 110, 22, 45, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 左眼白
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(x - 32, y - 15, 14, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    // 左眼珠
    ctx.fillStyle = '#3E2723';
    ctx.beginPath();
    ctx.ellipse(x - 30, y - 13, 7, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    // 左眼高光
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x - 27, y - 16, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 右眼白
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(x + 32, y - 15, 14, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    // 右眼珠
    ctx.fillStyle = '#3E2723';
    ctx.beginPath();
    ctx.ellipse(x + 30, y - 13, 7, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    // 右眼高光
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x + 33, y - 16, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 腮红
    ctx.fillStyle = 'rgba(255, 138, 128, 0.4)';
    ctx.beginPath();
    ctx.ellipse(x - 55, y + 15, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 55, y + 15, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 嘴巴 - 微笑
    ctx.strokeStyle = '#3E2723';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(x, y + 20, 20, 0.2, Math.PI - 0.2);
    ctx.stroke();
    
    // 手 - 左手
    ctx.fillStyle = '#FFB347';
    ctx.beginPath();
    ctx.ellipse(x - 90, y + 50, 15, 25, -0.5, 0, Math.PI * 2);
    ctx.fill();
    // 手 - 右手
    ctx.beginPath();
    ctx.ellipse(x + 90, y + 50, 15, 25, 0.5, 0, Math.PI * 2);
    ctx.fill();
}

generatePoster().catch(console.error);
