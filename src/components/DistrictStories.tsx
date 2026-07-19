"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ENDPOINTS, getElectionAreaStories } from "@/lib/api";
import type { StoryModel, LocationApiStory } from "@/lib/types";

function normalize(item: LocationApiStory): StoryModel {
  return {
    storyId: item.id,
    mainTitle: item.mainTitle,
    subTitle: item.subTitle ?? "",
    fileName: item.fileName ?? "",
    passedTime: item.passedTime ?? item.banglaDate ?? "",
    isLive: item.isLive ? 1 : 0,
    isVideo: item.isVideo ? 1 : 0,
    banglaDate: item.banglaDate,
  };
}

export default function DistrictStories({
  districtId,
  electionAreaId,
  initialStories,
  initialTotalPages,
  initialPage,
  pageSize = 10,
}: {
  districtId: number;
  electionAreaId?: number;
  initialStories: StoryModel[];
  initialTotalPages: number;
  initialPage: number;
  pageSize?: number;
}) {
  const [stories, setStories] = useState<StoryModel[]>(initialStories);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const hasMore = page + 1 < totalPages;

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    if (districtId === undefined) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      // API is 0-indexed: page=0 -> first page (currentPage:1),
      // page=1 -> second page, etc. Next request is page + 1.
      const next = page + 1;
      const data = await getElectionAreaStories(
        districtId,
        electionAreaId,
        next,
        pageSize
      );
      setStories((prev) => {
        const ids = new Set(prev.map((s) => s.storyId));
        return [...prev, ...data.model.filter((s) => !ids.has(s.storyId))];
      });
      setTotalPages(data.totalPages || totalPages);
      setPage(next);
    } catch {
      // keep existing stories on error
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [districtId, electionAreaId, page, hasMore, totalPages, pageSize]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 600
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
        {stories.map((story) => (
          <a
            key={story.storyId}
            href={`/country/${story.storyId}`}
            className="group flex flex-col"
          >
            <div className="relative w-full aspect-video overflow-hidden rounded-[2px] mb-2 bg-gray-100 dark:bg-surface">
              <img
                src={story.fileName}
                alt={story.mainTitle}
                loading="lazy"
                className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              {story.isVideo === 1 && (
                <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded-[2px]">
                  ভিডিও
                </span>
              )}
            </div>
            <h3 className="font-bold text-[16px] leading-[23px] text-rtv-text-dark dark:text-white group-hover:text-rtv-blue-text-hover transition-colors line-clamp-3">
              {story.mainTitle}
            </h3>
            {story.passedTime && (
              <span className="mt-1 block text-[11px] font-medium text-[#888888] dark:text-foreground">
                {story.passedTime}
              </span>
            )}
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="text-[1.3rem] text-white bg-hover-text-color rounded-lg px-10 py-2.5 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "লোড হচ্ছে..." : "আরও দেখুন"}
          </button>
        </div>
      )}
    </div>
  );
}
