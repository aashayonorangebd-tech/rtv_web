import SectionHeader from "@/components/SectionHeader";

export interface CategoryStory {
  id: number;
  title: string;
  summary?: string;
  imageSeed: number;
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
  if (stories.length === 0) return null;

  const featured = stories[0];
  const sideStories = stories.slice(1, 3);

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b dark:border-gray-700">
          <div className="col-span-full md:col-span-12 lg:col-span-9 border-r border-slate-300 md:pr-2.5 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="col-span-4 sm:flex sm:flex-col gap-5">
                {sideStories.map((story) => (
                  <a
                    key={story.id}
                    className="flex flex-col w-full group mb-5 last:mb-0"
                    href="#"
                  >
                    <div className="relative">
                      <img
                        src={`https://picsum.photos/seed/${story.imageSeed}/650/365`}
                        alt={story.title}
                        className="object-cover object-center max-w-full aspect-video"
                        loading="lazy"
                      />
                    </div>
                    <div className="pt-2">
                      <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-blue-500">
                        {story.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>

              <div className="col-span-8">
                <a className="flex flex-col w-full group" href="#">
                  <div className="relative">
                    <img
                      src={`https://picsum.photos/seed/${featured.imageSeed}/650/365`}
                      alt={featured.title}
                      className="object-cover object-center max-w-full aspect-video"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-2 my-2.5">
                    <h3 className="dark:text-white text-[1.5rem] leading-[23px] font-bold group-hover:text-blue-500">
                      {featured.title}
                    </h3>
                  </div>
                  {featured.summary && (
                    <p className="text-base text-[#555] dark:text-slate-300">
                      {featured.summary}
                    </p>
                  )}
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-full md:col-span-12 lg:col-span-3 flex flex-col">
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
