// import { sortPosts, allCoreContent } from "pliny/utils/contentlayer";
// import { allBlogs } from "contentlayer/generated";
import { getAllBlogPostList } from "@/lib/allFile-helpers";
import Main from "./Main";

export default async function Page() {
  //const sortedPosts = sortPosts(allBlogs);
  const posts = await getAllBlogPostList();
  return <Main posts={posts} />;
}
