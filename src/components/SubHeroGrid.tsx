import type { StoryModel } from "@/lib/types";
import { StoryCardMedium } from "@/components/StoryCard";
import SidebarTabWidget from "@/components/SidebarTabWidget";

export default function SubHeroGrid({
  stories,
  sidebarStories,
}: {
  stories: StoryModel[];
  sidebarStories: StoryModel[];
}) {
  if (!stories || stories.length === 0) return null;

  const col1 = stories.slice(0, 3);
  const col2 = stories.slice(3, 6);
  const col3 = stories.slice(6, 9);

  return (
    <section className="border-t border-[#dddddd] dark:border-gray-800 pt-6 mt-6 md:px-25">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        <div className="md:col-span-1 md:border-r border-[#dddddd] dark:border-gray-800 md:pr-4 pb-6 md:pb-0">
          {col1.map((story) => (
            <StoryCardMedium key={story.storyId} story={story} />
          ))}
        </div>

        <div className="md:col-span-1 md:border-r border-[#dddddd] dark:border-gray-800 md:pr-4 pb-6 md:pb-0">
          {col2.map((story) => (
            <StoryCardMedium key={story.storyId} story={story} />
          ))}
        </div>

        <div className="md:col-span-1 md:border-r border-[#dddddd] dark:border-gray-800 md:pr-4 pb-6 md:pb-0">
          {col3.map((story) => (
            <StoryCardMedium key={story.storyId} story={story} />
          ))}
        </div>

        <div className="md:col-span-1 md:pl-4">
          <SidebarTabWidget
            latestStories={sidebarStories}
            popularStories={sidebarStories}
          />
        </div>
      </div>
    </section>
  );
}
