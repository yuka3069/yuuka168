import fs from "fs/promises";
import path from "path";
import matter from "gray-matter"; // using gray-matter for generating metadata
import React from "react";
import { NOT_FOUND_FRONTMATTER } from "@/constants/notFoundDescription";
import { TDateISO } from "./types";

export async function getBlogPostList() {
  const fileNames = await readDirectory("zh-contents");

  const blogPosts = [];

  for (const fileName of fileNames) {
    try {
      const rawContent = await readFile(`zh-contents/${fileName}`);

      const { data: frontmatter } = matter(rawContent);

      blogPosts.push({
        //TODO: how to change the as using declare key word? To indicate I know the type?
        slug: fileName.replace(".mdx", "") as string,
        date: (frontmatter.publishedOn as TDateISO) ?? "",
        lastmod: (frontmatter.publishedOn as TDateISO) ?? "",
        abstract: (frontmatter.abstract as string) ?? "",
        images: (frontmatter.image as string) ?? "",
        //TODO: change more stable logic to render the category
        categories: (frontmatter.category as string)
          ? (frontmatter.category.split(" ") as Array<string>)
          : ([""] as Array<string>),
        title: (frontmatter.title as string) ?? "",
        ...frontmatter,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return blogPosts.sort((p1, p2) => (p1.date < p2.date ? 1 : -1));
}

// using cache to avoid being excetuted twice
export const loadBlogPost = React.cache(async function loadBlogPost(
  slug: string
) {
  try {
    const rawContent = await readFile(`zh-contents/${slug}.mdx`);

    const { data: frontmatter, content } = matter(rawContent);

    return { frontmatter, content };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    //TODO: might changed to another not found page;;
    const { frontmatter, content } = NOT_FOUND_FRONTMATTER;
    return { frontmatter, content };
  }
});

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}

export async function getAllCategoriesWithCount() {
  const fileNames = await readDirectory("zh-contents");

  const categoryCountMap: Record<string, number> = {};

  for (const fileName of fileNames) {
    try {
      const rawContent = await readFile(`zh-contents/${fileName}`);
      const { data: frontmatter } = matter(rawContent);

      const categories = (frontmatter.category as string)
        ? frontmatter.category.split(" ")
        : [];

      for (const category of categories) {
        if (category) {
          categoryCountMap[category] = (categoryCountMap[category] || 0) + 1;
        }
      }
    } catch (err) {
      console.error(`Error reading file ${fileName}:`, err);
    }
  }

  return categoryCountMap;
}
