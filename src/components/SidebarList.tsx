import type { StoryModel } from "@/lib/types";
import { StoryCardListItem } from "@/components/StoryCard";

type Props = {
  title?: string;
  stories: StoryModel[];
};

export default function SidebarList({ title, stories }: Props) {
  if (!stories || stories.length === 0) return null;

  return (
    <div className="mb-6">
      {title && (
        <h2 className="text-lg font-bold text-foreground mb-3 pb-2 border-b-2 border-primary">
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-3">
        {stories.slice(0, 6).map((story) => (
          <StoryCardListItem key={story.storyId} story={story} />
        ))}
      </div>
    </div>
  );
}
