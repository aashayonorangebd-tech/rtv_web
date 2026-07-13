"use client";

import { useState } from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

export default function SpecialReportCarousel({
  stories,
}: {
  stories?: StoryModel[];
}) {
  if (!stories || stories.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = stories.length;
  const visibleCount = 4;
  const maxIndex = Math.max(0, totalItems - visibleCount);

  return (
    <section className="section-padding">
      <div className="main-container sm:border-2 sm:border-rtv-border-clr sm:py-5 shadow-sm rounded dark:sm:border-gray-700">
        <SectionHeader title="বিশেষ প্রতিবেদন" href="/special-report" />

        <div className="mt-5 relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
            >
              {stories.map((item) => (
                <div
                  key={item.storyId}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <a
                    href={storyPath(item)}
                    className="flex flex-wrap justify-between gap-x-5 gap-y-2.5 content-start text-[#2F343F] aspect-video group sm:px-2.5"
                  >
                    <div className="w-full relative max-w-full overflow-hidden max-sm:rounded-md">
                      <div className="relative">
                        <img
                          src={item.fileName}
                          alt={item.mainTitle}
                          className="object-cover object-center max-w-full aspect-video"
                          loading="lazy"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-16 w-16 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="main-title-post dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300">
                        {item.mainTitle}
                      </h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={activeIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#f7f7f7] hover:bg-opacity-100 rounded-full p-3 text-black ${
              activeIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "bg-opacity-70 cursor-pointer"
            }`}
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            aria-label="Previous"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em">
              <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
            </svg>
          </button>

          <button
            disabled={activeIndex >= maxIndex}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#f7f7f7] hover:bg-opacity-100 rounded-full p-3 text-black ${
              activeIndex >= maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "bg-opacity-70 cursor-pointer"
            }`}
            onClick={() => setActiveIndex((prev) => Math.min(maxIndex, prev + 1))}
            aria-label="Next"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em">
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
