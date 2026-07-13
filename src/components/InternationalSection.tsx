// ─── InternationalSection ──────────────────────────────────────────────
// আন্তর্জাতিক section on homepage.
// Layout (12-col):
//   ┌──────────────────┬──────────────┬─────────────────────────┐
//   │ 6-col            │ 3-col        │ 3-col                   │
//   │ 1 big card       │ 2 small      │ 2 horizontal cards      │
//   │ (tall img+title) │ cards (sub- │ (text left, img right)  │
//   │ border-r         │ hero style) │                         │
//   │                  │ border-r    │                         │
//   └──────────────────┴──────────────┴─────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

export default function InternationalSection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  if (stories.length < 3) return null;

  const bigCard = stories[0];
  const col2 = [stories[1], stories[2]].filter(Boolean);
  const col3 = [stories[3], stories[4], stories[5], stories[6]].filter(Boolean);

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b border-rtv-border-clr dark:border-gray-700 items-stretch">
          {/* ─── 6-col LEFT: 1 big card (idx 0) — border-r ───────────── */}
          <div className="col-span-6 md:pr-3 md:border-r border-[#e2e2e2] dark:border-gray-700">
            <a className="flex flex-col w-full group h-full" href={storyPath(bigCard)}>
              <div className="relative flex-1 min-h-[250px]">
                <img
                  src={bigCard.fileName}
                  alt={bigCard.mainTitle}
                  className="object-cover object-center w-full h-full absolute inset-0"
                  loading="lazy"
                />
              </div>
              <div className="pt-2 my-2.5">
                <h3 className="dark:text-white text-[1.5rem] leading-[28px] font-bold group-hover:text-rtv-blue-text-hover">
                  {bigCard.mainTitle}
                </h3>
              </div>
              {bigCard.subTitle && (
                <p className="text-base text-[#555] dark:text-slate-300">
                  {bigCard.subTitle}
                </p>
              )}
            </a>
          </div>

          {/* ─── 2-col MIDDLE: 2 small cards (idx 1,2) — border-r ──────── */}
          <div className="col-span-2 md:pr-3 md:border-r border-[#e2e2e2] dark:border-gray-700">
            <div className="flex flex-col gap-2.5 h-full">
              {col2.map((story, i) => (
                <a
                  key={story.storyId}
                  className="flex flex-col w-full group"
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
                  <div className="pt-2 min-h-[60px]">
                    <h3 className="dark:text-white text-[0.95rem] leading-[20px] font-bold group-hover:text-rtv-blue-text-hover line-clamp-3">
                      {story.mainTitle}
                    </h3>
                  </div>
                  {i === 0 && <hr className="border-[#e2e2e2] dark:border-gray-700" />}
                </a>
              ))}
            </div>
          </div>

          {/* ─── 4-col RIGHT: 4 horizontal cards (text left, img right) ────── */}
          <div className="col-span-4">
            <div className="flex flex-col gap-2.5 h-full">
              {col3.map((story) => (
                <div key={story.storyId} className="pb-3 mb-2 border-b border-[#e2e2e2] dark:border-gray-700 last:border-b-0 last:pb-0 last:mb-0">
                  <a
                    href={storyPath(story)}
                    className="flex flex-row items-start gap-2 group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-base leading-[22px] text-[#555] dark:text-slate-300 group-hover:text-rtv-blue-text-hover dark:hover:text-blue-300 font-normal line-clamp-5">
                        {story.mainTitle}
                      </p>
                    </div>
                    <div className="w-28 h-[70px] shrink-0 overflow-hidden rounded">
                      <img
                        src={story.fileName}
                        alt={story.mainTitle}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
