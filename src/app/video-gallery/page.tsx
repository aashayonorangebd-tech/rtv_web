import React from "react";
import { getVideoGalleryStories } from "@/lib/api";
import Link from "next/link";
import VideoGalleryGrid from "@/components/VideoGalleryGrid";

export default async function VideoGalleryPage() {
  const { stories, totalPages, children, displayTitle } =
    await getVideoGalleryStories(1, 20);

  return (
    <div className="font-bangla">
      <div className="main-container">
        <div className="pb-5">
          <Link href="/video-gallery">
            <h1 className="text-2xl py-2 text-red-700 font-bold">
              {displayTitle}
            </h1>
          </Link>

          {children.length > 0 && (
            <span className="col-span-full flex gap-2.5 overflow-x-auto">
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={child.slug}
                  className="bg-blue-200 px-5 rounded-sm whitespace-nowrap"
                >
                  <p className="text-blue-950 hover:font-semibold whitespace-nowrap">
                    {child.displayTitle}
                  </p>
                </Link>
              ))}
            </span>
          )}

          <hr className="mt-3 border-gray-300 dark:border-border" />
        </div>

        <VideoGalleryGrid
          initialStories={stories}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
