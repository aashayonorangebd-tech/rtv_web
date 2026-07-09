// ─── StoryCard ───────────────────────────────────────────────────────────────
// Five card variants for rendering StoryModel data across the homepage:
//   Large    — full-width hero card with image + title + subtitle
//   Medium   — grid card with image + h-20 title
//   Small    — horizontal card (130px image + title + time)
//   ListItem — horizontal card (110px image + title + time, no subtitle)
//   Text     — title-only list item with time
//
// Video stories show a "ভিডিও" badge on the image.
// All images: aspect-video, object-cover, hover zoom (scale-105).
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";

export function StoryCardLarge({ story }: { story: StoryModel }) {
  return (
    <a href={storyPath(story)} className="group block">
      <div className="relative w-full max-w-full aspect-video overflow-hidden rounded-[2px] mb-3 bg-gray-100 dark:bg-slate-800">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
        {story.isVideo === 1 && (
          <span className="absolute top-2 left-2 bg-black/75 text-white text-xs px-2 py-1 rounded-[2px] flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
            ভিডিও
          </span>
        )}
      </div>

<h3 className="font-bold text-[#121212] dark:text-white group-hover:text-[#0d6efd] hover:cursor-pointer pt-2 pb-3 text-[25px] leading-[30px] transition-colors line-clamp-3">
  {story.mainTitle}
</h3>


      <p className="text-base text-[#555555] dark:text-slate-300 leading-[24px] lg:leading-[26px] line-clamp-3">
  {story.subTitle}
</p>

    </a>
  );
}

export function StoryCardMedium({ story }: { story: StoryModel }) {
  return (
    <a
      href={storyPath(story)}
      className="group block pb-3 mb-3 border-b border-[#dddddd] dark:border-gray-800 last:border-b-0 last:pb-0 last:mb-0"
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-[2px] mb-2 bg-gray-100 dark:bg-slate-800">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 90vw, 33vw"
          priority
        />
        {story.isVideo === 1 && (
           <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded-[2px]">
            ভিডিও
          </span>
        )}
      </div>

      <h3 className="font-bold text-[18px] md:text-[15px] lg:text-[15px] leading-[20px] md:leading-[20px] lg:leading-[20px] h-[40px] text-[#121212] dark:text-white group-hover:text-[#0d6efd] dark:group-hover:text-blue-300 transition-colors line-clamp-2">
        {story.mainTitle}
      </h3>
    </a>
  );
}


export function StoryCardSmall({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group flex gap-3.5 mb-5 last:mb-0">
      <div className="relative w-[130px] md:w-[120px] aspect-[16/9] shrink-0 overflow-hidden rounded-[2px] bg-gray-100 dark:bg-slate-800">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="130px"
          priority
        />
        {story.isVideo === 1 && (
           <span className="absolute top-1 left-1 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded-[2px]">
            ভিডিও
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-[16px] md:text-[17px] font-bold leading-[25px] text-[#121212] dark:text-white group-hover:text-[#0d6efd] dark:group-hover:text-blue-300 transition-colors line-clamp-3">
          {story.mainTitle}
        </h3>
        <span className="mt-1.5 block text-[11px] font-medium text-[#888888] dark:text-gray-500">
          {story.passedTime}
        </span>
      </div>
    </a>
  );
}

export function StoryCardListItem({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group flex gap-3 py-3 border-b border-[#dddddd] dark:border-gray-800 last:border-b-0">
      <div className="relative w-[110px] aspect-[16/9] shrink-0 overflow-hidden rounded-[2px] bg-gray-100 dark:bg-slate-800">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="110px"
          priority
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-[16px] font-medium leading-[24px] text-[#121212] dark:text-white group-hover:text-[#0d6efd] dark:group-hover:text-blue-300 transition-colors line-clamp-2">
          {story.mainTitle}
        </h3>
        <span className="mt-1 block text-[11px] font-medium text-[#888888] dark:text-gray-500">
          {story.passedTime}
        </span>
      </div>
    </a>
  );
}

export function StoryCardText({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group block py-3 border-b border-[#dddddd] dark:border-gray-800 last:border-b-0">
      <h3 className="text-[16px] font-medium leading-[25px] text-[#121212] dark:text-white group-hover:text-[#0d6efd] dark:group-hover:text-blue-300 transition-colors line-clamp-2">
        {story.mainTitle}
      </h3>
      <span className="mt-1.5 block text-[12px] font-medium text-[#888888] dark:text-gray-500">
        {story.passedTime}
      </span>
    </a>
  );
}
