import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";

type Props = {
  categoryName: string;
  stories: StoryModel[];
};

export default function CategoryPopularSidebar({
  categoryName,
  stories,
}: Props) {
  if (!categoryName || !stories || stories.length === 0) return null;

  return (
    <div className="pb-5">
      <h3 className="category-title mb-2 text-lg dark:text-white font-bold border-b-2 border-blue-600 w-min inline">
        {categoryName} এর পাঠক প্রিয়
      </h3>
      <div className="overflow-y-auto w-full h-min overflow-x-hidden mt-5">
        <div className="flex flex-col gap-y-5 max-lg:gap-y-2.5">
          {stories.slice(0, 5).map((story) => (
            <div key={story.storyId}>
              <a
                href={storyPath(story)}
                className="grid grid-cols-12 gap-2 max-w-full group"
              >
                <div className="col-span-full pl-1">
                  <h3 className="main-title-post dark:text-white group-hover:dark:text-blue-300 hover:text-blue-800">
                    {story.mainTitle}
                  </h3>
                </div>
                <div className="col-span-7">
                  <h3 className="text-sm dark:text-white text-gray-600 line-clamp-3">
                    {story.subTitle || story.mainTitle}
                  </h3>
                </div>
                <div className="col-span-5">
                  <div className="relative">
                    <img
                      src={story.fileName}
                      alt={story.mainTitle}
                      className="object-cover object-center max-w-full aspect-video"
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
