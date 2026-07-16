"use client";

import { useCallback, useState } from "react";
import { toImrsUrl, storyPath, getVideoGalleryStories } from "@/lib/api";
import type { StoryModel } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface Props {
  initialStories: StoryModel[];
  totalPages: number;
}

export default function VideoGalleryGrid({
  initialStories,
  totalPages,
}: Props) {
  const [stories, setStories] = useState<StoryModel[]>(initialStories);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const hasMore = page < totalPages;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await getVideoGalleryStories(nextPage, 20);
      if (data.stories.length > 0) {
        setStories((prev) => [...prev, ...data.stories]);
        setPage(nextPage);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, page, hasMore]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stories.map((story) => (
          <div key={story.storyId} className="col-span-1 h-full">
            <Link
              href={storyPath(story)}
              className="flex flex-col group w-full h-full"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={
                    story.fileName
                      ? toImrsUrl(story.fileName)
                      : "/placeholder.svg"
                  }
                  alt={story.mainTitle}
                  width={650}
                  height={365}
                  className="object-cover object-center max-w-full aspect-video"
                  loading="lazy"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-16 w-16 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold group-hover:text-blue-500 hover:cursor-pointer py-2 dark:text-white flex-1">
                {story.mainTitle}
              </h3>
            </Link>
          </div>
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
    </>
  );
}
