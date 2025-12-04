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
          free to reach out to me there!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          aperiam quo doloribus nisi quisquam deleniti ex ab consectetur quos?
          Voluptatum praesentium ab labore doloribus incidunt commodi veniam
          iusto beatae quaerat!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          aperiam quo doloribus nisi quisquam deleniti ex ab consectetur quos?
          Voluptatum praesentium ab labore doloribus incidunt commodi veniam
          iusto beatae quaerat!
        </p>
      </AuthorLayout>
    </>
  );
}
