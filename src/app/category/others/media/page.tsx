import { notFound } from "next/navigation";
import type { CategoryHeaderResponse, StoryModel } from "@/lib/types";
import { ENDPOINTS, toCategoryStoryModel } from "@/lib/api";
import CategoryFeed from "@/components/CategoryFeed";

const PAGE_SIZE = 10;

async function getMediaMetadata(): Promise<CategoryHeaderResponse | null> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(
      `${base}${ENDPOINTS.category.view(9)}?page=0&size=${PAGE_SIZE}&lang=bn`,
      { next: { revalidate: 60, tags: ["category-others-media"] } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getMediaStories(
  page: number,
): Promise<{ model: CategoryHeaderResponse["stories"]["model"]; totalPages: number }> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(
      `${base}${ENDPOINTS.category.view(9)}/stories?page=${page}&size=${PAGE_SIZE}&lang=bn`,
      { next: { revalidate: 60, tags: ["category-others-media"] } },
    );
    if (!res.ok) return { model: [], totalPages: 0 };
    const data = await res.json();
    return {
      model: data.model ?? [],
      totalPages: data.totalPages ?? 0,
    };
  } catch {
    return { model: [], totalPages: 0 };
  }
}

export async function generateMetadata() {
  const data = await getMediaMetadata();
  if (!data) return { title: "মিডিয়া | RTV Online" };

  return {
    title: `${data.displayTitle} | RTV Online`,
    description: `${data.displayTitle} – সর্বশেষ খবর ও আপডেট`,
    openGraph: {
      title: `${data.displayTitle} | RTV Online`,
      description: `${data.displayTitle} – সর্বশেষ খবর ও আপডেট`,
    },
  };
}

export default async function MediaCategoryPage() {
  const [metadata, initialStoriesData] = await Promise.all([
    getMediaMetadata(),
    getMediaStories(0),
  ]);

  if (!metadata) return notFound();

  const initialStories: StoryModel[] = initialStoriesData.model.map(
    toCategoryStoryModel,
  );

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6 dark:text-white">
      <CategoryFeed
        slug="others/media"
        categoryId={metadata.id}
        displayTitle={metadata.displayTitle}
        initialStories={initialStories}
        totalPages={initialStoriesData.totalPages}
        subcategories={metadata.children}
        parentTitle={metadata.parentTitle}
        parentUrl={metadata.parentUrl}
      />
    </div>
  );
}
