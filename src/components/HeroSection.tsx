import type { StoryModel } from "@/lib/types";

export default function HeroSection({
  stories,
  sidebarStories = [],
}: {
  stories: StoryModel[];
  sidebarStories?: StoryModel[];
}) {
  if (!stories || stories.length === 0) return null;

  const [lead, ...rest] = stories;
  const rightColStories = rest.slice(0, 2);

  return (
    <section className="dark:text-white">
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12">

        {/* ── 9-col main area with right border ── */}
        <div className="md:col-span-9 md:border-r md:border-slate-300 md:pr-2.5 dark:border-gray-700">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">

            {/* Lead story — 8 columns */}
            <div className="md:col-span-8">
              <a
                className="flex flex-col group w-full"
                href={lead.canonicalUrl}
              >
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
                <h3 className="font-semibold text-black dark:text-white group-hover:text-blue-500 hover:cursor-pointer pt-2 text-3xl pb-3 leading-[1.3] transition-colors">
                  {lead.mainTitle}
                </h3>
                {lead.subTitle && (
                  <p className="text-base text-[#555] dark:text-slate-300">
                    {lead.subTitle}
                  </p>
                )}
              </a>
            </div>

            {/* Right column — 4 columns, two stories stacked */}
            <div className="md:col-span-4 flex flex-col space-y-5">
              {rightColStories.map((story, index) => (
                <div key={story.storyId}>
                  <a
                    className="flex flex-col group w-full"
                    href={story.canonicalUrl}
                  >
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
                    <h3 className="font-semibold text-black dark:text-white group-hover:text-blue-500 hover:cursor-pointer pt-2 text-xl pl-1 pb-2 leading-[1.3] transition-colors">
                      {story.mainTitle}
                    </h3>
                  </a>
                  {index === 0 && (
                    <hr className="border-slate-200 dark:border-gray-700" />
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── 3-col sidebar — ads or sidebar stories ── */}
        <div className="md:col-span-3 flex flex-col justify-between gap-4">
          {sidebarStories.length > 0 ? (
            <div className="flex flex-col">
              {sidebarStories.map((story) => (
                <a
                  key={story.storyId}
                  className="group block py-3 border-b border-slate-200 dark:border-gray-700 first:pt-0"
                  href={story.canonicalUrl}
                >
                  <h4 className="font-medium text-sm leading-snug text-black dark:text-white group-hover:text-blue-500 transition-colors">
                    {story.mainTitle}
                  </h4>
                </a>
              ))}
            </div>
          ) : (
            <>
              <div className="w-full min-h-[250px] bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">
                Ad Space 300×250
              </div>
              <div className="w-full min-h-[250px] bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">
                Ad Space 300×250
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
