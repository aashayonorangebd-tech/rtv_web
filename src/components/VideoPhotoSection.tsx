import React from "react";
import { ENDPOINTS, toCategoryStoryModel, storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";
import Image from "next/image";

const API_BASE = process.env.API_BASE_URL || "https://api.rtvonline.com";

async function fetchStories(
  slug: string
): Promise<import("@/lib/types").StoryModel[]> {
  try {
    const res = await fetch(
      `${API_BASE}${ENDPOINTS.category.header(slug)}?page=&size=20`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.stories?.model || []).map(toCategoryStoryModel);
  } catch {
    return [];
  }
}

export default async function VideoPhotoSection() {
  const [videoStories, photoStories] = await Promise.all([
    fetchStories("video-gallery"),
    fetchStories("photo-gallery"),
  ]);

  if (videoStories.length < 1 && photoStories.length < 1) return null;

  const videoFeatured = videoStories[0];
  const videoGrid = videoStories.slice(1, 4);
  const photoFeatured = photoStories[0];
  const photoGrid = photoStories.slice(1, 4);

  return (
    <section className="section-padding">
      <div className="main-container">
        <div className="grid gap-2.5 my-5 grid-cols-12 pb-5 border-b border-rtv-border-clr dark:border-border">
          {/* ─── Video Column ─────────────────────────────────────────── */}
          <div className="col-span-6 border-r border-rtv-border-clr pr-2.5 dark:border-border">
            <SectionHeader title="ভিডিও" href="/video-gallery" />

            {videoFeatured && (
              <Link
                className="flex flex-col w-full group"
                href={`${storyPath(videoFeatured)}?type=video`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={videoFeatured.fileName}
                    alt={videoFeatured.mainTitle}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                <div className="pt-2">
                  <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                    {videoFeatured.mainTitle}
                  </h3>
                </div>
              </Link>
            )}

            {videoGrid.length > 0 && (
              <div className="flex gap-5 mt-5">
                {videoGrid.map((story) => (
                  <div key={story.storyId} className="flex-1 min-w-0">
                    <Link
                      className="flex flex-col w-full group"
                      href={`${storyPath(story)}?type=video`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={story.fileName}
                          alt={story.mainTitle}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                      <div className="pt-2">
                        <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                          {story.mainTitle}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <hr className="mt-5 border-rtv-border-clr dark:border-border" />
          </div>

          {/* ─── Photo Column ─────────────────────────────────────────── */}
          <div className="col-span-6 pr-2.5">
            <SectionHeader title="ছবি" href="/photo-gallery" />

            {photoFeatured && (
              <Link
                className="flex flex-col w-full group"
                href={storyPath(photoFeatured)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={photoFeatured.fileName}
                    alt={photoFeatured.mainTitle}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute right-0 top-0">
                    <div className="p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        fill="#fff"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-6 w-6 text-white"
                      >
                        <path d="M0 96c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm323.8 106.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6-26.5-33.1c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4S78.8 416 88 416h336c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 100-96 48 48 0 100 96z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                    {photoFeatured.mainTitle}
                  </h3>
                </div>
              </Link>
            )}

            {photoGrid.length > 0 && (
              <div className="flex gap-5 mt-5">
                {photoGrid.map((story) => (
                  <div key={story.storyId} className="flex-1 min-w-0">
                    <Link
                      className="flex flex-col w-full group"
                      href={storyPath(story)}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={story.fileName}
                          alt={story.mainTitle}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute right-0 top-0">
                          <div className="p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              fill="#fff"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="h-6 w-6 text-white"
                            >
                              <path d="M0 96c0-35.3 28.7-64 64-64h384c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm323.8 106.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6-26.5-33.1c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4S78.8 416 88 416h336c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 100-96 48 48 0 100 96z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                          {story.mainTitle}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <hr className="mt-5 border-rtv-border-clr dark:border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
