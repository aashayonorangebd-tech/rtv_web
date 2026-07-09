import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

type Props = {
  title?: string;
  stories: StoryModel[];
  href?: string;
};

export default function RelatedStoriesSidebar({
  title = "পাঠক প্রিয়",
  stories,
  href = "#",
}: Props) {
  if (!stories || stories.length === 0) return null;

  return (
    <div className="pb-5 mt-5">
      <SectionHeader title={title} href={href} />
      <div className="overflow-y-auto w-full h-min overflow-x-hidden mt-5">
        <div className="flex flex-col gap-y-5 max-lg:gap-y-2.5">
          {stories.slice(0, 5).map((relStory, index) => (
            <div key={relStory.storyId ?? `related-${index}`}>
              <a
                href={storyPath(relStory)}
                className="grid grid-cols-12 gap-2 max-w-full group"
              >
                <div className="col-span-full pl-1">
                  <h3 className="main-title-post dark:text-white group-hover:dark:text-blue-300 hover:text-blue-800">
                    {relStory.mainTitle}
                  </h3>
                </div>
                <div className="col-span-7">
                  <h3 className="text-sm dark:text-white text-gray-600 line-clamp-3">
                    {relStory.subTitle || relStory.mainTitle}
                  </h3>
                </div>
                <div className="col-span-5">
                  <div className="relative">
                    <img
                      src={relStory.fileName}
                      alt={relStory.mainTitle}
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
