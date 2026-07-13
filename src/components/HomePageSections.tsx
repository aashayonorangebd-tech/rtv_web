import type { StoryModel } from "@/lib/types";
import AdBanner from "@/components/AdBanner";
import SpecialReportCarousel from "@/components/SpecialReportCarousel";
import CategorySection from "@/components/CategorySection";
import EntertainmentSection from "@/components/EntertainmentSection";
import CountrySection from "@/components/CountrySection";
import InternationalSection from "@/components/InternationalSection";
import LifestyleSection from "@/components/LifestyleSection";
import ProbashSection from "@/components/ProbashSection";
import VideoPhotoSection from "@/components/VideoPhotoSection";

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

      {resolved.map((sec, i) => {
        if (sec.displayTitle === "ছবি" && resolved[i - 1]?.displayTitle === "ভিডিও") {
          return null;
        }

        const isVideoPhoto =
          sec.displayTitle === "ভিডিও" &&
          resolved[i + 1]?.displayTitle === "ছবি";

        const commonProps = {
          title: sec.displayTitle || "",
          href: sec.slug ? `/${sec.slug}` : "#",
          stories: sec.stories,
        };

        return (
          <div key={i}>
            <div className="sm:container mt-4 sm:px-4 mx-auto dark:text-white sm:my-5">
              <div className="flex justify-center items-center dark:bg-inherit overflow-hidden">
                <AdBanner height={90} />
              </div>
            </div>
            {isVideoPhoto ? (
              <VideoPhotoSection />
            ) : sec.displayTitle === "বিনোদন" ? (
              <EntertainmentSection {...commonProps} />
            ) : sec.displayTitle === "দেশজুড়ে" ? (
              <CountrySection {...commonProps} />
            ) : sec.displayTitle === "আন্তর্জাতিক" ? (
              <InternationalSection {...commonProps} />
            ) : sec.displayTitle === "লাইফস্টাইল" ? (
              <LifestyleSection {...commonProps} />
            ) : sec.displayTitle === "প্রবাস" ? (
              <ProbashSection {...commonProps} />
            ) : (
              <CategorySection {...commonProps} />
            )}
          </div>
        );
      })}
    </>
  );
}
