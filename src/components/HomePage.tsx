import type { HomeTemplateResponse, CollectionItem } from "@/lib/types";
import HeroSection from "@/components/HeroSection";
import SubHeroGrid from "@/components/SubHeroGrid";

export default function HomePage({
  data,
  subHeroData,
}: {
  data: HomeTemplateResponse;
  subHeroData: { collection: Record<string, CollectionItem> } | null;
}) {
  const leadComp = data.templateComponentList.find(
    (c) => c.componentId === "s1_comp4"
  );

  if (!leadComp) return null;

  const leadCol = data.collection[leadComp.collectionId];
  const leadStories = leadCol?.storyList?.[0]?.stories?.slice(0, 4) || [];

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
      {subHeroStories.length > 0 && <SubHeroGrid stories={subHeroStories} />}
    </div>
  );
}