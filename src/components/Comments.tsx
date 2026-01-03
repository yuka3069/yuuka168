"use client";

import { useState, useMemo } from "react";
import siteMetadata from "@/constants/siteMetadata";
import Comment, { CommentType } from "./Comment";

// 模拟评论数据
const mockComments: CommentType[] = [
  {
    id: "1",
    author: "张小明",
    avatar: "/images/canada/lake.jpg",
    content:
      "这篇文章写得真好！我从中学到了很多实用的技巧，特别是关于React Hooks的使用方法。",
    date: "2024-12-01T10:30:00Z",
    replies: [
      {
        id: "1-1",
        author: "李小红",
        avatar: "/images/canada/lake.jpg",
        content: "同感！我也觉得Hooks部分特别有用，已经在项目中开始实践了。",
        date: "2024-12-01T11:15:00Z",
        replies: [
          {
            id: "1-1-1",
            author: "王开发",
            avatar: "/images/canada/lake.jpg",
            content:
              "你们用的是哪个版本的React？我在18版本上遇到了一些兼容性问题。",
            date: "2024-12-01T12:00:00Z",
          },
        ],
      },
      {
        id: "1-2",
        author: "陈程序员",
        avatar: "/images/canada/lake.jpg",
        content: "作者能分享一下完整的代码示例吗？想深入学习一下。",
        date: "2024-12-01T14:20:00Z",
      },
    ],
  },
  {
    id: "2",
    author: "刘前端",
    avatar: "/images/canada/lake.jpg",
    content:
      "文章结构清晰，讲解详细。不过我觉得在性能优化这块还可以再深入一些，比如谈谈memo和useMemo的最佳实践。",
    date: "2024-12-01T16:45:00Z",
    replies: [
      {
        id: "2-1",
        author: "马全栈",
        avatar: "/images/canada/lake.jpg",
        content:
          "确实，性能优化是个大话题。我建议作者可以单独写一篇关于React性能优化的文章。",
        date: "2024-12-01T17:30:00Z",
      },
    ],
  },
  {
    id: "3",
    author: "周设计师",
    avatar: "/images/canada/lake.jpg",
    content:
      "作为设计师，我很喜欢这种技术文章。虽然有些代码我不太懂，但整体思路很清楚，有助于我理解前端开发的工作流程。",
    date: "2024-12-02T09:15:00Z",
  },
  {
    id: "4",
    author: "吴同学",
    avatar: "/images/canada/lake.jpg",
    content: "刚开始学React，这篇文章来得正是时候！请问有推荐的学习路径吗？",
    date: "2024-12-02T11:20:00Z",
    replies: [
      {
        id: "4-1",
        author: "张小明",
        avatar: "/images/canada/lake.jpg",
        content:
          "建议先掌握JavaScript基础，然后学习React官方文档，最后多做项目实践。",
        date: "2024-12-02T12:10:00Z",
      },
      {
        id: "4-2",
        author: "李导师",
        avatar: "/images/canada/lake.jpg",
        content:
          "推荐看看这个学习路线图：JavaScript → ES6+ → React基础 → React Hooks → 项目实战。",
        date: "2024-12-02T13:05:00Z",
      },
    ],
  },
];

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false);

  // 计算评论总数（包括回复）
  const totalCommentCount = useMemo(() => {
    const countComments = (comments: CommentType[]): number => {
      return comments.reduce((count, comment) => {
        return (
          count + 1 + (comment.replies ? countComments(comment.replies) : 0)
        );
      }, 0);
    };
    return countComments(mockComments);
  }, []);

  if (!siteMetadata.comments?.provider) {
    return null;
  }

  return (
    <>
      {loadComments ? (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
          <div className="max-w-4xl ml-0 px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                讨论 ({totalCommentCount})
              </h2>
            </div>

            <form className="mb-8">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="写下你的评论..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 hover:bg-primary-800"
              >
                发表评论
              </button>
            </form>

            <div className="comments-list">
              {mockComments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <button
          onClick={() => setLoadComments(true)}
          className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          加载评论 ({totalCommentCount})
        </button>
      )}
    </>
  );
}
