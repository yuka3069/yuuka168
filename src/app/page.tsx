// import { sortPosts, allCoreContent } from "pliny/utils/contentlayer";
// import { allBlogs } from "contentlayer/generated";
import { getBlogPostList } from "@/lib/enFile-helpers";
import Main from "./Main";

export default async function Page() {
  //const sortedPosts = sortPosts(allBlogs);
  const posts = await getBlogPostList();
  return <Main posts={posts} />;
}
