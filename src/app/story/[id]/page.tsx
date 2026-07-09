import { notFound } from "next/navigation";
import type { StoryDetailsResponse } from "@/lib/types";
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

  return <StoryPageClient story={data} />;
}