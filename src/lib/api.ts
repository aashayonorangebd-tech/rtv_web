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
