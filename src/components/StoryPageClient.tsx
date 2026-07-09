"use client";

import { useMemo } from "react";
import type { StoryDetailsResponse, StoryModel } from "@/lib/types";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import AdBanner from "@/components/AdBanner";
import RelatedStoriesSidebar from "@/components/RelatedStoriesSidebar";
import ReadMoreGrid from "@/components/ReadMoreGrid";

type Props = {
  story: StoryDetailsResponse;
};

export default function StoryPageClient({ story }: Props) {
  const readMoreStories: StoryModel[] = story.readMoreStories || [];

  const publishDate =
    typeof story.passedTime === "string" && story.passedTime.trim()
      ? story.passedTime
      : "বৃহস্পতিবার, ০৯ জুলাই ২০২৬ , ১০:২২ এএম";

  const bodyHtml = useMemo(() => {
    const raw = (story.details ?? [])
      .map((d) => d.body)
      .join("")
      .trim();
    if (!raw) return "";
    return sanitizeHtml(raw);
  }, [story.details]);

  return (
    <div className="sm:mt-5">
      <div className="main-container-inner grid grid-cols-12 gap-5 place-content-between">

        {/* ── LEFT COLUMN: MAIN ARTICLE (9 Columns) ──────────────────────── */}
        <div className="max-sm:col-span-12 md:col-span-9">
          <div className="content-section">

            {/* Category Breadcrumb */}
            <div className="flex flex-col justify-between gap-1 mt-0">
              <div className="w-full px-2 sm:px-0">
                {story.categories?.[0] && (
                  <div className="font-semibold text-2xl text-blue-600 inline-block mb-2">
                    <a href={`/category/${story.categories[0].slug}`}>
                      <span>{story.categories[0].displayTitle}</span>
                    </a>
                    <div className="h-0.5 bg-blue-600 mt-0.5 w-full"></div>
                  </div>
                )}

                {/* Title */}
                <div className="story-title mt-0 dark:text-white font-bold">
                  <h1>{story.mainTitle}</h1>
                </div>
              </div>

              {/* Reporter Info */}
              <span className="text-[1rem] font-bold max-sm:mx-2 flex items-center flex-wrap lg:flex-row gap-x-0.5">
                {story.writers?.[0]?.name || "আরটিভি নিউজ"}
              </span>

              {/* Date & Print/Share Buttons */}
              <div className="flex flex-row md:flex-col lg:flex-row items-center md:items-start lg:items-center justify-between">
                <span className="text-[1rem] flex gap-2 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                  </svg>
                  <p>{publishDate}</p>
                </span>

                {/* Print Icon */}
                <div className="flex flex-col md:flex-row lg:flex-col items-center md:items-start lg:items-center justify-end gap-2 last:gap-0 no-print">
                  <div className="flex items-center justify-end gap-x-2 sm:gap-x-0">
                    <div className="relative">
                      <div className="bg-slate-300 p-[11px] rounded-full print-btn cursor-pointer relative" onClick={() => window.print()}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M732 120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v148h440V120zm120 212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM664 844H360V568h304v276zm164-360c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-40c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v40z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="sm:my-2" />

            {/* Main Image */}
            <div className="py-2 max-md:pt-0">
              <figure>
                <div className="w-full aspect-video">
                  <div className="relative aspect-video">
                    <img
                      src={story.mainImageFileName || "/Images/rtv-logo.svg"}
                      alt={story.alt || story.mainTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </figure>

              {/* Article Body */}
              <article className="storyDetailFont custom-a-tag pTagGap dark:text-white mx-2 sm:mx-24 text-left">
                {bodyHtml && (
                  <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                )}
              </article>

              {/* Tags */}
              <div className="flex flex-wrap max-sm:flex-wrap max-sm:truncate items-center justify-start gap-2 max-sm:mt-5 sm:my-10 max-sm:mx-2 list-none">
                {story.tags?.map((tag) => (
                  <span key={tag.id} className="bg-[#e8e8e9] dark:bg-slate-500 rounded-[5px] py-1 hover:drop-shadow-md">
                    <a href={`/topic/${tag.slug}`} className="text-[1.2rem] outline-none px-3 cursor-pointer hover:text-[#D12026] dark:hover:text-[#d8d7d7]">
                      {tag.name}
                    </a>
                  </span>
                ))}
              </div>

              {/* Google News Banner */}
              <a href="https://news.google.com/publications/CAAqBwgKMPuE0QswuqDoAw?ceid=BD:bn&oc=3" target="_blank" rel="noreferrer">
                <div className="flex justify-center items-center gap-x-3 border w-[92%] sm:w-[460px] mx-auto rounded px-2 py-1.5 group hover:border-blue-700">
                  <div className="w-10 sm:w-12 shrink-0">
                    <img src="https://lh3.googleusercontent.com//J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=rj-w300-h300-l95-c0xffffff" alt="Google News" className="my-auto w-full h-auto" />
                  </div>
                  <div className="no-print">
                    <p className="text-sm sm:text-base leading-snug group-hover:text-blue-700">আরটিভি খবর পেতে গুগল নিউজ চ্যানেল ফলো করুন</p>
                  </div>
                </div>
              </a>

              {/* App Store Links */}
              <div className="w-full my-4 flex justify-center items-center gap-x-3 sm:gap-x-4 mx-auto">
                <a href="https://play.google.com/store/apps/details?id=com.rtv.newsportal" target="_blank" rel="noreferrer">
                  <img src="/_next/image?url=%2FrtvIcon%2Fstore_icon%2Fandriod.webp&w=256&q=75" alt="Android App" width="125" height="37" />
                </a>
                <a href="https://apps.apple.com/us/app/rtv-news/id6753746064" target="_blank" rel="noreferrer">
                  <img src="/_next/image?url=%2FrtvIcon%2Fstore_icon%2Fapple.webp&w=256&q=75" alt="Apple App" width="125" height="37" />
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: SIDEBAR (3 Columns) ──────────────────────────── */}
        <div className="max-sm:col-span-12 md:col-span-3" id="printBlock1">
          <div className="grid grid-cols-1 justify-center gap-y-3">

            {/* Sidebar Ad Placeholder */}
            <AdBanner height={250} />

            {/* Related / Popular Stories List */}
            <RelatedStoriesSidebar stories={story.relatedStories || []} />

            {/* Sidebar Ad Placeholder 2 */}
            <AdBanner height={250} />

          </div>
        </div>

        {/* ── BOTTOM SECTION: READ MORE GRID (Full Width) ────────────────── */}
        <ReadMoreGrid stories={readMoreStories} />

      </div>
    </div>
  );
}
