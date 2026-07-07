"use client";

import { useState } from "react";
import type { StoryModel } from "@/lib/types";

const TABS = [
  { key: "latest", label: "সর্বশেষ" },
  { key: "popular", label: "পাঠক প্রিয়" },
];

export default function SidebarTabWidget({
  latestStories,
  popularStories,
}: {
  latestStories: StoryModel[];
  popularStories: StoryModel[];
}) {
  const [activeTab, setActiveTab] = useState("latest");
  const stories =
    activeTab === "latest" ? latestStories : popularStories;

  return (
    <div>
      <div className="flex border-b border-[#dddddd] dark:border-gray-800">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "text-[#0055a5] dark:text-blue-400 border-b-2 border-[#0055a5] dark:border-blue-400"
                : "text-[#666666] dark:text-gray-400 hover:text-[#0055a5] dark:hover:text-blue-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-3">
        {stories.slice(0, 5).map((story, idx) => (
          <a
            key={story.storyId}
            href={story.canonicalUrl}
            className="flex gap-3 py-2.5 border-b border-[#dddddd] dark:border-gray-800 last:border-b-0 group"
          >
            <span className="text-[15px] font-bold text-[#0055a5] dark:text-blue-400 w-6 shrink-0 leading-5">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h4 className="text-[14px] font-medium leading-[20px] text-black dark:text-white group-hover:text-[#0055a5] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {story.mainTitle}
            </h4>
          </a>
        ))}
      </div>
    </div>
  );
}
