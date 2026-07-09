// ─── CountrySection ────────────────────────────────────────────────────
// দেশজুড়ে section on homepage.
// Small cards match sub-hero grid (aspect-video, h-20 title, hr).
// Space divided same as sub-hero: small cards = 3+3 cols, big card = 6 cols.
// Border-right only on col2.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

function SmallCard({ story }: { story: StoryModel }) {
  return (
    <a className="flex flex-col w-full group" href={storyPath(story)}>
      <div className="relative">
        <img
          src={story.fileName}
          alt={story.mainTitle}
          className="object-cover object-center max-w-full aspect-video"
          loading="lazy"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="pt-2 h-20">
        <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-blue-500">
          {story.mainTitle}
        </h3>
      </div>
      <hr className="border-slate-300 dark:border-gray-700" />
    </a>
  );
}

export default function CountrySection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  if (stories.length < 3) return null;

  const col1 = [stories[1], stories[3]].filter(Boolean);
  const col2 = [stories[2], stories[4]].filter(Boolean);
  const col3 = stories[5];

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b dark:border-gray-700">
          {/* ─── 3-col LEFT: 2 small cards (idx 1,3) — no border ─────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-3">
            <div className="flex flex-col gap-2.5">
              {col1.map((story) => (
                <SmallCard key={story.storyId} story={story} />
              ))}
            </div>
          </div>

          {/* ─── 3-col MIDDLE: 2 small cards (idx 2,4) — border-r only here ──── */}
          <div className="col-span-full md:col-span-12 lg:col-span-3 md:border-r border-slate-300 md:pr-2.5 dark:border-gray-700">
            <div className="flex flex-col gap-2.5">
              {col2.map((story) => (
                <SmallCard key={story.storyId} story={story} />
              ))}
            </div>
          </div>

          {/* ─── 6-col RIGHT: 1 big card (idx 5) ────────────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-6">
            {col3 && (
              <a
                className="flex flex-col w-full group h-full"
                href={storyPath(col3)}
              >
                <div className="relative flex-1 min-h-[250px]">
                  <img
                    src={col3.fileName}
                    alt={col3.mainTitle}
                    className="object-cover object-center w-full h-full absolute inset-0"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2 my-2.5">
                  <h3 className="dark:text-white text-[1.5rem] leading-[28px] font-bold group-hover:text-blue-500">
                    {col3.mainTitle}
                  </h3>
                </div>
                {col3.subTitle && (
                  <p className="text-base text-[#555] dark:text-slate-300">
                    {col3.subTitle}
                  </p>
                )}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
