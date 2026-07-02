import type { StoryModel } from "@/lib/types";
import { StoryCardLarge, StoryCardSmall } from "@/components/StoryCard";

export default function HeroSection({ stories }: { stories: StoryModel[] }) {
  if (!stories || stories.length === 0) return null;

  const [lead, ...rest] = stories;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
      <div className="md:col-span-1 md:row-span-2">
        <StoryCardLarge story={lead} />
      </div>
      <div className="md:col-span-1 flex flex-col gap-4">
        {rest.slice(0, 4).map((story) => (
          <StoryCardSmall key={story.storyId} story={story} />
        ))}
      </div>
    </section>
  );
}
