"use client";

// import { Comments as CommentsComponent } from "pliny/comments";
import { useState } from "react";
import siteMetadata from "@/constants/siteMetadata";
import Comment from "./Comment";

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false);

  if (!siteMetadata.comments?.provider) {
    return null;
  }
  return (
    <>
      {loadComments ? (
        //TODO: find alternatives for commnents components
        <>
          <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl ml-0 px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Discussion (20)
                </h2>
              </div>
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Post comment
                </button>
              </form>

              {/* COMMENT 1 */}
              <Comment />
              <Comment />

              {/* 重复类似结构的评论（Jese Leos, Bonnie Green, Helene Engels）省略，但格式一致，继续复制转换即可 */}
            </div>
          </section>
        </>
      ) : (
        // <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
    </>
  );
}
