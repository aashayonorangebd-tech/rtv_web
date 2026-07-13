import type { StoryModel } from "@/lib/types";
import AdBanner from "@/components/AdBanner";
import SpecialReportCarousel from "@/components/SpecialReportCarousel";
import CategorySection from "@/components/CategorySection";
import EntertainmentSection from "@/components/EntertainmentSection";
import CountrySection from "@/components/CountrySection";
import InternationalSection from "@/components/InternationalSection";
import LifestyleSection from "@/components/LifestyleSection";
import ProbashSection from "@/components/ProbashSection";

export interface SectionConfig {
  componentId: string;
  displayTitle: string | null;
  slug: string | null;
  stories: StoryModel[];
}

export default function HomePageSections({
  specialReportStories,
  categorySections = [],
}: {
  specialReportStories?: StoryModel[];
  categorySections?: SectionConfig[];
}) {
  const resolved = categorySections.filter((sec) => sec.stories.length >= 3);

  if (resolved.length === 0) return null;

  return (
    <>
      <SpecialReportCarousel stories={specialReportStories} />

      {resolved.map((sec, i) => (
        <div key={i}>
          <div className="sm:container mt-4 sm:px-4 mx-auto dark:text-white sm:my-5">
            <div className="flex justify-center items-center dark:bg-inherit overflow-hidden">
              <AdBanner height={90} />
            </div>
          </div>
          {sec.displayTitle === "বিনোদন" ? (
            <EntertainmentSection
              title={sec.displayTitle || ""}
              href={sec.slug ? `/${sec.slug}` : "#"}
              stories={sec.stories}
            />
          ) : sec.displayTitle === "দেশজুড়ে" ? (
            <CountrySection
              title={sec.displayTitle || ""}
              href={sec.slug ? `/${sec.slug}` : "#"}
              stories={sec.stories}
            />
          ) : sec.displayTitle === "আন্তর্জাতিক" ? (
            <InternationalSection
              title={sec.displayTitle || ""}
              href={sec.slug ? `/${sec.slug}` : "#"}
              stories={sec.stories}
            />
          ) : sec.displayTitle === "লাইফস্টাইল" ? (
            <LifestyleSection
              title={sec.displayTitle || ""}
              href={sec.slug ? `/${sec.slug}` : "#"}
              stories={sec.stories}
            />
          ) : sec.displayTitle === "প্রবাস" ? (
            <ProbashSection
              title={sec.displayTitle || ""}
              href={sec.slug ? `/${sec.slug}` : "#"}
              stories={sec.stories}
            />
          ) : (
            <CategorySection
              title={sec.displayTitle || ""}
              href={sec.slug ? `/${sec.slug}` : "#"}
              stories={sec.stories}
            />
          )}
        </div>
      ))}
    </>
  );
}
