// ─── CountrySection ────────────────────────────────────────────────────
// দেশজুড়ে section on homepage.
// Small cards match sub-hero grid (aspect-video, h-20 title, hr).
// Space divided: small cards = 3+3 cols, big card = 6 cols.
// Border-right only on col2; same padding on col1/col2 for equal images.
// ─────────────────────────────────────────────────────────────────────────

import React from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

export default function CountrySection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  if (stories.length < 5) return null;

  const col1 = [stories[1], stories[3]];
  const col2 = [stories[2], stories[4]];
  const col3 = stories[5];

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b dark:border-gray-700 items-stretch">
          {/* ─── 3-col LEFT: 2 small cards (idx 1,3) — same padding as col2 ──── */}
          <div className="col-span-3 md:pr-3">
            <div className="flex flex-col gap-2.5 h-full">
              {col1.map((story) => (
                <a key={story.storyId} className="flex flex-col w-full group" href={storyPath(story)}>
                  <div className="relative">
                    <img src={story.fileName} alt={story.mainTitle} className="object-cover object-center max-w-full aspect-video" loading="lazy" />
                  </div>
                  <div className="pt-2 h-20">
                    <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-[#0d6efd]">{story.mainTitle}</h3>
                  </div>
                  <hr className="border-[#e2e2e2] dark:border-gray-700" />
                </a>
              ))}
            </div>
          </div>

          {/* ─── 3-col MIDDLE: 2 small cards (idx 2,4) — border-r + same padding ──── */}
          <div className="col-span-3 md:pr-3 md:border-r border-[#e2e2e2] dark:border-gray-700">
            <div className="flex flex-col gap-2.5 h-full">
              {col2.map((story) => (
                <a key={story.storyId} className="flex flex-col w-full group" href={storyPath(story)}>
                  <div className="relative">
                    <img src={story.fileName} alt={story.mainTitle} className="object-cover object-center max-w-full aspect-video" loading="lazy" />
                  </div>
                  <div className="pt-2 h-20">
                    <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-[#0d6efd]">{story.mainTitle}</h3>
                  </div>
                  <hr className="border-[#e2e2e2] dark:border-gray-700" />
                </a>
              ))}
            </div>
          </div>

          {/* ─── 6-col RIGHT: 1 big card (idx 5) ────────────── */}
          <div className="col-span-6">
            {col3 && (
              <a className="flex flex-col w-full group h-full" href={storyPath(col3)}>
                <div className="relative flex-1 min-h-[250px]">
                  <img src={col3.fileName} alt={col3.mainTitle} className="object-cover object-center w-full h-full absolute inset-0" loading="lazy" />
                </div>
                <div className="pt-2 my-2.5">
                  <h3 className="dark:text-white text-[1.5rem] leading-[28px] font-bold group-hover:text-[#0d6efd]">{col3.mainTitle}</h3>
                </div>
                {col3.subTitle && <p className="text-base text-[#555] dark:text-slate-300">{col3.subTitle}</p>}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
