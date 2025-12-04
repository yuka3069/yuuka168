import ListLayout from "@/layouts/ListLayoutWithTags";
import {
  getAllCategoriesWithCount,
  getBlogPostListByLang,
} from "@/lib/allFile-helpers";

const POSTS_PER_PAGE = 5;

export default async function BlogPage(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const pageNumber = parseInt(params?.page || "1", 10);
  const allBlogs = await getBlogPostListByLang("zh");
  const posts = allBlogs;
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
