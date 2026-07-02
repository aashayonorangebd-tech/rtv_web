import type { StoryModel } from "@/lib/types";
import { StoryCardLarge } from "@/components/StoryCard";
import Image from "next/image";

type Props = {
  title?: string;
  slug?: string;
  stories: StoryModel[];
};

export default function SectionGrid({ title, slug, stories }: Props) {
  if (!stories || stories.length === 0) return null;

  const [lead, ...rest] = stories;

  return (
    <section className="mb-8">
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          {slug && (
            <a
              href={`/category/${slug}`}
              className="text-xs text-primary hover:underline"
            >
              আরো দেখুন →
            </a>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-1">
          <StoryCardLarge story={lead} />
        </div>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.slice(0, 4).map((story) => (
            <div key={story.storyId} className="group">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
                <Image
                  src={story.fileName}
                  alt={story.mainTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-3">
                {story.mainTitle}
              </h3>

              <span className="mt-1 block text-xs text-foreground/40">
                {story.passedTime}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
