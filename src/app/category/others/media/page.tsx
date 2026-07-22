import { notFound } from "next/navigation";
import type { CategoryHeaderResponse, StoryModel } from "@/lib/types";
import { toCategoryStoryModel } from "@/lib/api";
import CategoryFeed from "@/components/CategoryFeed";

async function getHeaderMediaData(): Promise<CategoryHeaderResponse | null> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(
      `${base}/api/category/view/header/media?page=0&size=10&lang=bn`,
      { next: { revalidate: 60, tags: ["category-media"] } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata() {
  const data = await getHeaderMediaData();
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
  const data = await getHeaderMediaData();
  if (!data) return notFound();

  const initialStories: StoryModel[] = data.stories.model.map(
    toCategoryStoryModel,
  );

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6 dark:text-white">
      <CategoryFeed
        slug="others/media"
        categoryId={data.id}
        displayTitle={data.displayTitle}
        initialStories={initialStories}
        totalPages={data.stories.totalPages}
        subcategories={data.children}
        parentTitle={data.parentTitle}
        parentUrl={data.parentUrl}
      />
    </div>
  );
}
