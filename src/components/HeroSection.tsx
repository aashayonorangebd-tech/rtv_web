import type { StoryModel } from "@/lib/types";
import { StoryCardLarge, StoryCardMedium } from "@/components/StoryCard";

export default function HeroSection({ stories }: { stories: StoryModel[] }) {
  if (!stories || stories.length === 0) return null;

  const [lead, ...rest] = stories;
  const rightColStories = rest.slice(0, 2);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-10 mt-4">
      <div className="lg:col-span-2 mb-8 lg:mb-0">
        <StoryCardLarge story={lead} />
      </div>

      <div className="lg:col-span-1 flex flex-col justify-start lg:border-r border-[#dddddd] dark:border-gray-800 lg:pr-6">
        {rightColStories.map((story) => (
          <StoryCardMedium key={story.storyId} story={story} />
        ))}
      </div>
    </section>
  );
}
