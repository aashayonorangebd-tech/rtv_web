// ─── EntertainmentSection ─────────────────────────────────────────────────
// Two-column layout for বিনোদন:
//   Left  → 1 big featured card (image + title + subtitle)
//   Right → 4 small horizontal cards (title + subtitle left, image right)
//   Border between columns.
// ─────────────────────────────────────────────────────────────────────────

import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

export default function EntertainmentSection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  if (stories.length < 1) return null;

  const featured = stories[0];
  const sideStories = stories.slice(1, 5);

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b dark:border-gray-700">
          {/* ─── Left: featured big card ──────────────────────────────── */}
          <div className="col-span-full md:col-span-6 lg:col-span-6 md:border-r border-[#e2e2e2] md:pr-4 dark:border-gray-700">
            <a className="flex flex-col w-full group"                 href={storyPath(featured)}>
              <div className="relative">
                <img
                  src={featured.fileName}
                  alt={featured.mainTitle}
                  className="object-cover object-center max-w-full aspect-video"
                  loading="lazy"
                />
              </div>
              <div className="pt-2 my-2.5">
                <h3 className="dark:text-white text-[1.5rem] leading-[28px] font-bold group-hover:text-rtv-blue-text-hover">
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

          {/* ─── Right: 4 small horizontal cards ──────────────────────── */}
          <div className="col-span-full md:col-span-6 lg:col-span-6 flex flex-col gap-4 md:pl-4">
            {sideStories.slice(0, 4).map((story) => (
              <a
                key={story.storyId}
                href={storyPath(story)}
                className="flex flex-row items-start gap-3 group border-b dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold leading-[20px] text-[#121212] dark:text-white group-hover:text-rtv-blue-text-hover line-clamp-2">
                    {story.mainTitle}
                  </h4>
                  {story.subTitle && (
                    <p className="text-sm text-[#555] dark:text-slate-400 mt-1 leading-[18px] line-clamp-2">
                      {story.subTitle}
                    </p>
                  )}
                </div>
                <div className="w-28 h-[75px] shrink-0 overflow-hidden rounded">
                  <img
                    src={story.fileName}
                    alt={story.mainTitle}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
