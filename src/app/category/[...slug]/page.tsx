// ─── Category Page (National / Politics / …) ───────────────────────────────
// Server-rendered shell for a category slug (/category/{slug}).
//
// Data source: SLUG-type navigation endpoint
//   GET /api/category/view/header/{slug}?page=0&size=10&lang=bn
// returns the category metadata (id, displayTitle) AND its first 10 stories.
// Further pages are loaded on scroll by the client CategoryFeed component via
// the /api/* rewrite (next.config.ts).
//
// Layout (matches rtvonline.com category view, in dark mode):
//   • Lead story (large)
//   • Row of 4 smaller stories
//   • Vertical feed: image left, title + date/time + excerpt right (infinite)
// ───────────────────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import type {
  CategoryHeaderResponse,
  StoryModel,
} from "@/lib/types";
import { ENDPOINTS, toCategoryStoryModel } from "@/lib/api";
import CategoryFeed from "@/components/CategoryFeed";

const PAGE_SIZE = 10;

async function getCategoryData(
  slug: string[],
  page: number,
): Promise<CategoryHeaderResponse | null> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const leafSlug = slug[slug.length - 1];
    const res = await fetch(
      `${base}${ENDPOINTS.category.header(leafSlug)}?page=${page}&size=${PAGE_SIZE}&lang=bn`,
      { next: { revalidate: 60, tags: [`category-${leafSlug}`] } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const data = await getCategoryData(slug, 0);
  if (!data) return { title: "Category Not Found | RTV Online" };

  return {
    title: `${data.displayTitle} | RTV Online`,
    description: `${data.displayTitle} – সর্বশেষ খবর ও আপডেট`,
    openGraph: {
      title: `${data.displayTitle} | RTV Online`,
      description: `${data.displayTitle} – সর্বশেষ খবর ও আপডেট`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");

  const data = await getCategoryData(slug, 0);
  if (!data) return notFound();

  const initialStories: StoryModel[] = data.stories.model.map(
    toCategoryStoryModel,
  );

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6 dark:text-white">
      <CategoryFeed
        slug={slugPath}
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
