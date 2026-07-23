"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { StoryModel } from "@/lib/types";
import { getLocationStories } from "@/lib/api";

const BATCH_SIZE = 10;

type Props = {
  districtName: string;
  subDistrictName?: string;
  divisionName?: string;
  initialStories: StoryModel[];
  totalPages: number;
  areas?: { id: number; name: string; displayName: string; href: string }[];
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
              {story.banglaDate || story.passedTime}
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

export default function LocationStoriesFeed({
  districtName,
  subDistrictName,
  divisionName,
  initialStories,
  totalPages,
  areas = [],
}: Props) {
  const [stories, setStories] = useState<StoryModel[]>(initialStories);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(totalPages);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestedPagesRef = useRef<Set<number>>(new Set([0]));

  const hasMore = page < total - 1;

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    const next = page + 1;
    if (next >= total) return;
    if (requestedPagesRef.current.has(next)) return;

    requestedPagesRef.current.add(next);
    loadingRef.current = true;
    setLoading(true);
    try {
      const data = await getLocationStories(districtName, subDistrictName, next, BATCH_SIZE, divisionName);
      const mapped = data.stories.model;
      setTotal(data.stories.totalPages || total);

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
  }, [districtName, subDistrictName, page, total]);

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

  if (stories.length === 0) {
    return (
      <p className="text-center text-foreground/60 py-16">
        এই এলাকার খবর পাওয়া যায়নি।
      </p>
    );
  }

  const [lead, second, ...rest] = stories;
  const horizontal = rest.slice(0, 4);
  const vertical = rest.slice(4);

  return (
    <div className="grid grid-cols-12 gap-x-2.5">
      <div className="col-span-12">

        {/* ── Area Tags ───────────────────────────────────────────── */}
        {areas && areas.length > 0 && (
          <div className="overflow-x-auto whitespace-nowrap no-scrollbar items-center dark:bg-black5 flex justify-start gap-2 list-none my-2.5">
            {areas.map((area, index) => (
              <span
                key={area.id}
                className="border-r border-r-black dark:border-r-white last:border-r-0"
              >
                <Link href={area.href}>
                  <span className={`text-[1.2rem] outline-none cursor-pointer hover:text-rtv-red-clr dark:hover:text-[#d8d7d7] ${index === 0 ? "pl-0 pr-3" : "px-3"}`}>
                    {area.displayName}
                  </span>
                </Link>
              </span>
            ))}
          </div>
        )}

        {/* ── Top Section: Lead Story, Second Story, and Ad Banner ─ */}
        <div className="flex flex-col lg:flex-row gap-x-4 mt-5">
          <div className="mb-2.5 border-b pb-5 flex-1 min-w-0">
            <div className="grid grid-cols-12 gap-4">

              {/* ── Lead Story (Left side, 8 columns) ────────────────── */}
              <div className="col-span-12 lg:col-span-8 group border-r border-gray-600 pr-4">
                {lead && <LeadCard story={lead} />}
              </div>

              {/* ── Second Story (Middle, 4 columns) ─────────────────── */}
              <div className="col-span-12 lg:col-span-4 border-r border-gray-600 pr-4">
                {second && <SecondCard story={second} />}
              </div>

            </div>
          </div>

          {/* ── Ad Banner (Right side, fixed 300px width) ───────────── */}
          <div className="w-full lg:w-[300px] shrink-0 flex justify-center items-start pt-2 lg:pt-0">
            <div className="w-[300px] h-[250px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
              Ad Banner
            </div>
          </div>
        </div>

        {/* ── Horizontal Cards Row (4 items side-by-side) ───────── */}
        {horizontal.length > 0 && (
          <div className="flex flex-row flex-wrap lg:flex-nowrap divide-x divide-gray-600 border-b pb-4 mb-5">
            {horizontal.map((story) => (
              <div key={story.storyId} className="flex-1 min-w-0 px-3 first:pl-0 last:pr-0">
                <HorizontalCard story={story} />
              </div>
            ))}
          </div>
        )}

        {/* ── Vertical Feed (List view: Image left, Text right) ───── */}
        <div className="col-span-full lg:mx-44 xl:mx-56">
          {vertical.map((story, i) => (
            <div key={story.storyId}>
              <VerticalItem story={story} />

              {/* ── Divider between vertical items ───────────────── */}
              {i < vertical.length - 1 && (
                <div className="h-px bg-gray-400 dark:bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* ── Infinite Scroll Sentinel & Loading Status ──────────── */}
        <div ref={sentinelRef} className="h-px w-full" aria-hidden />
        <div className="py-6 text-center text-sm text-gray-500 dark:text-foreground">
          {loading && "লোড হচ্ছে…"}
          {!hasMore && stories.length > 0 && "সব খবর দেখানো হয়েছে"}
        </div>

      </div>
    </div>
  );
}
