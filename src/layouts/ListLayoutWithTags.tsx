"use client";

import { usePathname } from "next/navigation";

import Link from "@/components/Link";
import Tag from "@/components/Tag";
import PaginationLink from "@/components/PaginationLink";

import { Posts } from "@/lib/types";
import formatDate from "@/lib/format-date";
import ArrowLink from "@/components/ArrowLink";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface ListLayoutProps {
  posts: Posts;
  title: string;
  initialDisplayPosts?: Posts;
  pagination?: PaginationProps;
  tagData: Record<string, number>;
  categoryName?: string; // 用于 categories 路由
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const segments = pathname.split("/");

  // 根据路径决定 basePath
  let basePath = "";

  if (pathname.startsWith("/blog")) {
    basePath = "blog";
  } else if (pathname.startsWith("/zh-blog")) {
    basePath = "zh-blog";
  } else if (pathname.startsWith("/categories/")) {
    // 对于 categories，保持完整路径
    const categoryName = segments[2]; // /categories/[category]/...
    basePath = `categories/${categoryName}`;
  }

  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <PaginationLink
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            Previous
          </PaginationLink>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <PaginationLink
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
          >
            Next
          </PaginationLink>
        )}
      </nav>
    </div>
  );
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tagData,
  categoryName,
}: ListLayoutProps) {
  const pathname = usePathname();
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  // 检测当前路径的语言环境
  const isZhBlog = pathname.startsWith("/zh-blog");
  const blogBasePath = isZhBlog ? "zh-blog" : "blog";

  // 检测是否在 categories 页面
  const isInCategories = pathname.startsWith("/categories/");
  const currentCategory =
    categoryName || (isInCategories ? pathname.split("/")[2] : null);

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              {pathname.startsWith("/blog") ||
              pathname.startsWith("/zh-blog") ? (
                <h3 className="text-primary-500 font-bold uppercase">
                  All Posts
                </h3>
              ) : (
                <Link
                  href={`/${blogBasePath}`}
                  className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {currentCategory === t ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/categories/${t}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { slug, date, title, abstract, categories, lang } = post;
                const postBasePath = lang === "en" ? "blog" : `${lang}-blog`;
                return (
                  <li
                    key={slug}
                    className="py-5 border-b-2 border-gray-200/60 dark:border-gray-700/60 last:border-none"
                  >
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/${blogBasePath}/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {categories?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {abstract}
                        </div>
                        <div>
                          <ArrowLink
                            href={`/${postBasePath}/${slug}`}
                            title={title}
                          />
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
