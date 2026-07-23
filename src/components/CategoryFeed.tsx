"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { StoryModel, ChildCategory, Division, District } from "@/lib/types";
import { toCategoryStoryModel, ENDPOINTS } from "@/lib/api";
import AdBanner from "@/components/AdBanner";

const BATCH_SIZE = 10;

type Props = {
  slug: string;
  categoryId: number;
  displayTitle: string;
  initialStories: StoryModel[];
  totalPages: number;
  subcategories?: ChildCategory[];
  parentTitle?: string;
  parentUrl?: string;
  areas?: (Division | District)[];
};

function img(src: string, alt: string, className: string) {
  return (
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
    <a href={`/story/${story.storyId}`} className="group block">
      <div className="relative overflow-hidden">{img(story.fileName, story.mainTitle, "")}</div>
      <h2 className="category-title-catSec pt-2.5 pl-1 text-[#2F343F] dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300 line-clamp-3 font-extrabold text-2xl">
        {story.mainTitle}
      </h2>
    </a>
  );
}

function SecondCard({ story }: { story: StoryModel }) {
  return (
    <a href={`/story/${story.storyId}`} className="flex flex-col gap-y-2 group">
      <div className="aspect-video w-full relative overflow-hidden">
        {img(story.fileName, story.mainTitle, "")}
      </div>
      <div className="mt-2 font-extrabold">
        <h3 className="main-title-post dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300">
          {story.mainTitle}
        </h3>
      </div>
      {story.subTitle && (
        <p className="text-[#555] dark:text-foreground line-clamp-3">
          {story.subTitle}
        </p>
      )}
    </a>
  );
}

function HorizontalCard({ story }: { story: StoryModel }) {
  return (
    <a href={`/story/${story.storyId}`} className="flex flex-col w-full group">
      <div className="relative">{img(story.fileName, story.mainTitle, "")}</div>
      <div className="pt-2">
        <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover line-clamp-2">
          {story.mainTitle}
        </h3>
      </div>
    </a>
  );
}

function VerticalItem({ story }: { story: StoryModel }) {
  return (
    <a href={`/story/${story.storyId}`} className="group block py-4">
      <div className="grid grid-cols-12 gap-4 items-start">
        <div className="col-span-12 md:col-span-5 overflow-hidden rounded-md">
          <div className="relative overflow-hidden rounded-md">
            {img(
              story.fileName,
              story.mainTitle,
              "transition-transform duration-300 group-hover:scale-105"
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-7">
          <h2 className="text-[22px] font-bold leading-8 text-[#222] dark:text-white transition-colors duration-200 group-hover:text-[#D12026] line-clamp-2">
            {story.mainTitle}
          </h2>

          {story.passedTime && (
            <p className="mt-2 text-sm text-gray-500 dark:text-foreground">
              {story.passedTime}
            </p>
          )}

          {story.subTitle && (
            <p className="mt-3 text-[16px] leading-7 text-[#555] dark:text-foreground line-clamp-2">
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
  categoryId,
  displayTitle,
  initialStories,
  totalPages,
  subcategories,
  parentTitle,
  parentUrl,
  areas = [],
}: Props) {
  const [stories, setStories] = useState<StoryModel[]>(initialStories);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestedPagesRef = useRef<Set<number>>(new Set([0]));

  const hasMore = page < totalPages - 1;

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    const next = page + 1;
    if (next >= totalPages) return;
    if (requestedPagesRef.current.has(next)) return;

    requestedPagesRef.current.add(next);
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(
        `${ENDPOINTS.category.stories(categoryId)}?page=${next}&size=${BATCH_SIZE}&lang=bn`,
      );
      if (!res.ok) {
        requestedPagesRef.current.delete(next);
        return;
      }
      const data = await res.json();
      const raw = Array.isArray(data) ? data : data?.model ?? [];
      const mapped: StoryModel[] = raw.map(toCategoryStoryModel);
      if (mapped.length > 0) {
        setStories((prev) => {
          const existingIds = new Set(prev.map((s) => s.storyId));
          const newStories = mapped.filter((s) => !existingIds.has(s.storyId));
          return [...prev, ...newStories];
        });
        setPage(next);
      } else {
        setPage(next);
        requestedPagesRef.current.delete(next);
      }
    } catch {
      requestedPagesRef.current.delete(next);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [categoryId, page, totalPages]);

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

  useEffect(() => {
    if (!hasMore || loading) return;
    const el = sentinelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 400) loadMore();
  }, [loadMore, stories, hasMore, loading]);

  const toCategoryPath = (url?: string) => {
    if (!url) return "#";
    try {
      const u = new URL(url);
      const path = u.pathname.replace(/\/$/, "");
      return `/category${path}`;
    } catch {
      return "#";
    }
  };

  const toChildCategoryPath = (child: ChildCategory): string => {
    if (child.canonicalUrl) {
      return toCategoryPath(child.canonicalUrl);
    }
    return toCategoryPath(`https://rtvonline.com${child.slug}`);
  };

  return (
    <div className="grid grid-cols-12 gap-x-2.5">
      <div className="col-span-12">

        {/* ── Category Breadcrumb & Subcategories ───────────────────── */}
        <div className="flex flex-col gap-y-1">
          {parentTitle && (
            <Link href={toCategoryPath(parentUrl)}>
              <h1 className="text-blue-500 font-bold underline underline-offset-2 text-lg w-full dark:text-blue-400 dark:hover:text-blue-300">
                {parentTitle}
              </h1>
            </Link>
          )}
          <div className="flex flex-col gap-y-1">
            <Link href={`/category/${slug}`}>
              <h1 className="text-3xl font-bold text-[#D12026]">{displayTitle}</h1>
            </Link>
            {subcategories && subcategories.length > 0 && (
              <div className="flex flex-wrap items-center justify-start gap-2">
                {subcategories.map((child) => (
                  <span key={child.id} className="py-1 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#2c4c9d] dark:bg-gray-300"></div>
                    <Link href={toChildCategoryPath(child)}>
                      <span className="text-[1.2rem] pr-3 cursor-pointer hover:text-blue-600 dark:hover:text-[#d8d7d7] text-[#222] dark:text-white">
                        {child.displayTitle}
                      </span>
                    </Link>
                  </span>
                ))}
              </div>
            )}
            {areas && areas.length > 0 && (
              <div className="flex flex-wrap items-center justify-start gap-2">
                {areas.map((area) => {
                  const href =
                    "divisionName" in area
                      ? `/country/${area.divisionName.toLowerCase()}/${area.name.toLowerCase()}`
                      : `/country/${area.name.toLowerCase()}`;

                  return (
                    <span key={area.id} className="py-1 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2c4c9d] dark:bg-gray-300"></div>
                      <Link href={href}>
                        <span className="text-[1.2rem] pr-3 cursor-pointer hover:text-blue-600 dark:hover:text-[#d8d7d7] text-[#222] dark:text-white">
                          {area.displayName}
                        </span>
                      </Link>
                    </span>
                  );
                })}
              </div>
            )}
            <span className="block h-0.5 bg-blue-600 w-full" />
          </div>
        </div>

        {stories.length === 0 ? (
          <p className="text-center text-foreground/60 py-16">
            এই বিভাগে কোন খবর পাওয়া যায়নি।
          </p>
        ) : (
          <>
            {/* ── Top Section: Lead Story, Second Story, and Ad Banner ─ */}
            <div className="flex flex-col lg:flex-row gap-x-4 mt-5">
              <div className="mb-2.5 border-b pb-5 flex-1 min-w-0">
                <div className="grid grid-cols-12 gap-4">

                  {/* ── Lead Story (Left side, 8 columns) ────────────────── */}
                  <div className="col-span-12 lg:col-span-8 group border-r border-gray-600 pr-4">
                    {stories[0] && <LeadCard story={stories[0]} />}
                  </div>

                  {/* ── Second Story (Middle, 4 columns) ─────────────────── */}
                  <div className="col-span-12 lg:col-span-4 border-r border-gray-600 pr-4">
                    {stories[1] && <SecondCard story={stories[1]} />}
                  </div>

                </div>
              </div>

              {/* ── Ad Banner (Right side, fixed 300px width) ────────────── */}
              <div className="w-full lg:w-[300px] shrink-0 flex justify-center items-start pt-2 lg:pt-0">
                <AdBanner height={250} />
              </div>
            </div>

            {/* ── Horizontal Cards Row (4 items side-by-side) ────────────── */}
            {stories.length > 4 && (
              <div className="flex flex-row flex-wrap lg:flex-nowrap divide-x divide-gray-600 border-b pb-4 mb-5">
                {stories.slice(2, 6).map((story) => (
                  <div key={story.storyId} className="flex-1 min-w-0 px-3 first:pl-0 last:pr-0">
                    <HorizontalCard story={story} />
                  </div>
                ))}
              </div>
            )}

            {/* ── Vertical Feed (List view: Image left, Text right) ──────── */}
            <div className="col-span-full lg:mx-44 xl:mx-56">
              {stories.slice(6).map((story, i) => (
                <div key={story.storyId}>
                  <VerticalItem story={story} />

                  {/* ── Divider between vertical items ───────────────────── */}
                  {i < stories.slice(6).length - 1 && (
                    <div className="h-px bg-gray-400 dark:bg-border" />
                  )}
                </div>
              ))}
            </div>

            {/* ── Infinite Scroll Sentinel & Loading Status ──────────────── */}
            <div ref={sentinelRef} className="h-px w-full" aria-hidden />
            <div className="py-6 text-center text-sm text-gray-500 dark:text-foreground">
              {loading && "লোড হচ্ছে…"}
              {!hasMore && stories.length > 0 && "সব খবর দেখানো হয়েছে"}
            </div>

          </>
        )}
      </div>
    </div>
  );
}
