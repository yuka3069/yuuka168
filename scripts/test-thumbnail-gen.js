const fs = require('fs');
const { createCanvas } = require('canvas');

/**
 * Test script for GitHub-style thumbnail generation
 * Usage: node scripts/test-thumbnail-gen.js "Your Article Title Here"
 */

const title = process.argv[2] || "Test Article Title";
console.log('Generating thumbnail for:', title);

// --- 生成 GitHub 风格的缩略图 ---
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// 创建渐变背景 (类似 GitHub 的紫色到蓝色渐变)
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#667eea');    // 紫色
gradient.addColorStop(1, '#764ba2');    // 深紫色
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// 设置文字样式
ctx.fillStyle = '#ffffff';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// 根据标题长度动态调整字体大小
let fontSize = 80;
if (title.length > 50) {
    fontSize = 60;
} else if (title.length > 30) {
    fontSize = 70;
}

ctx.font = `bold ${fontSize}px sans-serif`;

// 处理长标题的换行
const maxWidth = width - 100; // 左右留边距
const words = title.split(' ');
const lines = [];
let currentLine = words[0];

for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + ' ' + word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
    } else {
        currentLine = testLine;
    }
}
lines.push(currentLine);

// 绘制文字 (居中对齐)
const lineHeight = fontSize * 1.2;
const totalHeight = lines.length * lineHeight;
const startY = (height - totalHeight) / 2 + fontSize / 2;

lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
});

// 保存为文件
const outputPath = 'test-thumbnail.png';
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outputPath, buffer);

console.log(`✅ Thumbnail generated successfully: ${outputPath}`);
console.log(`   Size: ${buffer.length} bytes`);
console.log(`   Dimensions: ${width}x${height}px`);
console.log(`   Lines: ${lines.length}`);
