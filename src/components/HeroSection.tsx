import type { StoryModel } from "@/lib/types";
import { StoryCardLarge, StoryCardMedium } from "@/components/StoryCard";

export default function HeroSection({ stories }: { stories: StoryModel[] }) {
  if (!stories || stories.length === 0) return null;

  const [lead, ...rest] = stories;
  
  // The original site only shows 2 stacked items in that right column next to the main story
  const rightColStories = rest.slice(0, 2);

  return (
    // Use a 3-column grid. Gap is 0 because we will control spacing using padding around the border
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-10 mt-4">
      
      {/* 
        LEFT COLUMN (Main Story)
        Takes up 2 out of 3 columns.
        Uses border-r to create the vertical divider line.
        pr-6 adds spacing between the content and the line.
      */}
      <div className="lg:col-span-2 lg:border-r border-[#dddddd] dark:border-gray-800 lg:pr-6 mb-8 lg:mb-0">
        <StoryCardLarge story={lead} />
      </div>

      {/* 
        RIGHT COLUMN (Stacked Stories)
        Takes up 1 out of 3 columns.
        pl-6 adds spacing on the other side of the vertical divider line.
      */}
      <div className="lg:col-span-1 lg:pl-6 flex flex-col justify-start">
        {rightColStories.map((story) => (
          // Notice we are using StoryCardMedium here now, NOT StoryCardSmall!
          <StoryCardMedium key={story.storyId} story={story} />
        ))}
      </div>

    </section>
  );
}