// ─── API Configuration & Helpers ─────────────────────────────────────────────
// Central config for all API endpoints used across the app.
// BASE_URL is set via process.env.API_BASE_URL (defaults to api.rtvonline.com).
//
// Exports:
//   API_CONFIG  — dev/prod base URLs
//   ENDPOINTS   — full endpoint path builder
//   toStoryModel() — normalises PopularApiItem | LatestApiItem → StoryModel
// ─────────────────────────────────────────────────────────────────────────────

import type {
  StoryModel,
  PopularApiItem,
  LatestApiItem,
  CategoryApiStory,
} from "@/lib/types";

export const API_CONFIG = {
  dev: "https://beta-api.rtvonline.com",
  prod: "https://api.rtvonline.com",
} as const;

export const ENDPOINTS = {
  navigation: "/api/navigation",

  collection: {
    homeTemplate: "/api/collection/view/all-active-temp-collection/stories",
    byIds: "/api/collection/view/collection/stories",
  },

  category: {
    all: "/api/category/view/all",
    stories: (id: number) => `/api/category/view/${id}/stories`,
    header: (slug: string) => `/api/category/view/header/${slug}`,
    popular: (id: number) => `/api/category/view/category/${id}/popular-stories`,
  },

  tag: {
    stories: (id: number) => `/api/tag/view/${id}/stories`,
  },

  story: {
    details: (id: number) => `/api/story/view/${id}`,
    video: (id: number) => `/api/story/view/video/${id}`,
    photo: (id: number) => `/api/story/view/photo/${id}`,
    related: (id: number) => `/api/story/view/${id}/extra`,
    archive: "/api/story/view/archive",
    popular: "/api/story/view/popular-page",
    latest: "/api/story/view/latest-tab",
  },

  utils: {
    cities: (country: string) => `/api/utils/${country}/cities`,
    prayerTimes: "/api/utils/prayer-time",
  },
} as const;

export function toStoryModel(
  item: PopularApiItem | LatestApiItem
): StoryModel {
  return {
    storyId: item.id,
    mainTitle: item.mainTitle,
    subTitle: "subTitle" in item ? (item as PopularApiItem).subTitle : "",
    fileName: item.fileName ?? "",
    passedTime: "passedTime" in item ? (item as LatestApiItem).passedTime : "",
    isLive: item.isLive,
    isVideo: item.hasVideo ? 1 : 0,
    canonicalUrl: item.canonicalUrl,
  };
}

export function storyPath(story: { storyId?: number; id?: number }): string {
  const id = story.storyId ?? story.id;
  if (!id) return "#";
  return `/story/${id}`;
}

// Normalise a raw category story (id/storyId, isLive/isVideo booleans)
// into the StoryModel shape the UI components expect.
export function toCategoryStoryModel(item: CategoryApiStory): StoryModel {
  return {
    storyId: item.id,
    mainTitle: item.mainTitle,
    subTitle: item.subTitle ?? "",
    fileName: item.fileName ?? "",
    passedTime: item.passedTime ?? "",
    isLive: item.isLive ? 1 : 0,
    isVideo: item.isVideo ? 1 : 0,
    canonicalUrl: item.canonicalUrl ?? "",
  };
}
