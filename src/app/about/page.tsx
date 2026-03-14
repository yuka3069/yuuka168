//import { Authors, allAuthors } from "contentlayer/generated";
//import { MDXLayoutRenderer } from "pliny/mdx-components";
import AuthorLayout from "@/layouts/AuthorLayout";
//import { coreContent } from "pliny/utils/contentlayer";
import { genPageMetadata } from "@/lib/seo";
import defaultAuthor from "@/constants/author";

export const metadata = genPageMetadata({ title: "About" });

export default function Page() {
  return (
    <>
      <AuthorLayout content={defaultAuthor}>
        <p>
          I often use discord to communicate with friends and colleagues. Feel
          free to reach out to me there! marisa1151
        </p>
      </AuthorLayout>
    </>
  );
}
