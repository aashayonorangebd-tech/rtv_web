// ─── HomePage ──────────────────────────────────────────────────────────────
// Main page layout component that receives API data from page.tsx and
// composes the three major sections of the homepage:
//
//   1. HeroSection   — lead stories + ad sidebar (API-driven, 12-col grid)
//   2. SubHeroGrid   — secondary story grid + popular/latest tabs
//   3. HomePageSections — all remaining sections below (placeholder content)
//
// Props:
//   data          : HomeTemplateResponse from the "all-active-temp-collection" API
//   subHeroData   : CollectionStoriesResponse for the s2_comp1 component
//   popularStories: top 5 most-viewed stories (from popular-page API)
//   latestStories : recent stories (from latest-tab API)
//
// Data flow:
//   - s1_comp4 collection → leadStories[0..3] for HeroSection,
//                           sidebarStories[4..8] for SubHeroGrid
//   - s2_comp1 collection → subHeroStories[0..8] for SubHeroGrid
// ─────────────────────────────────────────────────────────────────────────

import type { HomeTemplateResponse, CollectionItem, StoryModel } from "@/lib/types";
import HeroSection from "@/components/HeroSection";
import SubHeroGrid from "@/components/SubHeroGrid";
import HomePageSections from "@/components/HomePageSections";

export default function HomePage({
  data,
  subHeroData,
  popularStories = [],
  latestStories = [],
}: {
  data: HomeTemplateResponse;
  subHeroData: { collection: Record<string, CollectionItem> } | null;
  popularStories: StoryModel[];
  latestStories: StoryModel[];
}) {
  // ── Extract lead section (s1_comp4) from template components ─────────
  const leadComp = data.templateComponentList.find(
    (c) => c.componentId === "s1_comp4"
  );

  // Bail if the required component is missing
  if (!leadComp) return null;

  // ── Read the collection for lead stories ─────────────────────────────
  const leadCol = data.collection[leadComp.collectionId];
  const allLeadStories = leadCol?.storyList?.[0]?.stories || [];

  // Split: first 4 for HeroSection, remaining for SubHeroGrid sidebar
  const leadStories = allLeadStories.slice(0, 4);
  const sidebarStories = allLeadStories.slice(4, 9);

  // ── Extract sub-hero section (s2_comp1) ──────────────────────────────
  const subHeroComp = data.templateComponentList.find(
    (c) => c.componentId === "s2_comp1"
  );

  let subHeroStories: typeof leadStories = [];
  if (subHeroComp && subHeroData) {
    const col = subHeroData.collection[subHeroComp.collectionId];
    subHeroStories = col?.storyList?.[0]?.stories?.slice(0, 9) || [];
  }

  // ── Guard: no lead stories → nothing to render ───────────────────────
  if (leadStories.length === 0) return null;

  return (
    // ── Page wrapper — max-width 1350px, horizontal padding, vertical py-6 ──
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* ── Section 1: Hero (lead stories + ad sidebar) ─────────────────── */}
      <HeroSection stories={leadStories} />

      {/* ── Section 2: Sub-hero grid + popular/latest tabs ──────────────── */}
      {subHeroStories.length > 0 && (
        <SubHeroGrid
          stories={subHeroStories}
          sidebarStories={sidebarStories}
          popularStories={popularStories}
          latestStories={latestStories}
        />
      )}

      {/* ── Section 3: All remaining sections below (placeholder content) ── */}
      <HomePageSections />
    </div>
  );
}
