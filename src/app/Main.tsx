import ArrowLink from "@/components/ArrowLink";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/constants/siteMetadata";
import formatDate from "@/lib/format-date";
import { Posts } from "@/lib/types";
import Image from "next/image";
// import { formatDate } from "pliny/utils/formatDate";
// import NewsletterForm from "pliny/ui/NewsletterForm";
// import soem from "pliny/analytics";

const MAX_DISPLAY = 5;

//slug, date, title, summary, tag
//tag -> categories
interface MainProps {
  posts: Posts;
}
function randownImage(max: number, dir: "left" | "right"): string {
  return `/images/banner-${dir}-${Math.floor(Math.random() * max) + 1}.jpg`;
}

export default function Home({ posts }: MainProps) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex overflow-hidden pt-4 pb-6">
          <Image
            src={randownImage(3, "left")}
            alt=""
            width={300}
            height={120}
            className="h-auto w-1/3 shrink-0 object-cover"
            priority
          />
          <Image
            src={randownImage(3, "right")}
            alt=""
            width={600}
            height={120}
            className="h-auto w-2/3 shrink-0 object-cover"
            priority
          />
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, abstract, categories, lang } = post;
            const baseURL = lang === "en" ? "/blog" : "/zh-blog";

            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100 mb-3"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {categories.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {abstract}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <ArrowLink
                          href={`${baseURL}/${slug}`}
                          title={title}
                          label="Read More"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          {/* <NewsletterForm /> */}
          {/* TODO： newsletter */}
          <div>NewsletterForm</div>
        </div>
      )}
    </>
  );
}
