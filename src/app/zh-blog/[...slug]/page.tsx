import "@/css/prism.css";
// import "katex/dist/katex.css";

import COMPONENT_MAP from "@/lib/mdx-components";
// import { MDXLayoutRenderer } from "pliny/mdx-components";

import PostLayout from "@/layouts/PostLayout";

import { Metadata } from "next";
import siteMetadata from "@/constants/siteMetadata";
import { notFound } from "next/navigation";
import { getBlogPostListByLang, loadBlogPost } from "@/lib/allFile-helpers";
import defaultAuthor from "@/constants/author";

import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> {
  const allBlogs = await getBlogPostListByLang("zh");
  const params = await props.params;
  const slug = decodeURI(params.slug.join("/"));

  const post = allBlogs.find((p) => p.slug === slug);
  //TODO: 也许会有扩展？
  // const authorList = ["default"];
  // const authorDetails = authorList.map((author) => {
  //   const authorResults = allAuthors.find((p) => p.slug === author);
  //   return coreContent(authorResults as Authors);
  // });

  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();

  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === "string" ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes("http") ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: post.title,
    description: post.abstract,
    openGraph: {
      title: post.title,
      description: post.abstract,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: "./",
      images: ogImages,
      authors: [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.abstract,
      images: imageList,
    },
  };
}

export const generateStaticParams = async () => {
  const allBlogs = await getBlogPostListByLang("zh");
  return allBlogs.map((p) => ({
    slug: p.slug.split("/").map((name) => decodeURI(name)),
  }));
};

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const allBlogs = await getBlogPostListByLang("zh");
  const params = await props.params;
  const slug = decodeURI(params.slug.join("/"));
  // Filter out drafts in production
  const sortedCoreContents = await getBlogPostListByLang("zh");
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];
  const post = allBlogs.find((p) => p.slug === slug);

  if (!post?.slug) {
    return notFound();
  }

  const { content: mainContent } = await loadBlogPost("zh", post.slug);

  const layoutContent = {
    slug: post.slug,
    date: post.date,
    title: post.title,
    categories: post.categories,
  };
  const authorDetails = [defaultAuthor];

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <PostLayout
        content={layoutContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
        basePath="zh-blog"
      >
        <MDXRemote source={mainContent} components={COMPONENT_MAP} />
      </PostLayout>
    </>
  );
}
