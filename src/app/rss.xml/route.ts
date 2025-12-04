import { getAllBlogPostList } from "@/lib/allFile-helpers";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "yuuka's blog",
    description:
      "Friendly tutorials for developers. Focus on React, CSS, animation, and more.",
    site_url: "https://yuuka168.com",
    feed_url: "https://yuuka168.com/rss.xml",
    language: "en",
  });
  const blogSummaries = await getAllBlogPostList();
  blogSummaries.forEach((blogSummary) => {
    feed.item({
      title: blogSummary.title,
      description: blogSummary.abstract,
      date: blogSummary.date,
      url: "yuuka168.com" + "/" + blogSummary.slug,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "content-type": "application/xml",
    },
  });
}
