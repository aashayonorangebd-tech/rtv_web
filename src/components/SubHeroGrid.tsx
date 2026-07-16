// ─── SubHeroGrid ──────────────────────────────────────────────────────────
// Sits DIRECTLY below HeroSection using the identical 12-column outer grid
// so the 3-col right sidebar aligns perfectly with the lead section's sidebar.
//
// Desktop layout (12-col):
//   ┌───────────────────────────────────────────────────┬──────────────┐
//   │  9-col Content (border-r separates from sidebar) │  3-col       │
//   │  ┌─────────┬─────────┬─────────┐                │  Sidebar      │
//   │  │Card 1   │Card 2   │Card 3   │  ← row 1      │  ───────────  │
//   │  │border-r │border-r │no border│                │  Tab Switcher │
//   │  ├─────────┼─────────┼─────────┤                │  (API data)   │
//   │  │Card 4   │Card 5   │Card 6   │  ← row 2      │  Headline     │
//   │  │border-r │border-r │no border│                │  List + Ad    │
//   │  ├─────────┼─────────┼─────────┤                │               │
//   │  │Card 7   │Card 8   │Card 9   │  ← row 3      │               │
//   │  │border-r │border-r │no border│                │               │
//   │  └─────────┴─────────┴─────────┘                │               │
//   │  Every card has <hr> below it.                  │               │
//   │  Title: fixed h-20, 1.2rem bold.               │               │
//   └───────────────────────────────────────────────────┴──────────────┘
//
// Props:
//   stories         : StoryModel[] — 9 items rendered in a flat map
//   sidebarStories  : unused (maintained for compatibility)
//   popularStories  : API-driven list for "পাঠক প্রিয়" tab
//   latestStories   : API-driven list for "সর্বশেষ" tab
// ─────────────────────────────────────────────────────────────────────────

import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SidebarTabWidget from "@/components/SidebarTabWidget";
import Image from "next/image";

export default function SubHeroGrid({
  stories,
  popularStories = [],
  latestStories = [],
}: {
  stories: StoryModel[];
  sidebarStories: StoryModel[];
  popularStories: StoryModel[];
  latestStories: StoryModel[];
}) {
  if (!stories || stories.length === 0) return null;

  return (
    // ── Outer wrapper — mt-2 for top gap ──
    <div className="mt-2">
      <section className="dark:text-foreground">
        {/* ═══════════════════════════════════════════════════════════════
            12-COL GRID — IDENTICAL to HeroSection (gap-2.5)
            md:border-t pt-5 → horizontal separator from lead
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:border-t md:border-rtv-border-clr pt-5 dark:text-foreground">

          {/* ─── 9-COL LEFT CONTENT (border-r separates from sidebar) ───
              Inner 3-col grid with gap-2.5 for the 9 story cards       */}
          <div className="col-span-full md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-2.5 md:border-r md:border-rtv-border-clr md:pr-2.5 dark:border-border justify-start">
              {stories.slice(0, 9).map((story, index) => {
                // Remove border-r on every 3rd card (3rd, 6th, 9th)
                const isThirdCol = (index + 1) % 3 === 0;
                return (
                  <div
                    key={story.storyId}
                    className={`md:pr-3 ${
                        !isThirdCol ? "md:border-r md:border-rtv-border-clr dark:border-border" : ""
                    }`}
                  >
                    <a
                      className="flex flex-col w-full group"
                      href={storyPath(story)}
                    >
                      {/* Image — 16:9 aspect ratio with object-cover */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={story.fileName}
                          alt={story.mainTitle}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Empty overlay div for future play button etc. */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      {/* Title — fixed h-20 to keep all card heights uniform
                          1.2rem (≈19px), 23px line-height, bold */}
                      <div className="pt-2 h-20">
                        <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                          {story.mainTitle}
                        </h3>
                      </div>
                    </a>
                    {/* Horizontal rule below EVERY card — 9 cards = 9 hrs */}
                    <hr className="border-rtv-border-clr dark:border-border" />
                  </div>
                );
              })}
            </div>

            {/* ─── 3-COL RIGHT SIDEBAR — aligns perfectly with lead's sidebar ── */}
            <div className="col-span-full md:col-span-3 flex flex-col justify-between">
              <SidebarTabWidget
                latestStories={latestStories}
                popularStories={popularStories}
              />
            </div>

          </div>
      </section>
    </div>
  );
}
