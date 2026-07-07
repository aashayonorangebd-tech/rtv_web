import HomePage from "@/components/HomePage";
import type { HomeTemplateResponse, CollectionItem, StoryModel } from "@/lib/types";
import { toStoryModel } from "@/lib/api";

interface CollectionStoriesResponse {
  collection: Record<string, CollectionItem>;
}

async function getHomeData(): Promise<HomeTemplateResponse | null> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/collection/view/all-active-temp-collection/stories`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getCollectionStories(
  collectionId: number
): Promise<CollectionStoriesResponse | null> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/collection/view/collection/stories?collections=${collectionId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getPopularStories(): Promise<StoryModel[]> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/story/view/popular-page?page=0&size=10`,
      { next: { revalidate: 120 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(toStoryModel);
  } catch {
    return [];
  }
}

async function getLatestStories(): Promise<StoryModel[]> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/story/view/latest-tab`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.model || []).map(toStoryModel);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [data, popularStories, latestStories] = await Promise.all([
    getHomeData(),
    getPopularStories(),
    getLatestStories(),
  ]);

  if (!data) {
    return (
      <div className="max-w-[1350px] mx-auto px-4 py-20 text-center text-foreground/60">
        Unable to load content. Please try again later.
      </div>
    );
  }

  const subHeroComp = data.templateComponentList.find(
    (c) => c.componentId === "s2_comp1"
  );

  let subHeroData: CollectionStoriesResponse | null = null;
  if (subHeroComp) {
    subHeroData = await getCollectionStories(subHeroComp.collectionId);
  }

  return (
    <HomePage
      data={data}
      subHeroData={subHeroData}
      popularStories={popularStories}
      latestStories={latestStories}
    />
  );
}
