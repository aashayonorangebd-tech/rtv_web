// ─── CategorySection ──────────────────────────────────────────────────────
// Reusable category block used for জাতীয়, রাজনীতি, অর্থনীতি, etc.
//
// Desktop layout (12-column grid):
//   ┌────────────────────────────────────────────┬──────────────┐
//   │  9-col Main Content (border-right)         │  3-col       │
//   │  ┌────────────┬──────────────────────────┐ │  Sidebar     │
//   │  │ 4-col side │ 8-col Featured Story     │ │  Headline    │
//   │  │ stories    │ (image + 1.5rem title    │ │  List        │
//   │  │ (1.2rem    │  + summary)              │ │  + "সব খবর"  │
//   │  │ titles)    │                          │ │  button      │
//   │  └────────────┴──────────────────────────┘ │              │
//   └────────────────────────────────────────────┴──────────────┘
//
// Props:
//   title           : section name (e.g. "জাতীয়")
//   href            : category URL for links
//   stories         : CategoryStory[] — first is featured, next 2 are side
//   sidebarHeadlines: string[] — text-only links in right sidebar
// ─────────────────────────────────────────────────────────────────────────

import SectionHeader from "@/components/SectionHeader";

// ── CategoryStory — data shape for each story card in the grid ─────────
export interface CategoryStory {
  id: number;
  title: string;
  summary?: string;   // optional lead text for featured story
  imageSeed: number;  // unique seed for picsum.photos placeholder images
}

export default function CategorySection({
  title,
  href = "#",
  stories,
  sidebarHeadlines,
}: {
  title: string;
  href?: string;
  stories: CategoryStory[];
  sidebarHeadlines: string[];
}) {
  // ── Guard: no stories → nothing to render ────────────────────────────
  if (stories.length === 0) return null;

  // ── Slot stories ─────────────────────────────────────────────────────
  const featured = stories[0];          // largest card (8 cols)
  const sideStories = stories.slice(1, 3); // two smaller cards (4 cols)

  return (
    <section className="section-padding">
      <div className="main-container">
        {/* ── Section header: title + আরও link + blue divider ──────────── */}
        <SectionHeader title={title} href={href} />

        {/* ═══════════════════════════════════════════════════════════════
            OUTER 12-COL GRID  (gap-2.5, bottom border separator)
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b dark:border-gray-700">
          {/* ─── 9-COL MAIN CONTENT (border-right) ──────────────────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-9 border-r border-slate-300 md:pr-2.5 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* ── Side stories (4 cols) — 2 stacked cards ─────────── */}
              <div className="col-span-4 sm:flex sm:flex-col gap-5">
                {sideStories.map((story) => (
                  <a
                    key={story.id}
                    className="flex flex-col w-full group mb-5 last:mb-0"
                    href="#"
                  >
                    {/* Image — 16:9, 650×365 picsum placeholder */}
                    <div className="relative">
                      <img
                        src={`https://picsum.photos/seed/${story.imageSeed}/650/365`}
                        alt={story.title}
                        className="object-cover object-center max-w-full aspect-video"
                        loading="lazy"
                      />
                    </div>
                    {/* Title — 1.2rem (≈19px), bold, dark-on-light */}
                    <div className="pt-2">
                      <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-blue-500">
                        {story.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>

              {/* ── Featured story (8 cols) — large card with summary ─ */}
              <div className="col-span-8">
                <a className="flex flex-col w-full group" href="#">
                  {/* Image — 16:9 */}
                  <div className="relative">
                    <img
                      src={`https://picsum.photos/seed/${featured.imageSeed}/650/365`}
                      alt={featured.title}
                      className="object-cover object-center max-w-full aspect-video"
                      loading="lazy"
                    />
                  </div>
                  {/* Title — 1.5rem (≈24px), bold */}
                  <div className="pt-2 my-2.5">
                    <h3 className="dark:text-white text-[1.5rem] leading-[23px] font-bold group-hover:text-blue-500">
                      {featured.title}
                    </h3>
                  </div>
                  {/* Summary — text-base (16px), muted #555 */}
                  {featured.summary && (
                    <p className="text-base text-[#555] dark:text-slate-300">
                      {featured.summary}
                    </p>
                  )}
                </a>
              </div>
            </div>
          </div>

          {/* ─── 3-COL SIDEBAR — headline list + "সব খবর" button ──── */}
          <div className="col-span-full md:col-span-12 lg:col-span-3 flex flex-col">
            {/* Headline list — each item: bordered row, text-sm link */}
            {sidebarHeadlines.map((headline, i) => (
              <div
                key={i}
                className="flex flex-col items-start justify-center py-2.5 border-b dark:border-gray-700 last:border-b-0"
              >
                <a href="#">
                  <p className="px-[5px] text-black dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-300 flex items-center text-sm">
                    {headline}
                  </p>
                </a>
              </div>
            ))}

            {/* "সব খবর" — full-width blue button linking to category */}
            <a href={href} className="block mt-3">
              <div className="mx-auto py-0.5 bg-[#2c4b9c]/80 text-center rounded w-full cursor-pointer hover:bg-[#2c4b9c] transition-colors">
                <p className="text-base text-white">সব খবর</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
