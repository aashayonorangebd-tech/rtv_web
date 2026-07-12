// ─── CategoryFeed ──────────────────────────────────────────────────────────
// Client component that renders the category story list and loads more in
// batches of 10 as the user scrolls (infinite scroll), replacing the old
// numbered pagination.
//
// Layout mirrors rtvonline.com category view:
//   • Red category title (h1) + blue underline
//   • Lead story (big, 8-col)  + 2nd story (sidebar, 4-col) + ad
//   • Row of 4 horizontal cards (3rd–6th)
//   • Vertical feed: image left, title + date + excerpt right (7th…, grows)
//
// Server-rendered initial batch (first 10) is passed in for fast first paint
// and SEO; subsequent pages are fetched client-side from the API, which
// next.config.ts rewrites /api/* → https://api.rtvonline.com/api/*.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StoryModel } from "@/lib/types";
import { toCategoryStoryModel, ENDPOINTS } from "@/lib/api";
import AdBanner from "@/components/AdBanner";

const BATCH_SIZE = 10;

type Props = {
  slug: string;
  displayTitle: string;
  initialStories: StoryModel[];
  totalPages: number;
};

function img(src: string, alt: string, className: string) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`object-cover object-center w-full aspect-video ${className}`}
      loading="lazy"
    />
  );
}

function LeadCard({ story }: { story: StoryModel }) {
  return (
    <a
      href={story.canonicalUrl || `/story/${story.storyId}`}
      className="group block"
    >
      <div className="relative overflow-hidden">{img(story.fileName, story.mainTitle, "")}</div>
      <h2 className="category-title-catSec pt-2.5 pl-1 text-[#2F343F] dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300 line-clamp-3 font-extrabold text-2xl">
        {story.mainTitle}
      </h2>
    </a>
  );
}

function SecondCard({ story }: { story: StoryModel }) {
  return (
    <a
      href={story.canonicalUrl || `/story/${story.storyId}`}
      className="flex flex-col gap-y-2 group"
    >
      <div className="aspect-video w-full relative overflow-hidden">
        {img(story.fileName, story.mainTitle, "")}
      </div>
      <div className="mt-2 font-extrabold">
        <h3 className="main-title-post dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300">
          {story.mainTitle}
        </h3>
      </div>
      {story.subTitle && (
        <p className="text-[#555] dark:text-slate-300 line-clamp-3">
          {story.subTitle}
        </p>
      )}
    </a>
  );
}

function HorizontalCard({ story }: { story: StoryModel }) {
  return (
    <a
      href={story.canonicalUrl || `/story/${story.storyId}`}
      className="flex flex-col w-full pl-2 group flex-1 min-w-0"
    >
      <div className="relative">{img(story.fileName, story.mainTitle, "")}</div>
      <div className="pt-2">
        <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-[#0d6efd] line-clamp-2">
          {story.mainTitle}
        </h3>
      </div>
    </a>
  );
}

function VerticalItem({ story }: { story: StoryModel }) {
  return (
    <a
      href={story.canonicalUrl || `/story/${story.storyId}`}
      className="group block py-4"
    >
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Image */}
        <div className="col-span-12 md:col-span-5 overflow-hidden rounded-md">
          <div className="relative overflow-hidden rounded-md">
            {img(
              story.fileName,
              story.mainTitle,
              "transition-transform duration-300 group-hover:scale-105"
            )}
          </div>
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-7">
          <h2 className="text-[22px] font-bold leading-8 text-[#222] dark:text-white transition-colors duration-200 group-hover:text-[#D12026] line-clamp-2">
            {story.mainTitle}
          </h2>

          {story.passedTime && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {story.passedTime}
            </p>
          )}

          {story.subTitle && (
            <p className="mt-3 text-[16px] leading-7 text-[#555] dark:text-gray-300 line-clamp-2">
              {story.subTitle}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

export default function CategoryFeed({
  slug,
  displayTitle,
  initialStories,
  totalPages,
}: Props) {
  const [stories, setStories] = useState<StoryModel[]>(initialStories);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = page < totalPages - 1;

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    const next = page + 1;
    if (next >= totalPages) return;

    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(
        `${ENDPOINTS.category.header(slug)}?page=${next}&size=${BATCH_SIZE}&lang=bn`,
      );
      if (!res.ok) return;
      const data = await res.json();
      const mapped: StoryModel[] = (data?.stories?.model ?? []).map(
        toCategoryStoryModel,
      );
      if (mapped.length > 0) {
        setStories((prev) => [...prev, ...mapped]);
        setPage(next);
      }
    } catch {
      // ignore — user can scroll again to retry
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [slug, page, totalPages]);

  // Load more when the sentinel scrolls into view.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore, hasMore]);

  // If the first batch is short and the sentinel is already on-screen, fill it.
  useEffect(() => {
    if (!hasMore || loading) return;
    const el = sentinelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 400) loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stories, hasMore, loading]);

  if (stories.length === 0) {
    return (
      <p className="text-center text-foreground/60 py-16">
        এই বিভাগে কোন খবর পাওয়া যায়নি।
      </p>
    );
  }

  const [lead, second, ...rest] = stories;
  const horizontal = rest.slice(0, 4);
  const vertical = rest.slice(4);

  return (
    <div className="grid grid-cols-12 gap-x-2.5">
      <div className="col-span-12">
        {/* ── Category title ─────────────────────────────── */}
        <div className="flex flex-col gap-y-1">
          <a href={`/category/${slug}`}>
            <h1 className="text-3xl font-bold text-[#D12026]">{displayTitle}</h1>
          </a>
          <span className="block h-0.5 bg-blue-600 w-full" />
        </div>

        {/* ── Lead (8) + 2nd news (4) ────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-x-2 mt-5">
          <div className="mb-2.5 border-b pb-5">
            <div className="grid grid-cols-12 gap-2.5">
              <div className="col-span-12 lg:col-span-8 group border-r pr-2">
                {lead && <LeadCard story={lead} />}
              </div>
              <div className="col-span-12 lg:col-span-4 border-r pr-2">
                {second && <SecondCard story={second} />}
                <div className="mt-4">
                  <AdBanner height={250} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row of 4 horizontal cards ──────────────────── */}
        {horizontal.length > 0 && (
          <div className="flex flex-row flex-wrap lg:flex-nowrap gap-2 divide-x divide-[#e2e2e2] dark:divide-gray-700 border-b pb-2 mb-5">
            {horizontal.map((story) => (
              <HorizontalCard key={story.storyId} story={story} />
            ))}
          </div>
        )}

        {/* ── Vertical feed ──────────────────────────────── */}
        <div className="col-span-full lg:mx-44 xl:mx-56">
          {vertical.map((story, i) => (
            <div key={story.storyId}>
              <VerticalItem story={story} />

              {i < vertical.length - 1 && (
                <div className="h-px bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
          ))}
        </div>

        {/* ── Sentinel + status ──────────────────────────── */}
        <div ref={sentinelRef} className="h-px w-full" aria-hidden />
        <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {loading && "লোড হচ্ছে…"}
          {!hasMore && stories.length > 0 && "সব খবর দেখানো হয়েছে"}
        </div>
      </div>
    </div>
  );
}
