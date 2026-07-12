// ─── Category Page (National / Politics / …) ───────────────────────────────
// Server-rendered listing for a category slug (/category/{slug}).
//
// Data source: SLUG-type navigation endpoint
//   GET /api/category/view/header/{slug}?page={n}&size=20&lang=bn
// which returns the category metadata (id, displayTitle) AND its paginated
// stories in a single call — identical to the Flutter app's category feed.
//
// Pagination is driven by the `?page=` search param (0-indexed, matching the
// API), rendered as server-side links so no client JS is required.
// ───────────────────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import Link from "next/link";
import type {
  CategoryHeaderResponse,
  StoryModel,
} from "@/lib/types";
import { ENDPOINTS, toCategoryStoryModel } from "@/lib/api";
import { StoryCardLarge, StoryCardMedium } from "@/components/StoryCard";
import CategoryPopularSidebar from "@/components/CategoryPopularSidebar";
import AdBanner from "@/components/AdBanner";

const PAGE_SIZE = 20;

async function getCategoryData(
  slug: string,
  page: number,
): Promise<CategoryHeaderResponse | null> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(
      `${base}${ENDPOINTS.category.header(slug)}?page=${page}&size=${PAGE_SIZE}&lang=bn`,
      { next: { revalidate: 60, tags: [`category-${slug}`] } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getCategoryPopularStories(
  categoryId: number,
): Promise<StoryModel[]> {
  try {
    const base = process.env.API_BASE_URL || "https://api.rtvonline.com";
    const res = await fetch(
      `${base}${ENDPOINTS.category.popular(categoryId)}`,
      { next: { revalidate: 120 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (Array.isArray(data) ? data : []).map(toCategoryStoryModel);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
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

function Pagination({
  slug,
  currentPage,
  totalPages,
}: {
  slug: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (p: number) =>
    p === 0 ? `/category/${slug}` : `/category/${slug}?page=${p}`;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <nav className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {currentPage > 0 && (
        <a
          href={pageHref(currentPage - 1)}
          className="px-3 py-1.5 rounded border border-[#e2e2e2] dark:border-gray-700 text-sm font-bold text-[#2c4b9c] dark:text-slate-300 hover:bg-[#2c4b9c] hover:text-white transition-colors"
        >
          ← আগের
        </a>
      )}

      {pages.map((p) => (
        <a
          key={p}
          href={pageHref(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={`min-w-[36px] text-center px-3 py-1.5 rounded border text-sm font-bold transition-colors ${
            p === currentPage
              ? "bg-[#2c4b9c] text-white border-[#2c4b9c]"
              : "border-[#e2e2e2] dark:border-gray-700 text-[#2c4b9c] dark:text-slate-300 hover:bg-[#2c4b9c] hover:text-white"
          }`}
        >
          {p + 1}
        </a>
      ))}

      {currentPage < totalPages - 1 && (
        <a
          href={pageHref(currentPage + 1)}
          className="px-3 py-1.5 rounded border border-[#e2e2e2] dark:border-gray-700 text-sm font-bold text-[#2c4b9c] dark:text-slate-300 hover:bg-[#2c4b9c] hover:text-white transition-colors"
        >
          পরের →
        </a>
      )}
    </nav>
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(0, Number(pageParam) || 0);

  const data = await getCategoryData(slug, page);
  if (!data) return notFound();

  const stories: StoryModel[] = data.stories.model.map(toCategoryStoryModel);
  const [lead, ...rest] = stories;

  const [popularStories] = await Promise.all([
    getCategoryPopularStories(data.id),
  ]);

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6 dark:text-white">
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-[#2c4b9c]">
          হোম
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{data.displayTitle}</span>
      </nav>

      {/* ── Category heading ───────────────────────────────────── */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#2c4b9c] dark:text-white border-b-2 border-[#2c4b9c] dark:border-white pb-2 mb-6">
        {data.displayTitle}
      </h1>

      <div className="grid grid-cols-12 gap-6">
        {/* ── Main column (9-col) ──────────────────────────────── */}
        <div className="col-span-12 lg:col-span-9">
          {stories.length === 0 ? (
            <p className="text-center text-foreground/60 py-16">
              এই বিভাগে কোন খবর পাওয়া যায়নি।
            </p>
          ) : (
            <>
              {lead && (
                <div className="mb-6 pb-6 border-b border-[#e2e2e2] dark:border-gray-700">
                  <StoryCardLarge story={lead} />
                </div>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                  {rest.map((story) => (
                    <StoryCardMedium key={story.storyId} story={story} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Sidebar (3-col) ──────────────────────────────────── */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <CategoryPopularSidebar
            categoryName={data.displayTitle}
            stories={popularStories}
          />
          <AdBanner height={250} />
        </aside>
      </div>
    </div>
  );
}
