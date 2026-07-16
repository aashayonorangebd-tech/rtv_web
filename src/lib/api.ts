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
  CategoryHeaderResponse,
  ArchiveApiItem,
  ArchiveResponse,
  VideoGalleryData,
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

  publicOpinion: {
    activeForHome: "/api/public-opinion/view/active-opinion-for-home",
    voteSubmit: (id: number) => `/api/public-opinion/view/vote-submit/${id}`,
  },

  location: {
    divisions: "/api/get-area-serach",
    districts: (divisionId: number) => `/api/get-district-value?divisionId=${divisionId}`,
    subDistricts: (districtId: number) => `/api/get-subdistrict-value?districtId=${districtId}`,
  },
} as const;

export function toStoryModel(
  item: PopularApiItem | LatestApiItem | ArchiveApiItem
): StoryModel {
  return {
    storyId: item.id,
    mainTitle: item.mainTitle,
    subTitle: "subTitle" in item ? (item as PopularApiItem | ArchiveApiItem).subTitle : "",
    fileName: item.fileName ?? "",
    passedTime: "passedTime" in item ? (item as LatestApiItem | ArchiveApiItem).passedTime ?? "" : "",
    isLive: item.isLive,
    isVideo: item.hasVideo ? 1 : 0,
    banglaDate: "banglaDate" in item ? (item as ArchiveApiItem).banglaDate : undefined,
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
  };
}

export function toImrsUrl(
  cdnUrl: string,
  w = 650,
  h = 365
): string {
  try {
    const u = new URL(cdnUrl);
    return `https://imrs.rtvonline.com/api/image-service/resize?w=${w}&h=${h}&q=75&cmp=RM&img=${u.pathname}`;
  } catch {
    return cdnUrl;
  }
}

export async function getVideoGalleryStories(
  page: number = 1,
  size: number = 20
): Promise<VideoGalleryData> {
  try {
    const url = new URL(
      `${process.env.API_BASE_URL || API_CONFIG.prod}${ENDPOINTS.category.header("video-gallery")}`
    );
    if (page > 1) {
      url.searchParams.set("page", String(page));
    }
    url.searchParams.set("size", String(size));

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });
    if (!res.ok)
      return { stories: [], totalPages: 0, currentPage: 0, children: [], displayTitle: "ভিডিও" };

    const data: CategoryHeaderResponse = await res.json();

    const stories = (data?.stories?.model || []).map((item) => ({
      ...toCategoryStoryModel(item),
      storyId: item.id,
    }));

    return {
      stories,
      totalPages: data?.stories?.totalPages || 0,
      currentPage: data?.stories?.currentPage || 0,
      children: data?.children || [],
      displayTitle: data?.displayTitle || "ভিডিও",
    };
  } catch {
    return { stories: [], totalPages: 0, currentPage: 0, children: [], displayTitle: "ভিডিও" };
  }
}

export async function getArchiveStories(
  page: number = 0,
  size: number = 12
): Promise<{ stories: StoryModel[]; totalPages: number; currentPage: number }> {
  try {
    const url = new URL(
      `${process.env.API_BASE_URL || API_CONFIG.prod}${ENDPOINTS.story.archive}`
    );
    url.searchParams.set("page", String(page));
    url.searchParams.set("size", String(size));
    url.searchParams.set("mainTitle", "");
    url.searchParams.set("lang", "bn");

    const res = await fetch(url.toString(), { next: { revalidate: 30 } });
    if (!res.ok) return { stories: [], totalPages: 0, currentPage: 0 };
    const data: ArchiveResponse = await res.json();
    return {
      stories: (data.model || []).map(toStoryModel),
      totalPages: data.totalPages || 0,
      currentPage: data.currentPage || 0,
    };
  } catch {
    return { stories: [], totalPages: 0, currentPage: 0 };
  }
}
