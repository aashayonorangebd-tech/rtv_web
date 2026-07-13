import React from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

export default function QuadCategorySection({
  sections,
}: {
  sections: { title: string; href: string; stories: StoryModel[] }[];
}) {
  if (sections.length < 4) return null;

  return (
    <section className="section-padding my-10">
      <div className="main-container">
        <div className="grid grid-cols-4 sm:gap-5 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2">
          {sections.slice(0, 4).map((cat) => {
            const featured = cat.stories[0];
            const textStories = cat.stories.slice(1, 4);

            if (cat.stories.length < 4) return null;

            return (
              <div key={cat.title}>
                <SectionHeader title={cat.title} href={cat.href} />

                <div className="flex flex-col">
                  <a
                    href={storyPath(featured)}
                    className="group"
                  >
                    <div className="aspect-video rounded relative max-w-full overflow-hidden bg-cover bg-no-repeat">
                      <div className="relative">
                        <img
                          src={featured.fileName}
                          alt={featured.mainTitle}
                          className="object-cover object-center max-w-full aspect-video"
                          loading="lazy"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <h3 className="my-2.5 line-clamp-2 group-hover:text-blue-800 group-hover:dark:text-blue-300 dark:text-white h-12 max-sm:h-[5.25rem] text-base font-bold leading-5">
                      {featured.mainTitle}
                    </h3>
                  </a>

                  {textStories.map((story) => (
                    <a
                      key={story.storyId}
                      href={storyPath(story)}
                      className="group"
                    >
                      <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-600 flex items-center justify-start" />
                      <div className="gap-x-2.5 my-2 max-w-xs transition duration-100 group ease-out hover:scale-105">
                        <div>
                          <h3 className="main-title-post dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300">
                            {story.mainTitle}
                          </h3>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
