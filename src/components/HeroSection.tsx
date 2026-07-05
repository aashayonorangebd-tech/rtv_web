import type { StoryModel } from "@/lib/types";
import { StoryCardLarge, StoryCardMedium } from "@/components/StoryCard";

export default function HeroSection({ stories }: { stories: StoryModel[] }) {
  if (!stories || stories.length === 0) return null;

  const [lead, ...rest] = stories;
  const rightColStories = rest.slice(0, 2);

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-10 mt-4">
      <div className="md:col-span-2 mb-8 md:mb-0">
        <StoryCardLarge story={lead} />
      </div>

      <div className="md:col-span-1 flex flex-col justify-start md:border-r border-[#dddddd] dark:border-gray-800 lg:pr-6">
        {rightColStories.map((story) => (
          <StoryCardMedium key={story.storyId} story={story} />
        ))}
      </div>
    </section>
  );
}
