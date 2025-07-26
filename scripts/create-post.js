// scripts/create-post.js
//TODO: complete later

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

//TODO: 注意文章标题和文件名匹配

const title = process.argv[2];
if (!title) {
  console.error('❌ 请提供文章标题: node create-post.js "My New Post"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const date = new Date().toISOString();
const fileName = `${slug}.mdx`;

const content = `---
title: "${title}"
abstract: ""
publishedOn: "${date}"
category: ""
---

# ${title}

Start writing here...
`;

const filePath = path.join(__dirname, "./content/", fileName);

fs.writeFileSync(filePath, content);
console.log(`✅ 文章已创建: content/posts/${fileName}`);
