import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import Image from "next/image";

type Props = {
  title?: string;
  stories: StoryModel[];
};

export default function ReadMoreGrid({ title = "আরও পড়ুন", stories = [] }: Props) {
  if (!stories || stories.length === 0) return null;

  return (
    <div className="col-span-full max-sm:mx-2 mt-8 border-t pt-6 dark:border-gray-700">

      {/* Section Title */}
      <div className="mb-4">
        <p className="text-[#005adf] font-bold text-[22px] whitespace-nowrap inline-block">
          {title}
        </p>
        {/* FIX: Thinner underline (1.5px) and closer to the text (mt-0.5) */}
        <div className="w-[94px] h-[1.5px] bg-[#005adf] mt-0.5"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {stories.slice(0, 4).map((rmStory, index) => (
          <div key={rmStory.storyId ?? `readmore-${index}`} className="h-full">
            <a
              href={storyPath(rmStory)}
              className="flex flex-col h-full gap-3 items-start pb-3 transition group"
            >
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src={rmStory.fileName}
                  alt={rmStory.mainTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* FIX: flex-grow ensures the content stretches to push the date to the bottom */}
              <div className="flex flex-col flex-grow w-full">
                <h3 className="text-[18px] font-bold text-gray-800 dark:text-gray-50 leading-[26px] group-hover:text-[#005adf] transition-colors line-clamp-4">
                  {rmStory.mainTitle}
                </h3>

                {typeof rmStory.subTitle === "string" && rmStory.subTitle.trim() && (
                  <p className="text-[16px] text-gray-700 dark:text-gray-300 mt-1 mb-1 leading-[24px] line-clamp-2">
                    {rmStory.subTitle.trim()}
                  </p>
                )}

                <div className="flex items-center text-[14px] text-[#787C85] dark:text-gray-400">
                  <span>{rmStory.passedTime}</span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}