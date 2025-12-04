import siteMetadata from "@/constants/siteMetadata";
import ListLayout from "@/layouts/ListLayoutWithTags";

import { genPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import {
  getAllCategoriesWithCount,
  getAllBlogPostList,
} from "@/lib/allFile-helpers";

const POSTS_PER_PAGE = 5;
const tagData = await getAllCategoriesWithCount();
const allBlogs = await getAllBlogPostList();

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const tag = decodeURI(params.category);
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: "./",
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  return tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }));
};

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const category = decodeURI(params.category);
  const title =
    category[0].toUpperCase() + category.split(" ").join("-").slice(1);
  const filteredPosts = allBlogs.filter((post) =>
    post.categories.includes(category)
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  };

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
      tagData={tagData}
    />
  );
}
