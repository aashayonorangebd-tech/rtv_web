// ─── CountrySection ────────────────────────────────────────────────────
// দেশজুড়ে section on homepage.
// Layout:
//   - Filter bar (division/district/upazila selects + search button)
//   - Left 6-col: 2×2 grid of small cards (image + 1.2rem title)
//   - Right 6-col: 1 featured card (image + 1.2rem title + subtitle)
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

  const leftStories = stories.slice(0, 4);
  const rightStory = stories[4];

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        {/* ─── Filter bar: division/district/upazila selects ──────────── */}
        <div className="bg-[#F4F4F4] dark:bg-slate-700 my-5 max-sm:my-0">
          <form className="w-full py-3">
            <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-x-5">
              <div className="w-full md:w-full px-3 mb-3 md:mb-0">
                <div className="relative">
                  <select className="max-sm:py-2 text-[1.2rem] block appearance-none w-full bg-white border border-white text-gray-700 py-3 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer">
                    <option value="" disabled selected>বিভাগ</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-full px-3 mb-3 md:mb-0">
                <div className="relative">
                  <select className="max-sm:py-2 text-[1.2rem] block appearance-none w-full bg-white border border-white text-gray-700 py-3 pr-8 rounded focus:outline-none focus:bg-white focus:border-hover-text-color cursor-pointer">
                    <option value="" disabled selected>জেলা</option>
                  </select>
                </div>
              </div>
              <div className="w-full md:w-full px-3 mb-3 md:mb-0">
                <div className="relative">
                  <select className="text-[1.2rem] block appearance-none w-full bg-white border border-white text-gray-700 py-3 max-sm:py-2 max-sm:text-[1.2rem] pr-8 rounded focus:outline-none focus:bg-white focus:border-hover-text-color cursor-pointer">
                    <option value="" disabled selected>উপজেলা</option>
                  </select>
                </div>
              </div>
              <div className="px-2.5">
                <button type="submit" disabled className="text-[1.5rem] text-white bg-hover-text-color w-full border-none font-medium rounded-lg px-20 py-3 text-center max-sm:text-[1.2rem] disabled:opacity-25 disabled:cursor-not-allowed">
                  খুঁজুন
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ─── Content: 6-col left (2×2 grid) + 6-col right (1 big card) ──── */}
        <div className="grid grid-cols-12 gap-2.5 border-b py-2.5">
          {/* ─── Left: 2×2 grid of 4 small cards ────────────────────────── */}
          <div className="col-span-full md:col-span-6 grid grid-cols-2 gap-5 border-r border-[#e2e2e2] pr-2.5 dark:border-gray-700">
            {leftStories.map((story) => (
              <div key={story.storyId}>
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
                  <div className="pt-2">
                    <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                      {story.mainTitle}
                    </h3>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* ─── Right: 1 featured card ────────────────────────────────── */}
          <div className="col-span-full md:col-span-6">
            {rightStory && (
              <div>
                <a className="flex flex-col w-full group" href={storyPath(rightStory)}>
                  <div className="relative">
                    <img
                      src={rightStory.fileName}
                      alt={rightStory.mainTitle}
                      className="object-cover object-center max-w-full aspect-video"
                      loading="lazy"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="pt-2 my-2.5">
                    <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                      {rightStory.mainTitle}
                    </h3>
                  </div>
                  {rightStory.subTitle && (
                    <p className="text-base text-[#555] dark:text-slate-300">
                      {rightStory.subTitle}
                    </p>
                  )}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
