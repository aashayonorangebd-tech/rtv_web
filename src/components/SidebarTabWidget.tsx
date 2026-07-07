"use client";

import { useState } from "react";
import type { StoryModel } from "@/lib/types";

const TABS = [
  { key: "popular", label: "পাঠক প্রিয়" },
  { key: "latest", label: "সর্বশেষ" },
];

export default function SidebarTabWidget({
  latestStories,
  popularStories,
}: {
  latestStories: StoryModel[];
  popularStories: StoryModel[];
}) {
  const [activeTab, setActiveTab] = useState("popular");
  const stories = activeTab === "latest" ? latestStories : popularStories;

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="text-base text-black whitespace-nowrap mb-4">
        <div className="flex gap-x-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-center dark:text-white dark:border py-1 rounded-md cursor-pointer transition duration-300 ${
                  isActive
                    ? "bg-[#2c4b9c] text-white font-bold"
                    : "bg-transparent text-gray-700 dark:text-gray-300 hover:text-[#2c4b9c]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List Content */}
      <div className="w-full border-0">
        <div className="flex flex-col justify-start gap-y-1 transition-opacity duration-300 overflow-y-auto h-min sm:h-[25rem] opacity-100 no-scrollbar">
          {stories.slice(0, 10).map((story, idx) => (
            <div
              key={story.storyId || idx}
              className="flex flex-col items-start justify-center py-2.5 border-b border-[#dddddd] dark:border-gray-800 last:border-b-0"
            >
              <a href={story.canonicalUrl} className="w-full">
                <p className="px-[5px] text-black dark:text-slate-300 hover:text-[#005adf] dark:hover:text-blue-300 flex items-center text-left leading-relaxed text-[15px] font-semibold">
                  {story.mainTitle}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* "সব খবর" (All News) Button */}
      <a
        href="https://rtvonline.com/all-news/all-most-viewed-news"
        className="block mt-4"
      >
        <div className="mx-auto py-1 bg-[#5d68c2] hover:bg-[#4c56af] text-center rounded transition-colors cursor-pointer">
          <p className="text-base text-white font-bold">সব খবর</p>
        </div>
      </a>
    </div>
  );
}