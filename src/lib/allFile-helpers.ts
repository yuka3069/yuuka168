/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { NOT_FOUND_FRONTMATTER } from "@/constants/notFoundDescription";
import { TDateISO } from "./types";

// 1. 配置与类型定义
const CONTENT_MAP = {
  en: "contents",
  zh: "zh-contents",
} as const;

export type SupportedLang = keyof typeof CONTENT_MAP;

interface BlogPostFrontmatter {
  title?: string;
  publishedOn?: string;
  abstract?: string;
  category?: string;
  image?: string;
  [key: string]: any;
}

export interface BlogPost {
  slug: string;
  lang: SupportedLang;
  date: TDateISO;
  lastmod: TDateISO;
  abstract: string;
  images: string;
  categories: string[];
  title: string;
  [key: string]: any;
}

// =================================================================
// Core Logic (Internal) - 核心逻辑提取
// =================================================================

/**
 * 内部私有函数：读取指定语言目录下的所有文章并解析
 * 实现了"解耦合"，无论是获取所有还是获取单语言，底层都调用这个
 */
async function readPostsInDirectory(lang: SupportedLang): Promise<BlogPost[]> {
  const dirName = CONTENT_MAP[lang];
  const posts: BlogPost[] = [];

  try {
    // 检查目录是否存在，防止报错
    const fileNames = await readDirectory(dirName).catch(() => []);

    for (const fileName of fileNames) {
      if (!fileName.endsWith(".mdx")) continue; // 简单的过滤

      try {
        const rawContent = await readFile(`${dirName}/${fileName}`);
        const { data } = matter(rawContent);
        const frontmatter = data as BlogPostFrontmatter;

        posts.push({
          slug: fileName.replace(".mdx", ""),
          lang: lang,
          date: (frontmatter.publishedOn as TDateISO) ?? "",
          lastmod: (frontmatter.publishedOn as TDateISO) ?? "",
          abstract: frontmatter.abstract ?? "",
          images: frontmatter.image ?? "",
          categories: frontmatter.category
            ? frontmatter.category.split(" ")
            : [],
          title: frontmatter.title ?? "",
          ...frontmatter,
        });
      } catch (err) {
        console.error(`Error processing file ${fileName} in ${dirName}:`, err);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dirName}:`, err);
  }

  return posts;
}

// =================================================================
// Public API - 公开导出的函数
// =================================================================

/**
 * 获取特定语言的所有文章列表
 */
export async function getBlogPostListByLang(lang: SupportedLang) {
  const posts = await readPostsInDirectory(lang);
  // 按时间降序排序
  return posts.sort((p1, p2) => (p1.date < p2.date ? 1 : -1));
}

/**
 * 获取所有语言的文章列表
 * 并行读取不同文件夹，效率更高
 */
export async function getAllBlogPostList() {
  // 获取所有支持的语言
  const langs = Object.keys(CONTENT_MAP) as SupportedLang[];

  // 并行执行读取操作 (Promise.all)
  const nestedPosts = await Promise.all(
    langs.map((lang) => readPostsInDirectory(lang))
  );

  // 将 [[enPosts], [zhPosts]] 扁平化为 [allPosts]
  const allPosts = nestedPosts.flat();

  // 统一排序
  return allPosts.sort((p1, p2) => (p1.date < p2.date ? 1 : -1));
}

/**
 * 加载单篇文章详情 (带缓存)
 */
export const loadBlogPost = React.cache(async function loadBlogPost(
  lang: SupportedLang,
  slug: string
) {
  try {
    const dirName = CONTENT_MAP[lang];
    const rawContent = await readFile(`${dirName}/${slug}.mdx`);
    const { data: frontmatter, content } = matter(rawContent);

    return { frontmatter: frontmatter as BlogPostFrontmatter, content };
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { frontmatter, content } = NOT_FOUND_FRONTMATTER;
    return { frontmatter, content };
  }
});

/**
 * 获取所有分类计数
 * 重构：直接调用 getAllBlogPostList，不再重复读取文件逻辑
 */
export async function getAllCategoriesWithCount() {
  const posts = await getAllBlogPostList();
  const categoryCountMap: Record<string, number> = {};

  for (const post of posts) {
    for (const category of post.categories) {
      if (category) {
        categoryCountMap[category] = (categoryCountMap[category] || 0) + 1;
      }
    }
  }

  return categoryCountMap;
}

// =================================================================
// Node.js Helpers
// =================================================================

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
