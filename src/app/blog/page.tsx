import ListLayout from "@/layouts/ListLayoutWithTags";
import {
  getAllCategoriesWithCount,
  getBlogPostList,
} from "@/lib/enFile-helpers";
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
  params?: Promise<{ page: string }>;
  searchParams?: Promise<{ page: string }>;
}) {
  const posts = allBlogs;
  // 获取page参数，优先从params获取，然后是searchParams，默认为1
  const params = await props.params;
  const searchParams = await props.searchParams;
  const pageNumber = parseInt(params?.page || searchParams?.page || "1", 10);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  // 计算当前页应该显示的文章
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const initialDisplayPosts = posts.slice(startIndex, endIndex);
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
