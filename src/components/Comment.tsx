import Image from "next/image";
import { useState } from "react";

export interface CommentType {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  replies?: CommentType[];
}

interface CommentProps {
  comment: CommentType;
  depth?: number;
}

function Comment({ comment, depth = 0 }: CommentProps) {
  const [showReplies, setShowReplies] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Reddit-style indentation: each level adds margin
  const getIndentClass = (depth: number) => {
    if (depth === 0) return "";
    const indentMap: Record<number, string> = {
      1: "ml-8",
      2: "ml-16",
      3: "ml-24",
      4: "ml-32",
    };
    return indentMap[Math.min(depth, 4)] || "ml-32";
  };

  const indentClass = getIndentClass(depth);
  const borderClass =
    depth > 0 ? "border-l-2 border-gray-200 dark:border-gray-700 pl-4" : "";

  return (
    <div className={`${indentClass} ${borderClass}`}>
      <article className="p-4 text-base bg-white rounded-lg dark:bg-gray-900 mb-4">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <Image
                className="mr-2 w-6 h-6 rounded-full"
                width={24}
                height={24}
                src={comment.avatar}
                alt={comment.author}
              />
              {comment.author}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={comment.date} title={comment.date}>
                {new Date(comment.date).toLocaleDateString()}
              </time>
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
        </footer>
        <p className="text-gray-500 dark:text-gray-400 text-left mb-4">
          {comment.content}
        </p>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
          >
            <svg
              className="mr-1.5 w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
            Reply
          </button>
          {comment.replies && comment.replies.length > 0 && (
            <button
              type="button"
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
            >
              {showReplies ? "Hide" : "Show"} {comment.replies.length} replies
            </button>
          )}
        </div>

        {showReplyForm && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <textarea
              className="w-full p-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              placeholder="Write a reply..."
            />
            <div className="mt-2 space-x-2">
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Reply
              </button>
              <button
                onClick={() => setShowReplyForm(false)}
                className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </article>

      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
