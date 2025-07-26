import ListLayout from "@/layouts/ListLayoutWithTags";
import { getAllCategoriesWithCount, getBlogPostList } from "@/lib/file-helpers";
// import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
// import { allBlogs } from "contentlayer/generated";

const POSTS_PER_PAGE = 5;

const allBlogs = await getBlogPostList();

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));

  return paths;
};

export default async function BlogPage(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const posts = allBlogs;
  const pageNumber = 1;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  };
  const tagData = await getAllCategoriesWithCount();

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
      tagData={tagData}
    />
  );
}
