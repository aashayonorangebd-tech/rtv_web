import { notFound } from "next/navigation";
import type { StoryDetailsResponse, StoryModel, CategoryItem } from "@/lib/types";
import { toStoryModel, ENDPOINTS } from "@/lib/api";
import StoryPageClient from "@/components/StoryPageClient";

const API_BASE = process.env.API_BASE_URL || "https://api.rtvonline.com";

async function getStoryDetails(id: number): Promise<StoryDetailsResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/story/view/${id}`, {
      next: { revalidate: 60, tags: [`story-${id}`] },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getVideoStoryDetails(id: number): Promise<StoryDetailsResponse | null> {
  try {
    const res = await fetch(`${API_BASE}${ENDPOINTS.story.video(id)}`, {
      next: { revalidate: 60, tags: [`story-video-${id}`] },
    });
    if (!res.ok) return null;
    const raw: Record<string, unknown> = await res.json();
    const category: CategoryItem = {
      id: (raw.categoryId as number) || 0,
      name: (raw.categoryName as string) || "",
      displayTitle: (raw.categoryDisplayTitle as string) || "",
      slug: (raw.categorySlug as string) || "",
      parentId: 0, menuId: 0, type: "", metaTitle: "", metaDescription: "", metaKeywords: "",
    };
    return {
      id: (raw.id as number) || id,
      version: "",
      mainTitle: (raw.mainTitle as string) || "",
      subtitle: "",
      mainImageFileName: "",
      mainOgImageFileName: "",
      bannerImageFileName: "",
      alt: "",
      passedTime: (raw.passedTime as string) || "",
      seoMetaTitle: (raw.metaTitle as string) || (raw.mainTitle as string) || "",
      expired: false,
      live: (raw.live as boolean) || false,
      liveContent: false,
      shoulderText: "",
      canonicalUrl: (raw.canonicalUrl as string) || "",
      ampUrl: "",
      storyGroupId: 0,
      storyType: "VIDEO",
      embeddedVideoLink: (raw.embeddedVideoLink as string) || null,
      embeddedVideoType: (raw.embeddedVideoType as string) || null,
      details: [],
      tags: [],
      writers: [],
      categories: [category],
      timelineStories: [],
      readMoreStories: [],
      attachments: [],
    };
  } catch {
    return null;
  }
}

async function getPopularStories(): Promise<StoryModel[]> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(`${base}/api/story/view/popular-page?page=0&size=10`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(toStoryModel);
  } catch {
    return [];
  }
}

async function getLatestStories(): Promise<StoryModel[]> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(`${base}/api/story/view/latest-tab`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.model || []).map(toStoryModel);
  } catch {
    return [];
  }
}

async function getCategoryPopularStories(categoryId: number): Promise<StoryModel[]> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(
      `${base}${ENDPOINTS.category.popular(categoryId)}`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (Array.isArray(data) ? data : []).map(toStoryModel);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const isVideo = sp.type === "video";
  const data = isVideo
    ? await getVideoStoryDetails(Number(id))
    : await getStoryDetails(Number(id));
  if (!data) return { title: "Story Not Found | RTV Online" };

  return {
    title: `${data.seoMetaTitle || data.mainTitle} | RTV Online`,
    description: data.seoMetaTitle || data.mainTitle,
    openGraph: {
      title: data.mainTitle,
      description: data.subtitle,
      images: [data.mainOgImageFileName || data.mainImageFileName || "/rtv-logo.svg"],
    },
  };
}

export default async function StoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const isVideo = sp.type === "video";

  const data = isVideo
    ? await getVideoStoryDetails(Number(id))
    : await getStoryDetails(Number(id));

  if (!data) return notFound();

  const categoryId = data.categories?.[0]?.id;
  const [popularStories, latestStories, categoryPopularStories] = await Promise.all([
    getPopularStories(),
    getLatestStories(),
    categoryId ? getCategoryPopularStories(categoryId) : Promise.resolve([]),
  ]);

  return (
    <StoryPageClient
      story={data}
      popularStories={popularStories}
      latestStories={latestStories}
      categoryPopularStories={categoryPopularStories}
      categoryName={data.categories?.[0]?.displayTitle || ""}
    />
  );
}
