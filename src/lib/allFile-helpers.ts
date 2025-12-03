/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { NOT_FOUND_FRONTMATTER } from "@/constants/notFoundDescription";
import { TDateISO } from "./types";

// 1. 定义语言和路径的映射配置
const CONTENT_MAP = {
  en: "contents",
  zh: "zh-contents",
} as const;

type SupportedLang = keyof typeof CONTENT_MAP;

//定义 Frontmatter 接口，避免到处写 'as string'
interface BlogPostFrontmatter {
  title?: string;
  publishedOn?: string;
  abstract?: string;
  category?: string;
  [key: string]: any;
}

interface BlogPost {
  slug: string;
  lang: SupportedLang; // 新增字段：用来区分文章语言
  date: TDateISO;
  lastmod: TDateISO;
  abstract: string;
  images: string;
  categories: string[];
  title: string;
  [key: string]: any;
}

export async function getBlogPostList() {
  const blogPosts: BlogPost[] = [];

  // 3. 遍历两种语言的目录
  for (const [lang, dirName] of Object.entries(CONTENT_MAP)) {
    const currentLang = lang as SupportedLang;
    try {
      const fileNames = await readDirectory(dirName);

      for (const fileName of fileNames) {
        try {
          const rawContent = await readFile(`${dirName}/${fileName}`);

          // 使用泛型告诉 matter 返回的数据结构
          const { data } = matter(rawContent);
          const frontmatter = data as BlogPostFrontmatter;

          blogPosts.push({
            slug: fileName.replace(".mdx", ""),
            lang: currentLang, // 标记语言
            date: (frontmatter.publishedOn as TDateISO) ?? "",
            lastmod: (frontmatter.publishedOn as TDateISO) ?? "",
            abstract: frontmatter.abstract ?? "",
            images: frontmatter.image ?? "", // 这里的逻辑你可能需要确认一下，abstract 通常不是 image
            categories: frontmatter.category
              ? frontmatter.category.split(" ")
              : [],
            title: frontmatter.title ?? "",
            ...frontmatter,
          });
        } catch (err) {
          console.error(
            `Error processing file ${fileName} in ${dirName}:`,
            err
          );
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dirName}:`, err);
    }
  }

  return blogPosts.sort((p1, p2) => (p1.date < p2.date ? 1 : -1));
}

// 4. loadBlogPost 需要修改：必须传入 lang 才能知道去哪个文件夹找
// 使用 React.cache 缓存结果
export const loadBlogPost = React.cache(async function loadBlogPost(
  lang: SupportedLang,
  slug: string
) {
  try {
    const dirName = CONTENT_MAP[lang];
    // 这里的路径变成了动态的 dirName
    const rawContent = await readFile(`${dirName}/${slug}.mdx`);

    const { data: frontmatter, content } = matter(rawContent);

    return { frontmatter: frontmatter as BlogPostFrontmatter, content };
  } catch (err) {
    // 简单的错误处理
    const { frontmatter, content } = NOT_FOUND_FRONTMATTER;
    return { frontmatter, content };
  }
});

export async function getAllCategoriesWithCount() {
  const categoryCountMap: Record<string, number> = {};

  // 同样遍历所有语言目录进行统计
  for (const [lang, dirName] of Object.entries(CONTENT_MAP)) {
    try {
      const fileNames = await readDirectory(dirName);

      for (const fileName of fileNames) {
        try {
          const rawContent = await readFile(`${dirName}/${fileName}`);
          const { data } = matter(rawContent);
          const frontmatter = data as BlogPostFrontmatter;

          const categories = frontmatter.category
            ? frontmatter.category.split(" ")
            : [];

          for (const category of categories) {
            if (category) {
              categoryCountMap[category] =
                (categoryCountMap[category] || 0) + 1;
            }
          }
        } catch (err) {
          console.error(`Error reading file ${fileName}:`, err);
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dirName}:`, err);
    }
  }

  return categoryCountMap;
}

// 基础 Helper 函数保持不变
function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
