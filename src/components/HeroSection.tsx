"use client";

import type { StoryModel } from "@/lib/types";
import AdBanner from "@/components/AdBanner";
import { storyPath } from "@/lib/api";

// ─── HeroSection ─────────────────────────────────────────────────────────
// 12-column responsive hero grid for the homepage lead stories + ad sidebar.
// Structure:
//   Desktop (md+): 9-col main content + 3-col ad sidebar
//   Mobile:        single-column stacked
//   Border-right separates content from sidebar (desktop only).
// ─────────────────────────────────────────────────────────────────────────

export default function HeroSection({
  stories,
}: {
  stories: StoryModel[];
}) {
  // ── Guard: bail if no stories ──────────────────────────────────────────
  if (!stories || stories.length === 0) return null;

  // ── Slice incoming stories into slots ──────────────────────────────────
  //   stories[0] → lead (largest, 8 cols)
  //   stories[1..2] → right column (2 stacked cards, 4 cols)
  const [lead, ...rest] = stories;
  const rightColStories = rest.slice(0, 2);

  return (
    <section className="dark:text-white">

      {/* ═══════════════════════════════════════════════════════════════════
          OUTER 12-COLUMN GRID  (gap-2.5)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12">

        {/* ═══════════════════════════════════════════════════════════════
            LEFT — MAIN CONTENT   (9 cols + border-right)
            ═══════════════════════════════════════════════════════════════
            Wraps lead story (8 cols) + right column (4 cols).
            Border-right separates from the ad sidebar.
            If adblocker detected → spans full 12 cols.                */}
        <div className="md:col-span-9 md:border-r md:border-[#e2e2e2] md:pr-2.5 dark:border-gray-700">

          {/* ── Inner 12-col grid (gap-5) ──────────────────────────────── */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">

            {/* ─── LEAD STORY (8 cols) ───────────────────────────────────
                Largest card: big image + 30px headline + summary text  */}
            <div className="md:col-span-8">
              <a
                className="flex flex-col group w-full"
                href={storyPath(lead)}
              >
                {/* Image — 16:9 aspect ratio, 650×365 bounds */}
                <div className="relative">
                  <img
                    alt={lead.mainTitle}
                    src={lead.fileName}
                    width={650}
                    height={365}
                    decoding="async"
                    className="object-cover object-center max-w-full aspect-video"
                    loading="lazy"
                  />
                </div>

                {/* Headline — text-3xl ≈ 30px, dark on light / white on dark */}
                <h3 className="font-bold text-[#121212] dark:text-white group-hover:text-[#0d6efd] hover:cursor-pointer pt-2 text-3xl pb-3 leading-[1.3] transition-colors">
                  {lead.mainTitle}
                </h3>

                {/* Summary — text-base ≈ 16px, muted gray (#555) */}
                {lead.subTitle && (
                  <p className="text-base text-[#555] dark:text-slate-300">
                    {lead.subTitle}
                  </p>
                )}
              </a>
            </div>

            {/* ─── RIGHT COLUMN (4 cols) — 2 stacked stories ────────────
                Each card: image + text-xl (≈20px) headline.
                space-y-5 separates the two cards.                     */}
            <div className="md:col-span-4 flex flex-col space-y-5">
              {rightColStories.map((story, index) => (
                <div key={story.storyId}>

                  {/* Story card */}
                  <a
                    className="flex flex-col group w-full"
                    href={storyPath(story)}
                  >
                    {/* Image — 16:9, same dimensions as lead */}
                    <div className="relative">
                      <img
                        alt={story.mainTitle}
                        src={story.fileName}
                        width={650}
                        height={365}
                        decoding="async"
                        className="object-cover object-center max-w-full aspect-video"
                        loading="lazy"
                      />
                    </div>

                    {/* Headline — text-xl ≈ 20px, pl-1 for slight indent */}
                    <h3 className="font-bold text-[#121212] dark:text-white group-hover:text-[#0d6efd] hover:cursor-pointer pt-2 text-xl pl-1 pb-2 leading-[1.3] transition-colors">
                      {story.mainTitle}
                    </h3>
                  </a>

                  {/* ── Divider <hr> between story 1 and story 2 ──────── */}
                  {index === 0 && (
                    <hr className="border-[#e2e2e2] dark:border-gray-700" />
                  )}
                </div>
              ))}
            </div>

          </div>{/* end inner grid */}
        </div>{/* end left 9-col container */}

        {/* ═══════════════════════════════════════════════════════════════
            RIGHT — AD SIDEBAR  (3 cols, hidden when adblocker detected)
            ═══════════════════════════════════════════════════════════════
            Two stacked 300×250 ad placeholders.
            If adblocker detected → not rendered at all.
            md+ only (below, stacks full-width).                        */}
          <div className="md:col-span-3 flex flex-col justify-between gap-4">
            {/* Ad slot 1 — top */}
            <AdBanner height={250} collapseOnBlock={false} />

            {/* Ad slot 2 — bottom */}
            <AdBanner height={250} collapseOnBlock={false} />
          </div>

      </div>{/* end outer 12-col grid */}
    </section>
  );
}
