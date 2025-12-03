import React from "react";

const AvatarSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-x-2 pt-8 animate-pulse">
      {/* 1. 头像 (Avatar) - 对应 h-48 w-48 rounded-full */}
      <div className="h-48 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />

      {/* 2. 名字 (Name) - 对应 h3.pt-4.pb-2 */}
      <div className="pt-4 pb-2">
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* 3. 职位和公司 (Occupation & Company) - 对应两个 div 文本 */}
      <div className="space-y-2 flex flex-col items-center">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* 4. 社交图标栏 (Social Icons) - 对应 flex space-x-3 pt-6 */}
      <div className="flex space-x-3 pt-6">
        {/* 模拟 4 个社交图标 */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarSkeleton;
