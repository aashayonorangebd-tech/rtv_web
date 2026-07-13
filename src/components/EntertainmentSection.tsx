// ─── EntertainmentSection ─────────────────────────────────────────────────
// Two-column layout for বিনোদন:
//   Left  → 1 featured card (image + title + subtitle at 1.2rem)
//   Right → 4 horizontal cards in 12-col grid (9-col text, 3-col image)
//   Border between columns, hr separators between right items.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

export default function EntertainmentSection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  if (stories.length < 1) return null;

  const featured = stories[0];
  const sideStories = stories.slice(1, 5);

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b border-[#e5e7eb] dark:border-gray-700">
          {/* ─── Left: featured card ──────────────────────────────────── */}
          <div className="col-span-6 md:col-span-6 lg:col-span-6 border-r border-[#e2e2e2] pr-2.5 dark:border-gray-700">
            <a className="flex flex-col w-full group" href={storyPath(featured)}>
              <div className="relative">
                <img
                  src={featured.fileName}
                  alt={featured.mainTitle}
                  className="object-cover object-center max-w-full aspect-video"
                  loading="lazy"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="pt-2 my-2.5">
                <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
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

          {/* ─── Right: horizontal cards in 12-col grid ──────────────── */}
          <div className="col-span-6 flex flex-col gap-y-2.5">
            {sideStories.slice(0, 4).map((story, i) => (
              <React.Fragment key={story.storyId}>
                <a
                  href={storyPath(story)}
                  className="grid grid-cols-12 md:grid-cols-12 gap-2 items-center group"
                >
                  <div className="md:order-last lg:order-none col-span-9">
                    <h3 className="font-semibold group-hover:text-rtv-blue-text-hover hover:cursor-pointer text-xl pb-3 dark:text-white">
                      {story.mainTitle}
                    </h3>
                    {story.subTitle && (
                      <p className="text-base font-semibold text-slate-500 dark:text-slate-300">
                        {story.subTitle}
                      </p>
                    )}
                  </div>
                  <div className="col-span-3">
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
