// ─── SidebarTabWidget ─────────────────────────────────────────────────────
// Tab-switching widget for the 3-col sidebar in SubHeroGrid.
// Two tabs: "পাঠক প্রিয়" (popular) and "সর্বশেষ" (latest).
//
// Layout (top → bottom):
//   ┌──────────────────┐
//   │ পাঠক প্রিয় | সর্বশেষ │  ← 50/50 tabs, active = blue bg
//   ├──────────────────┤
//   │ Headline 1       │  ← scrollable list (h-min sm:h-[25rem])
//   │ Headline 2       │     scrollbar matches tab color (#2c4b9c)
//   │ ...              │
//   ├──────────────────┤
//   │    সব খবর        │  ← blue button
//   ├──────────────────┤
//   │  300×250 Ad      │  ← placeholder below tabs
//   └──────────────────┘
//
// Props:
//   latestStories  : StoryModel[] for "সর্বশেষ" tab (API-driven)
//   popularStories : StoryModel[] for "পাঠক প্রিয়" tab (API-driven)
// ─────────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";

const TABS = [
  { key: "popular", label: "পাঠক প্রিয়" },
  { key: "latest", label: "সর্বশেষ" },
];

export default function SidebarTabWidget({
  latestStories,
  popularStories,
  showBottomAd = true,
}: {
  latestStories: StoryModel[];
  popularStories: StoryModel[];
  showBottomAd?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("popular");
  const stories = activeTab === "latest" ? latestStories : popularStories;

  return (
    <div className="w-full">
      {/* ── TAB NAVIGATION ──────────────────────────────────────────────
          50/50 split, active tab = blue bg + white bold text             */}
      <div className="text-base text-[#555] whitespace-nowrap mb-4">
        <div className="flex gap-x-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-center dark:text-white dark:border py-0.5 rounded-md cursor-pointer transition duration-300 ${
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

      {/* ── SCROLLABLE HEADLINE LIST ────────────────────────────────────
          h-min sm:h-[25rem] → auto on mobile, fixed 25rem scroll on sm+
          Scrollbar styled to match tab color (#2c4b9c)                 */}
      <div className="w-full border-0">
        <div
          className="flex flex-col justify-start gap-y-1 transition-opacity duration-300 overflow-y-auto h-min sm:h-[25rem] opacity-100"
          style={{
            scrollbarColor: "#2c4b9c #e2e8f0",
            scrollbarWidth: "thin",
          }}
        >
          {stories.slice(0, 10).map((story, idx) => (
            <div
              key={story.storyId || idx}
              className="flex flex-col items-start justify-center py-2.5 border-b border-[#dddddd] dark:border-gray-700 last:border-b-0"
            >
              <a href={storyPath(story)} className="w-full">
                <p className="px-[5px] text-[#555] dark:text-slate-300 hover:text-[#0d6efd] dark:hover:text-blue-300 flex items-center text-left leading-relaxed text-[15px]">
                  {story.mainTitle}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── "সব খবর" BUTTON ────────────────────────────────────────────
          Full-width blue button at 80% opacity, linking to all news     */}
      <a
        href="/all-news"
        className="block mt-4"
      >
        <div className="mx-auto py-0.5 bg-[#2c4b9c]/80 hover:bg-[#2c4b9c] text-center rounded transition-colors cursor-pointer">
          <p className="text-base text-white font-bold">সব খবর</p>
        </div>
      </a>

      {/* ── AD PLACEHOLDER (300×250) below the tab content ─────────────── */}
      {showBottomAd && (
        <div className="w-full min-h-[250px] bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400 mt-4">
          বিজ্ঞাপন — 300×250
        </div>
      )}
    </div>
  );
}
