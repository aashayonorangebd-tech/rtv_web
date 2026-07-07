// ─── SpecialReportCarousel ────────────────────────────────────────────────
// Client-side horizontal carousel for the "বিশেষ প্রতিবেদন" section.
// Features:
//   - 10 placeholder items with Bengali titles & picsum images
//   - Shows 4 items on lg, 3 on md, 2 on sm, 1 on mobile
//   - Left/right navigation arrows (disabled at boundaries)
//   - translateX sliding animation (300ms ease-in-out)
//   - Play-button SVG overlay on each thumbnail
//
// Uses useState for activeIndex tracking; no external carousel lib.
// ─────────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

// ── Placeholder carousel data: 10 items with Bengali headlines ──────────
const CAROUSEL_ITEMS = [
  { title: "শয়তানের সাগর! যেখানে ঢুকলে আর ফিরে আসে না কেউ!", id: 1 },
  {
    title: "কোলে গন্ধগোকুল, পেছনে সজারু কে এই বাস্তবের 'ডিজনি প্রিন্সেস'?",
    id: 2,
  },
  { title: "ইসরায়েলিদের চোখে যুদ্ধে 'জয়ী' হয়েছে ইরান!", id: 3 },
  { title: "বাংলাদেশি শ্রমিকদের জন্য খুলল মালয়েশিয়ার শ্রমবাজার", id: 4 },
  {
    title: "সেনাবাহিনীর গ্রীষ্মকালীন মহড়া আকস্মিক পরিদর্শন করলেন প্রধানমন্ত্রী",
    id: 5,
  },
  {
    title: "১৬ জেলায় বন্যার শঙ্কা, এইচএসসি পরীক্ষার্থীদের যে বার্তা দিলো আন্তঃশিক্ষা বোর্ড",
    id: 6,
  },
  { title: "জয়পুরহাটে ট্রাক-ইজিবাইকের সংঘর্ষে ২ জনের মৃত্যু", id: 7 },
  { title: "বিশ্ববাজারে আরও কমল সোনার দাম", id: 8 },
  { title: "তুরস্কে ন্যাটো শীর্ষ সম্মেলন শুরু, ৩ বিষয়ে অগ্রাধিকার", id: 9 },
  { title: "আরও কমলো জেট ফুয়েলের দাম", id: 10 },
];

export default function SpecialReportCarousel() {
  // ── Carousel state: current slide index ──────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Derived values ───────────────────────────────────────────────────
  const totalItems = CAROUSEL_ITEMS.length; // 10
  const visibleCount = 4; // items shown per view on lg screens
  const maxIndex = Math.max(0, totalItems - visibleCount); // 6

  return (
    <section className="section-padding">
      {/* ── Outer container: border, shadow, rounded ──────────────────── */}
      <div className="main-container sm:border-2 sm:py-5 shadow-sm rounded dark:border-gray-700 sm:px-4">
        {/* Section header: "বিশেষ প্রতিবেদন" + আরও link */}
        <SectionHeader title="বিশেষ প্রতিবেদন" href="/special-report" />

        {/* ── Carousel track + navigation ─────────────────────────────── */}
        <div className="mt-5 relative">
          {/* ── Overflow clip wrapper ──────────────────────────────────── */}
          <div className="overflow-hidden">
            {/* ── Sliding track — translateX shifts by activeIndex ────────
                Each slide = 100/visibleCount = 25% width on lg           */}
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * (100 / visibleCount)}%)`,
              }}
            >
              {CAROUSEL_ITEMS.map((item) => (
                /* ── Single slide — 1 col mobile, 2 sm, 3 md, 4 lg ─── */
                <div
                  key={item.id}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  {/* Card wrapper: image + title */}
                  <div className="flex flex-wrap justify-between gap-x-5 gap-y-2.5 content-start text-[#2F343F] aspect-video group sm:px-2.5">
                    {/* Image container with play button overlay */}
                    <div className="w-full relative max-w-full overflow-hidden max-sm:rounded-md">
                      <div className="relative">
                        <img
                          src={`https://picsum.photos/seed/${item.id}/550/309`}
                          alt={item.title}
                          className="object-cover object-center max-w-full aspect-video"
                          loading="lazy"
                        />
                        {/* ── Centered play-button SVG overlay ────────── */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-16 w-16 text-white"
                          >
                            {/* Outer circle */}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                            {/* Play triangle */}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Title — main-title-post class: 1.2rem, bold, dark text */}
                    <div>
                      <h3 className="main-title-post dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── LEFT NAV ARROW ───────────────────────────────────────────
              Positioned absolute-left, centered vertically.
              Disabled (dimmed) when activeIndex === 0.                 */}
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
            {/* Left chevron SVG */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
            >
              <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
            </svg>
          </button>

          {/* ── RIGHT NAV ARROW ──────────────────────────────────────────
              Positioned absolute-right, centered vertically.
              Disabled when activeIndex >= maxIndex (last page).         */}
          <button
            disabled={activeIndex >= maxIndex}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#f7f7f7] hover:bg-opacity-100 rounded-full p-3 text-black ${
              activeIndex >= maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "bg-opacity-70 cursor-pointer"
            }`}
            onClick={() =>
              setActiveIndex((prev) => Math.min(maxIndex, prev + 1))
            }
            aria-label="Next"
          >
            {/* Right chevron SVG */}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
            >
              <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
