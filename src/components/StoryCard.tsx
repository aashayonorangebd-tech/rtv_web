import Image from "next/image";
import type { StoryModel } from "@/lib/types";

export function StoryCardLarge({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[2px] mb-3">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 66vw"
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
      
      <h3 className="font-bold text-black dark:text-white group-hover:text-[#0055a5] dark:group-hover:text-blue-400 transition-colors pt-2 text-[26px] md:text-[34px] pb-2 leading-[38px] md:leading-[46px] line-clamp-3">
        {story.mainTitle}
      </h3>
      
      <p className="text-[16px] text-[#444444] dark:text-gray-400 leading-[26px] line-clamp-2">
        {story.subTitle}
      </p>
      
      <span className="mt-3 block text-[13px] font-medium text-[#888888] dark:text-gray-500">
        {story.passedTime}
      </span>
    </a>
  );
}

// ✅ NEW COMPONENT: This perfectly matches the stacked cards on the right side of the original site
export function StoryCardMedium({ story }: { story: StoryModel }) {
  return (
    // pb-5 and border-b create the horizontal dividers between the stacked items
    <a href={story.canonicalUrl} className="group block pb-5 mb-5 border-b border-[#dddddd] dark:border-gray-800 last:border-b-0 last:pb-0 last:mb-0">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[2px] mb-3">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        {story.isVideo === 1 && (
           <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded-[2px]">
            ভিডিও
          </span>
        )}
      </div>
      
      {/* Title is slightly smaller than Large, but bigger than Small */}
      <h3 className="font-bold text-[20px] md:text-[23px] leading-[30px] md:leading-[34px] text-black dark:text-white group-hover:text-[#0055a5] dark:group-hover:text-blue-400 transition-colors line-clamp-3">
        {story.mainTitle}
      </h3>
    </a>
  );
}
export function StoryCardSmall({ story }: { story: StoryModel }) {
  return (
    // Added py-3 and bottom borders to create list separators like the original
    <a href={story.canonicalUrl} className="group flex gap-4 py-3 border-b border-[#dddddd] dark:border-gray-800 last:border-b-0">
      {/* Increased width of side images to match original proportions */}
      <div className="relative w-[140px] md:w-[155px] aspect-[16/9] shrink-0 overflow-hidden rounded-[2px]">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="155px"
        />
        {story.isVideo === 1 && (
           <span className="absolute top-1 left-1 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded-[2px]">
            ভিডিও
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-start pt-0.5">
        <h3 className="text-[17px] md:text-[19px] font-bold leading-[27px] text-black dark:text-white group-hover:text-[#0055a5] dark:group-hover:text-blue-400 transition-colors line-clamp-3">
          {story.mainTitle}
        </h3>
        <span className="mt-2 block text-[12px] font-medium text-[#888888] dark:text-gray-500">
          {story.passedTime}
        </span>
      </div>
    </a>
  );
}

export function StoryCardListItem({ story }: { story: StoryModel }) {
  return (
    <a href={story.canonicalUrl} className="group flex gap-3 py-3 border-b border-[#dddddd] dark:border-gray-800 last:border-b-0">
      <div className="relative w-[110px] aspect-[16/9] shrink-0 overflow-hidden rounded-[2px]">
        <Image
          src={story.fileName}
          alt={story.mainTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="110px"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-[16px] font-medium leading-[24px] text-black dark:text-white group-hover:text-[#0055a5] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
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
      <h3 className="text-[16px] font-medium leading-[25px] text-black dark:text-white group-hover:text-[#0055a5] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
        {story.mainTitle}
      </h3>
      <span className="mt-1.5 block text-[12px] font-medium text-[#888888] dark:text-gray-500">
        {story.passedTime}
      </span>
    </a>
  );
}