// ─── CategorySection ──────────────────────────────────────────────────────
// Reusable category block for API-driven sections (জাতীয়, রাজনীতি, etc.).
//
// Desktop layout (12-column):
//   ┌────────────────────────────────────────────┬──────────────────┐
//   │  9-col Main (border-right)                 │  3-col Sidebar   │
//   │  ┌──────────┬────────────────────────────┐ │  Headline list   │
//   │  │ 4-col    │ 8-col Featured Story       │ │  from remaining  │
//   │  │ side (2) │ (image + 1.5rem title      │ │  stories +       │
//   │  │ 1.2rem   │  + subtitle)               │ │  "সব খবর" btn   │
//   │  └──────────┴────────────────────────────┘ │                  │
//   └────────────────────────────────────────────┴──────────────────┘
//
// Props:
//   title   : section heading (e.g. "জাতীয়")
//   href    : category URL
//   stories : StoryModel[] — first = featured (8-col), next 2 = side (4-col)
//             remaining stories feed the sidebar headline list
// ─────────────────────────────────────────────────────────────────────────

import type { StoryModel } from "@/lib/types";
import SectionHeader from "@/components/SectionHeader";

export default function CategorySection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  if (stories.length === 0) return null;

  // ── Slot stories ─────────────────────────────────────────────────────
  const featured = stories[0];             // largest 8-col card
  const sideStories = stories.slice(1, 3); // two 4-col side cards
  const sidebarStories = stories.slice(3); // remaining → sidebar list

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b dark:border-gray-700">
          {/* ─── 9-COL MAIN CONTENT (border-right) ──────────────────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-9 border-r border-slate-300 md:pr-2.5 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* ── Side stories (4 cols) ───────────────────────────── */}
              <div className="col-span-4 sm:flex sm:flex-col gap-5">
                {sideStories.map((story) => (
                  <a
                    key={story.storyId}
                    className="flex flex-col w-full group mb-5 last:mb-0"
                    href={story.canonicalUrl}
                  >
                    <div className="relative">
                      <img
                        src={story.fileName}
                        alt={story.mainTitle}
                        className="object-cover object-center max-w-full aspect-video"
                        loading="lazy"
                      />
                    </div>
                    <div className="pt-2">
                      <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-blue-500">
                        {story.mainTitle}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>

              {/* ── Featured story (8 cols) ─────────────────────────── */}
              <div className="col-span-8">
                <a
                  className="flex flex-col w-full group"
                  href={featured.canonicalUrl}
                >
                  <div className="relative">
                    <img
                      src={featured.fileName}
                      alt={featured.mainTitle}
                      className="object-cover object-center max-w-full aspect-video"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-2 my-2.5">
                    <h3 className="dark:text-white text-[1.5rem] leading-[23px] font-bold group-hover:text-blue-500">
                      {featured.mainTitle}
                    </h3>
                  </div>
                  {featured.subTitle && (
                    <p className="text-base text-[#555] dark:text-slate-300">
                      {featured.subTitle}
                    </p>
                  )}
                </a>
              </div>
            </div>
          </div>

          {/* ─── 3-COL SIDEBAR — headline list + "সব খবর" ──────────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-3 flex flex-col">
            {sidebarStories.map((story) => (
              <div
                key={story.storyId}
                className="flex flex-col items-start justify-center py-2.5 border-b dark:border-gray-700 last:border-b-0"
              >
                <a href={story.canonicalUrl}>
                  <p className="px-[5px] text-black dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-300 flex items-center text-sm">
                    {story.mainTitle}
                  </p>
                </a>
              </div>
            ))}

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
