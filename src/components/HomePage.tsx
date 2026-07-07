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
  const leadComp = data.templateComponentList.find(
    (c) => c.componentId === "s1_comp4"
  );

  if (!leadComp) return null;

  const leadCol = data.collection[leadComp.collectionId];
  const allLeadStories = leadCol?.storyList?.[0]?.stories || [];
  const leadStories = allLeadStories.slice(0, 4);
  const sidebarStories = allLeadStories.slice(4, 9);

  const subHeroComp = data.templateComponentList.find(
    (c) => c.componentId === "s2_comp1"
  );

  let subHeroStories: typeof leadStories = [];
  if (subHeroComp && subHeroData) {
    const col = subHeroData.collection[subHeroComp.collectionId];
    subHeroStories = col?.storyList?.[0]?.stories?.slice(0, 9) || [];
  }

  if (leadStories.length === 0) return null;

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6">
      <HeroSection stories={leadStories} />
      {subHeroStories.length > 0 && (
        <SubHeroGrid
          stories={subHeroStories}
          sidebarStories={sidebarStories}
          popularStories={popularStories}
          latestStories={latestStories}
        />
      )}
      <HomePageSections />
    </div>
  );
}