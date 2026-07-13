// ─── InternationalSection ──────────────────────────────────────────────
// আন্তর্জাতিক section on homepage.
// Layout (12-col):
//   ┌──────────────────┬──────────────┬─────────────────────────┐
//   │ 6-col            │ 2-col        │ 4-col                   │
//   │ 1 featured card  │ 2 small      │ 4 horizontal cards      │
//   │ (img+title+sub)  │ stacked      │ (grid: 7-col text,      │
//   │ border-r         │ border-r     │  5-col image)           │
//   │                  │ hr between   │ hr between each         │
//   └──────────────────┴──────────────┴─────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

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
  const middleCards = [stories[1], stories[2]].filter(Boolean);
  const rightCards = [stories[3], stories[4], stories[5], stories[6]].filter(Boolean);

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b border-rtv-border-clr dark:border-gray-700">
          {/* ─── 6-col LEFT: 1 featured card ──────────────────────────── */}
          <div className="col-span-6 md:col-span-6 lg:col-span-6 border-r border-[#e2e2e2] pr-2.5 dark:border-gray-700">
            <a className="flex flex-col w-full group" href={storyPath(bigCard)}>
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={bigCard.fileName}
                  alt={bigCard.mainTitle}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="pt-2 my-2.5">
                <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
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

          {/* ─── 2-col MIDDLE: 2 stacked small cards ──────────────────── */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 border-r border-[#e2e2e2] pr-2.5 dark:border-gray-700">
            {middleCards.map((story, i) => (
              <React.Fragment key={story.storyId}>
                <a className="flex flex-col w-full group" href={storyPath(story)}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={story.fileName}
                      alt={story.mainTitle}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="pt-2">
                    <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                      {story.mainTitle}
                    </h3>
                  </div>
                </a>
                {i === 0 && <hr className="border-[#e2e2e2] dark:border-gray-700 pt-5" />}
              </React.Fragment>
            ))}
          </div>

          {/* ─── 4-col RIGHT: 4 horizontal cards ──────────────────────── */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4 flex flex-col gap-y-2.5">
            {rightCards.slice(0, 4).map((story, i) => (
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
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={story.fileName}
                        alt={story.mainTitle}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
