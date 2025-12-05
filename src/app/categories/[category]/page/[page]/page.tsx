import siteMetadata from "@/constants/siteMetadata";
import ListLayout from "@/layouts/ListLayoutWithTags";
import { genPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import {
  getAllCategoriesWithCount,
  getAllBlogPostList,
} from "@/lib/allFile-helpers";
import { notFound } from "next/navigation";

const POSTS_PER_PAGE = 5;

export async function generateMetadata(props: {
  params: Promise<{ category: string; page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const category = decodeURIComponent(params.category);
  const page = params.page;
  return genPageMetadata({
    title: `${category} - Page ${page}`,
    description: `${siteMetadata.title} ${category} tagged content - Page ${page}`,
    alternates: {
      canonical: `./`,
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/categories/${category}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagData = await getAllCategoriesWithCount();
  const allBlogs = await getAllBlogPostList();
  const tagKeys = Object.keys(tagData);

  const paths: { category: string; page: string }[] = [];

  for (const tag of tagKeys) {
    const filteredPosts = allBlogs.filter((post) =>
      post.categories.includes(tag)
    );
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    // 生成所有分页路径
    for (let i = 1; i <= totalPages; i++) {
      paths.push({
        category: encodeURIComponent(tag),
        page: i.toString(),
      });
    }
  }

  return paths;
};

export default async function CategoryPageWithPagination(props: {
  params: Promise<{ category: string; page: string }>;
}) {
  const params = await props.params;
  const category = decodeURIComponent(params.category);
  const pageNumber = parseInt(params.page, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return notFound();
  }

  const tagData = await getAllCategoriesWithCount();
  const allBlogs = await getAllBlogPostList();

  const title =
    category[0].toUpperCase() + category.split(" ").join("-").slice(1);
  const filteredPosts = allBlogs.filter((post) =>
    post.categories.includes(category)
  );

  if (filteredPosts.length === 0) {
    return notFound();
  }

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  if (pageNumber > totalPages) {
    return notFound();
  }

  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const initialDisplayPosts = filteredPosts.slice(startIndex, endIndex);

  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  };

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
      tagData={tagData}
      categoryName={category}
    />
  );
}
