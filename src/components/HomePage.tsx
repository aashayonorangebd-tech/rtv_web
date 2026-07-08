// ─── HomePage ──────────────────────────────────────────────────────────────
// Main page layout component that receives API data from page.tsx and
// composes all sections of the homepage:
//
//   1. HeroSection       — lead stories + ad sidebar (API-driven)
//   2. SubHeroGrid       — secondary 3×3 grid + tabs
//   3. HomePageSections  — special report carousel + category sections
//
// Data flow:
//   - s1_comp4 (seq 2, coll 11) → leadStories[0..3] for HeroSection
//   - s2_comp1 (seq 3, coll 41) → subHeroStories[0..9] for SubHeroGrid
//   - Remaining sections sorted by sequence → HomePageSections
// ─────────────────────────────────────────────────────────────────────────

import type {
  HomeTemplateResponse,
  CollectionItem,
  StoryModel,
  TemplateComponent,
} from "@/lib/types";
import type { SectionConfig } from "@/components/HomePageSections";
import { toStoryModel } from "@/lib/api";
import HeroSection from "@/components/HeroSection";
import SubHeroGrid from "@/components/SubHeroGrid";
import HomePageSections from "@/components/HomePageSections";
import AdBanner from "@/components/AdBanner";

// ── API helpers ─────────────────────────────────────────────────────────

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

// ── Helpers ──────────────────────────────────────────────────────────────

/** Extract stories + title from a template component's collection data. */
function toSectionConfig(
  comp: TemplateComponent,
  collection: Record<string, CollectionItem>,
): SectionConfig {
  const col = collection[comp.collectionId];
  const group = col?.storyList?.[0];
  return {
    componentId: comp.componentId,
    displayTitle: group?.displayTitle ?? null,
    slug: group?.slug ?? null,
    stories: group?.stories ?? [],
  };
}

// ── Component ────────────────────────────────────────────────────────────

export default async function HomePage() {
  // ── Fetch all data in parallel ───────────────────────────────────────
  const [templateResponse, popularStories, latestStories] = await Promise.all([
    getHomeData(),
    getPopularStories(),
    getLatestStories(),
  ]);

  if (!templateResponse) {
    return (
      <div className="max-w-[1350px] mx-auto px-4 py-20 text-center text-foreground/60">
        Unable to load content. Please try again later.
      </div>
    );
  }

  // ── Sort components by sequence and fetch each collection individually
  const sortedComps = [...templateResponse.templateComponentList].sort(
    (a, b) => a.sequence - b.sequence,
  );

  const allIds = [...new Set(sortedComps.map((c) => c.collectionId))];
  const collectionResponses = await Promise.all(
    allIds.map((id) => getCollectionStories(id)),
  );

  // ── Merge all collection data into a single map ───────────────────────
  const mergedCollection: Record<string, CollectionItem> = {};
  for (const resp of collectionResponses) {
    if (resp?.collection) {
      Object.assign(mergedCollection, resp.collection);
    }
  }

  const data: HomeTemplateResponse = {
    templateComponentList: sortedComps,
    collection: mergedCollection,
  };

  // ── Extract lead section (s1_comp4) ──────────────────────────────────
  const leadComp = sortedComps.find((c) => c.componentId === "s1_comp4");
  if (!leadComp) {
    return (
      <div className="max-w-[1350px] mx-auto px-4 py-20 text-center text-foreground/60">
        Unable to load content. Please try again later.
      </div>
    );
  }

  const leadCol = data.collection[leadComp.collectionId];
  const allLeadStories = leadCol?.storyList?.[0]?.stories || [];
  if (allLeadStories.length === 0) {
    return (
      <div className="max-w-[1350px] mx-auto px-4 py-20 text-center text-foreground/60">
        Unable to load content. Please try again later.
      </div>
    );
  }

  const leadStories = allLeadStories.slice(0, 4);
  const sidebarStories = allLeadStories.slice(4, 9);

  // ── Extract sub-hero section (s2_comp1) ──────────────────────────────
  const subHeroComp = sortedComps.find((c) => c.componentId === "s2_comp1");
  let subHeroStories: StoryModel[] = [];
  if (subHeroComp) {
    const col = data.collection[subHeroComp.collectionId];
    subHeroStories = col?.storyList?.[0]?.stories?.slice(0, 9) || [];
  }

  // ── Build configs for remaining sections (skip s1, s2) ───────────────
  const allSections = sortedComps
    .filter((c) => c.componentId !== "s1_comp4" && c.componentId !== "s2_comp1")
    .map((c) => toSectionConfig(c, data.collection));

  // The first remaining section (coll 13, seq 4) is the special report
  const specialReportSection = allSections.length > 0 ? allSections[0] : undefined;
  // The rest (seq 5+) are category sections
  const categorySections = allSections.slice(1);

  // ── Render page ──────────────────────────────────────────────────────
  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* ── Top banner ad ──────────────────────────────────────────────── */}
      <div className="mb-4">
        <AdBanner height={90} />
      </div>

      {/* ── Hero section ──────────────────────────────────────────────── */}
      <HeroSection stories={leadStories} />

      {/* ── Sub-hero grid + tabs ──────────────────────────────────────── */}
      {subHeroStories.length > 0 && (
        <SubHeroGrid
          stories={subHeroStories}
          sidebarStories={sidebarStories}
          popularStories={popularStories}
          latestStories={latestStories}
        />
      )}

      {/* ── Bottom banner ad (below section 2) ────────────────────────── */}
      <div className="my-6">
        <AdBanner height={90} />
      </div>

      {/* ── Remaining sections (carousel + category grids) ────────────── */}
      <HomePageSections
        specialReportStories={specialReportSection?.stories}
        categorySections={categorySections}
      />
    </div>
  );
}
