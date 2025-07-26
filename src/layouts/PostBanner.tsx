import { ReactNode } from "react";
import Image from "@/components/Image";
import Comments from "@/components/Comments";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";

// 你可自定义 siteMetadata，或传入 props 替代
const siteMetadata = {
  comments: true,
};

interface BlogPost {
  slug: string;
  title: string;
  images?: string[];
}

interface LayoutProps {
  content: BlogPost;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PostMinimal({
  content,
  next,
  prev,
  children,
}: LayoutProps) {
  const { slug, title, images } = content;
  const displayImage =
    images && images.length > 0
      ? images[0]
      : "https://picsum.photos/seed/picsum/800/400";

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              {/* 替代 Bleed：全宽容器本身已经在外层控制 */}
              <div className="relative aspect-2/1 w-full">
                <Image
                  src={displayImage}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative pt-10">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none py-4">
            {children}
          </div>

          {siteMetadata.comments && (
            <div
              className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
              id="comment"
            >
              <Comments slug={slug} />
            </div>
          )}

          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  );
}
