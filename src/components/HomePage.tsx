import type { HomeTemplateResponse } from "@/lib/types";
import HeroSection from "@/components/HeroSection";

export default function HomePage({ data }: { data: HomeTemplateResponse }) {
  const leadComp = data.templateComponentList.find(
    (c) => c.componentId === "s1_comp4"
  );

  if (!leadComp) return null;

  const col = data.collection[leadComp.collectionId];
  const stories = col?.storyList?.[0]?.stories?.slice(0, 4) || [];

  if (stories.length === 0) return null;

  return (
    // Changed max-w-7xl to max-w-[1350px] to match your header perfectly
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6">
      <HeroSection stories={stories} />
    </div>
  );
}