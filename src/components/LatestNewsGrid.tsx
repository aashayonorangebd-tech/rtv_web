"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StoryModel } from "@/lib/types";
import { getArchiveStories } from "@/lib/api";
import StoryHorizontalCard from "./StoryHorizontalCard";

type Props = {
  initialStories: StoryModel[];
  totalPages: number;
};

const PAGE_SIZE = 12;

export default function LatestNewsGrid({ initialStories, totalPages }: Props) {
  const [stories, setStories] = useState<StoryModel[]>(initialStories);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const hasMore = page < totalPages;

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await getArchiveStories(nextPage, PAGE_SIZE);
      if (data.stories.length > 0) {
        setStories((prev) => [...prev, ...data.stories]);
        setPage(nextPage);
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") loadMore();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loadMore]);

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-0">
      <main className="mt-2 overflow-hidden">
      <div className="font-bangla">
        <div className="main-container-topic">
          <h1 id="root" className="text-2xl font-bold dark:text-white">
            সর্বশেষ সব খবর
          </h1>
          <div className="mt-2 mb-2 flex items-baseline">
            <div className="h-[2px] w-full bg-blue-600" />
          </div>
          <div className="grid sm:grid-cols-3 gap-y-2 gap-x-2.5">
            {stories.map((story) => (
              <StoryHorizontalCard key={story.storyId} story={story} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center my-3">
              <button
                onClick={loadMore}
                disabled={loading}
                className="latestToArchiveBtn disabled:opacity-60"
              >
                {loading ? "লোড হচ্ছে…" : "আরও"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
    </div>
  );
}
