// ─── CategorySection ──────────────────────────────────────────────────────
// Reusable category block for API-driven sections (জাতীয়, রাজনীতি, etc.).
//
// Desktop layout (12-column):
//   ┌────────────────────────────────────────────┬──────────────────┐
//   │  9-col Main (border-right)                 │  3-col Sidebar   │
//   │  ┌──────────┬────────────────────────────┐ │  Headline list   │
//   │  │ 4-col    │ 8-col Featured Story       │ │  from remaining  │
//   │  │ side (2) │ (image + 1.5rem title      │ │  stories +       │
//   │  │ 1.2rem   │  + subtitle)               │ │  "সব খবর" btn   │
//   │  └──────────┴────────────────────────────┘ │                  │
//   └────────────────────────────────────────────┴──────────────────┘
//
// Props:
//   title   : section heading (e.g. "জাতীয়")
//   href    : category URL
//   stories : StoryModel[] — first = featured (8-col), next 2 = side (4-col)
//             remaining stories feed the sidebar headline list
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

export default function CategorySection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  if (stories.length < 3) return null;

  // ── Slot stories: first 2 medium, 3rd bigger, rest in sidebar ─────────
  const sideStories = stories.slice(0, 2); // two 4-col medium cards
  const featured = stories[2];             // larger 8-col card
  const sidebarStories = stories.slice(3); // remaining → sidebar list

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b border-[#e5e7eb] dark:border-gray-700">
          {/* ─── 9-COL MAIN CONTENT (border-right) ──────────────────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-9 border-r border-[#e2e2e2] md:pr-2.5 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* ── Side stories (4 cols) ───────────────────────────── */}
              <div className="col-span-4 sm:flex sm:flex-col gap-5">
                {sideStories.map((story) => (
                  <a
                    key={story.storyId}
                    className="flex flex-col w-full group mb-5 last:mb-0"
                    href={storyPath(story)}
                  >
                    <div className="relative">
                      <img
                        src={story.fileName}
                        alt={story.mainTitle}
                        className="object-cover object-center max-w-full aspect-video"
                        loading="lazy"
                      />
                    </div>
                    <div className="pt-2">
                      <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                        {story.mainTitle}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>

              {/* ── Featured story (8 cols) ─────────────────────────── */}
              <div className="col-span-8">
                <a
                  className="flex flex-col w-full group"
                  href={storyPath(featured)}
                >
                  <div className="relative">
                    <img
                      src={featured.fileName}
                      alt={featured.mainTitle}
                      className="object-cover object-center max-w-full aspect-video"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-2 my-2.5">
                    <h3 className="dark:text-white text-[1.5rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                      {featured.mainTitle}
                    </h3>
                  </div>
                  {featured.subTitle && (
                    <p className="text-base text-[#555] dark:text-slate-300">
                      {featured.subTitle}
                    </p>
                  )}
                </a>
              </div>
            </div>
          </div>

          {/* ─── 3-COL SIDEBAR — image-left, text-right cards ─────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-3 flex flex-col gap-y-2.5 justify-between">
            {sidebarStories.slice(0, 4).map((story, i) => (
              <React.Fragment key={story.storyId}>
                <a
                  href={storyPath(story)}
                  className="grid grid-cols-12 md:grid-cols-12 gap-2 items-center group"
                >
                  <div className="md:order-last lg:order-none col-span-7">
                    <h3 className="font-semibold group-hover:text-rtv-blue-text-hover hover:cursor-pointer text-lg dark:text-white">
                      {story.mainTitle}
                    </h3>
                  </div>
                  <div className="col-span-5">
                    <div className="relative">
                      <img
                        src={story.fileName}
                        alt={story.mainTitle}
                        className="object-cover object-center max-w-full aspect-video"
                        loading="lazy"
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </a>
                {i < 3 && <hr className="border-[#e2e2e2] dark:border-gray-700" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
