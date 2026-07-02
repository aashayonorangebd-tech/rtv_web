import type { HomeTemplateResponse, StoryModel } from "@/lib/types";
import HeroSection from "@/components/HeroSection";
import SectionGrid from "@/components/SectionGrid";
import SidebarList from "@/components/SidebarList";

const ComponentRegistry: Record<
  string,
  React.ComponentType<{ stories: StoryModel[]; title?: string; slug?: string }>
> = {
  s1_comp4: HeroSection,
  s2_comp1: SectionGrid,
  s4_comp1: SectionGrid,
};

export default function HomePage({ data }: { data: HomeTemplateResponse }) {
  const mainComponents = data.templateComponentList.filter(
    (c) => c.componentId !== "s6_comp1"
  );
  const sidebarComponents = data.templateComponentList.filter(
    (c) => c.componentId === "s6_comp1"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-9">
          {mainComponents.map((comp) => {
            const Component = ComponentRegistry[comp.componentId];
            const col = data.collection[comp.collectionId];
            const group = col?.storyList?.[0];
            const stories = group?.stories || [];
            if (!Component || stories.length === 0) return null;

            return (
              <Component
                key={comp.id}
                stories={stories}
                title={group?.displayTitle}
                slug={group?.slug}
              />
            );
          })}
        </div>

        <aside className="md:col-span-3">
          {sidebarComponents.map((comp) => {
            const col = data.collection[comp.collectionId];
            const group = col?.storyList?.[0];
            const stories = group?.stories || [];
            if (stories.length === 0) return null;

            return (
              <SidebarList
                key={comp.id}
                stories={stories}
                title={group?.displayTitle}
              />
            );
          })}
        </aside>
      </div>
    </div>
  );
}
