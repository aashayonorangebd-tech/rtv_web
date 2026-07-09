import { notFound } from "next/navigation";
import type { StoryDetailsResponse, StoryModel } from "@/lib/types";
import { toStoryModel, ENDPOINTS } from "@/lib/api";
import StoryPageClient from "@/components/StoryPageClient";

async function getStoryDetails(id: number): Promise<StoryDetailsResponse | null> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(`${base}/api/story/view/${id}`, {
      next: { revalidate: 60, tags: [`story-${id}`] },
    });
    if (!res.ok) return null;
    return res.json();
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
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getStoryDetails(Number(id));
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
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getStoryDetails(Number(id));

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