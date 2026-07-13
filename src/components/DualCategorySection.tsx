import React from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

export default function DualCategorySection({
  left,
  right,
}: {
  left: { title: string; href: string; stories: StoryModel[] };
  right: { title: string; href: string; stories: StoryModel[] };
}) {
  function renderCategory(
    cat: { title: string; href: string; stories: StoryModel[] },
    showBorder: boolean
  ) {
    const featured = cat.stories[0];
    const sideStories = cat.stories.slice(1, 4);

    if (cat.stories.length < 4) return null;

    return (
      <div className={`grid md:grid-cols-2 gap-2.5 ${showBorder ? "border-r border-rtv-border-clr pr-2.5" : ""}`}>
        <div className="col-span-full">
          <SectionHeader title={cat.title} href={cat.href} />
        </div>

        <div className="border-r border-[#e2e2e2] pr-2.5 dark:border-gray-700">
          <a className="flex flex-col w-full group" href={storyPath(featured)}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={featured.fileName}
                alt={featured.mainTitle}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="pt-2 my-2.5">
              <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
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

        <div className="flex flex-col justify-between">
          {sideStories.map((story, i) => (
            <div key={story.storyId} className="flex-grow">
              <a
                href={storyPath(story)}
                className="grid grid-cols-12 md:grid-cols-12 gap-2 items-center group"
              >
                <div className="md:order-last lg:order-none col-span-7 order-last">
                  <h3 className="font-semibold group-hover:text-rtv-blue-text-hover hover:cursor-pointer text-lg dark:text-white">
                    {story.mainTitle}
                  </h3>
                </div>
                <div className="col-span-5">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={story.fileName}
                      alt={story.mainTitle}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </a>
              {i < sideStories.length - 1 && (
                <hr className="mt-4 border-[#e2e2e2] dark:border-gray-700" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="section-padding">
      <div className="main-container">
        <div className="grid md:grid-cols-2 gap-2.5 border-b border-rtv-border-clr dark:border-gray-700 pb-5">
          {renderCategory(left, true)}
          {renderCategory(right, false)}
        </div>
      </div>
    </section>
  );
}
