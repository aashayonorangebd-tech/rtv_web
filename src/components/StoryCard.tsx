import Image from "next/image";
import type { StoryModel } from "@/lib/types";

export function StoryCardLarge({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        {story.isVideo === 1 && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            ভিডিও
          </span>
        )}
      </div>
      <h2 className="mt-3 text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-3">
        {story.mainTitle}
      </h2>
      <p className="mt-1 text-sm text-foreground/60 line-clamp-2">
        {story.subTitle}
      </p>
      <span className="mt-2 block text-xs text-foreground/40">
        {story.passedTime}
      </span>
    </a>
  );
}

export function StoryCardSmall({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group flex gap-3">
      <div className="relative w-28 aspect-[16/9] shrink-0 overflow-hidden rounded">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="112px"
        />
        {story.isVideo === 1 && (
          <span className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
            ভিডিও
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-3">
          {story.mainTitle}
        </h3>
        <span className="mt-1 block text-[11px] text-foreground/40">
          {story.passedTime}
        </span>
      </div>
    </a>
  );
}

export function StoryCardListItem({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group flex gap-3 pb-3 border-b border-border last:border-b-0">
      <div className="relative w-24 aspect-[16/9] shrink-0 overflow-hidden rounded">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="96px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {story.mainTitle}
        </h3>
        <span className="mt-1 block text-[11px] text-foreground/40">
          {story.passedTime}
        </span>
      </div>
    </a>
  );
}

export function StoryCardText({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group block pb-3 border-b border-border last:border-b-0">
      <h3 className="text-[15px] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
        {story.mainTitle}
      </h3>
      <span className="mt-1 block text-xs text-foreground/40">
        {story.passedTime}
      </span>
    </a>
  );
}
