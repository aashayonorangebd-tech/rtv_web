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
import DualCategorySection from "@/components/DualCategorySection";
import QuadCategorySection from "@/components/QuadCategorySection";

export interface SectionConfig {
  componentId: string;
  displayTitle: string | null;
  slug: string | null;
  stories: StoryModel[];
}

const QUAD_TITLES = ["চাকরি", "সোশ্যাল মিডিয়া", "শিক্ষা", "তথ্যপ্রযুক্তি"] as const;

export default function HomePageSections({
  specialReportStories,
  categorySections = [],
}: {
  specialReportStories?: StoryModel[];
  categorySections?: SectionConfig[];
}) {
  const excludedTitles = new Set(["ফ্যাশন"]);
  const resolved = categorySections.filter(
    (sec) => sec.stories.length >= 3 && !excludedTitles.has(sec.displayTitle ?? ""),
  );

  if (resolved.length === 0) return null;

  function isQuadStart(idx: number): boolean {
    return (
      resolved[idx]?.displayTitle === QUAD_TITLES[0] &&
      resolved[idx + 1]?.displayTitle === QUAD_TITLES[1] &&
      resolved[idx + 2]?.displayTitle === QUAD_TITLES[2] &&
      resolved[idx + 3]?.displayTitle === QUAD_TITLES[3] &&
      [idx, idx + 1, idx + 2, idx + 3].every((j) => resolved[j].stories.length >= 4)
    );
  }

  function isQuadContinuation(idx: number): boolean {
    for (let j = Math.max(0, idx - 3); j < idx; j++) {
      if (isQuadStart(j)) return true;
    }
    return false;
  }

  return (
    <>
      <SpecialReportCarousel stories={specialReportStories} />

      {resolved.map((sec, i) => {
        if (
          (sec.displayTitle === "ছবি" && resolved[i - 1]?.displayTitle === "ভিডিও") ||
          (sec.displayTitle === "অর্থনীতি" && resolved[i - 1]?.displayTitle === "রাজনীতি") ||
          isQuadContinuation(i)
        ) {
          return null;
        }

        const isVideoPhoto =
          sec.displayTitle === "ভিডিও" &&
          resolved[i + 1]?.displayTitle === "ছবি";

        const isDualCategory =
          sec.displayTitle === "রাজনীতি" &&
          resolved[i + 1]?.displayTitle === "অর্থনীতি";

        const isQuad = isQuadStart(i);

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
            ) : isQuad ? (
              <QuadCategorySection
                sections={[0, 1, 2, 3].map((offset) => ({
                  title: resolved[i + offset].displayTitle || "",
                  href: resolved[i + offset].slug ? `/${resolved[i + offset].slug}` : "#",
                  stories: resolved[i + offset].stories,
                }))}
              />
            ) : isDualCategory ? (
              <DualCategorySection
                left={{ title: sec.displayTitle || "", href: sec.slug ? `/${sec.slug}` : "#", stories: sec.stories }}
                right={{ title: resolved[i + 1].displayTitle || "", href: resolved[i + 1].slug ? `/${resolved[i + 1].slug}` : "#", stories: resolved[i + 1].stories }}
              />
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
