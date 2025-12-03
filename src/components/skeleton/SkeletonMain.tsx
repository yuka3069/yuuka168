"use client";

import React from "react";

const SkeletonMain: React.FC = () => {
  return (
    <main className="mb-auto">
      {/* 页面大标题区域 */}
      <div className="pt-6 pb-6">
        <div className="h-9 w-48 sm:h-10 sm:w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      <div className="flex sm:space-x-24">
        {/* 左侧侧边栏 (仅在 sm 尺寸以上显示) - 对应原代码中的 Categories 列表 */}
        <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-col rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70">
          <div className="px-6 py-4 animate-pulse space-y-4">
            {/* 侧边栏标题 */}
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* 模拟分类列表项 */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 右侧文章列表区域 */}
        <div className="flex-1">
          <ul className="space-y-5">
            {" "}
            {/* 对应原代码中的 space-y-XXX 间距 */}
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="py-5 animate-pulse">
                <article className="flex flex-col space-y-2 xl:space-y-0">
                  {/* 发布时间 */}
                  <div className="mb-2 h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />

                  <div className="space-y-3">
                    {/* 文章标题 */}
                    <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

                    {/* 标签 (Tags) */}
                    <div className="flex flex-wrap gap-3">
                      <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>

                    {/* 文章摘要 (Prose) */}
                    <div className="space-y-2 pt-1">
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* 底部翻页导航 (Pagination) */}
          <div className="space-y-2 pt-6 pb-8 md:space-y-5 animate-pulse">
            <div className="flex justify-between">
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />{" "}
              {/* Previous */}
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />{" "}
              {/* 1 of 2 */}
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />{" "}
              {/* Next */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SkeletonMain;
