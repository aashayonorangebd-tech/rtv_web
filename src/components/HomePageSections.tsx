// ─── HomePageSections ─────────────────────────────────────────────────────
// Orchestrator that renders ALL sections below SubHeroGrid.
// Receives API-parsed section data from HomePage and renders:
//   1. SpecialReportCarousel (coll 13 / "বিশেষ প্রতিবেদন")
//   2. CategorySection for each remaining section, with ad banners between
//
// Empty collections fall back to placeholder Bengali content so the page
// never looks broken.
// ─────────────────────────────────────────────────────────────────────────

import type { StoryModel } from "@/lib/types";
import AdBanner from "@/components/AdBanner";
import SpecialReportCarousel from "@/components/SpecialReportCarousel";
import CategorySection from "@/components/CategorySection";
import EntertainmentSection from "@/components/EntertainmentSection";

// ── Section config — one per templateComponent after s1/s2 ────────────
export interface SectionConfig {
  componentId: string;
  displayTitle: string | null;
  slug: string | null;
  stories: StoryModel[];
}

// ── Fallback headlines for empty collections ──────────────────────────
const FALLBACK_STORIES: Record<string, StoryModel[]> = {
  politics: [
    { storyId: 101, mainTitle: "সংসদে বিরোধী দলের ওয়াকআউট, স্পিকারের কড়া মন্তব্য", subTitle: "", fileName: "https://picsum.photos/seed/pol1/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 102, mainTitle: "স্থানীয় সরকার নির্বাচন নিয়ে নতুন ভাবনা কমিশনের", subTitle: "", fileName: "https://picsum.photos/seed/pol2/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 103, mainTitle: "রাজনৈতিক দলগুলোর সঙ্গে সংলাপে বসছে নির্বাচন কমিশন", subTitle: "", fileName: "https://picsum.photos/seed/pol3/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 104, mainTitle: "আওয়ামী লীগের সমাবেশে লাখো মানুষের সমাগম", subTitle: "দলের শীর্ষ নেতারা আগামী নির্বাচনকে সামনে রেখে গণসংযোগ জোরদার করার আহ্বান জানিয়েছেন।", fileName: "https://picsum.photos/seed/pol4/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 105, mainTitle: "বিএনপির অবস্থান কর্মসূচি ঘোষণা", subTitle: "", fileName: "https://picsum.photos/seed/pol5/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 106, mainTitle: "জোট সরকারের এক বছর পূর্তি, মূল্যায়ন", subTitle: "", fileName: "https://picsum.photos/seed/pol6/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
  ],
  economy: [
    { storyId: 201, mainTitle: "বিশ্ববাজারে আরও কমল সোনার দাম, জ্বালানি তেলের দামও কমার সম্ভাবনা", subTitle: "আন্তর্জাতিক বাজারে সোনার দাম টানা তৃতীয় দিনের মতো কমেছে।", fileName: "https://picsum.photos/seed/eco1/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 202, mainTitle: "আরও কমলো জেট ফুয়েলের দাম, স্বস্তি বিমান চলাচলে", subTitle: "", fileName: "https://picsum.photos/seed/eco2/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 203, mainTitle: "রেমিট্যান্স আয়ে রেকর্ড, প্রবাসীরা পাঠালেন ২৫০ কোটি ডলার", subTitle: "", fileName: "https://picsum.photos/seed/eco3/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 204, mainTitle: "শেয়ারবাজারে দরপতন, বিনিয়োগকারীদের উদ্বেগ", subTitle: "", fileName: "https://picsum.photos/seed/eco4/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
  ],
  international: [
    { storyId: 301, mainTitle: "পাকিস্তানে রাজনৈতিক অস্থিরতা, ইমরানের দল বিক্ষোভে", subTitle: "", fileName: "https://picsum.photos/seed/int1/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 302, mainTitle: "মিয়ানমারে ভূমিকম্প, নিহত ৫০০", subTitle: "", fileName: "https://picsum.photos/seed/int2/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
  ],
  entertainment: [
    { storyId: 401, mainTitle: "আমির খানের তৃতীয় স্ত্রী গৌরী স্প্র্যাটের সম্পদের পরিমাণ কত?", subTitle: "বলিউডের জনপ্রিয় অভিনেতা আমির খানের তৃতীয় স্ত্রী গৌরী স্প্র্যাটের সম্পদের পরিমাণ নিয়ে চলছে নানা জল্পনা।", fileName: "https://picsum.photos/seed/ent1/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 402, mainTitle: "ঈদের বিশেষ অনুষ্ঠান নিয়ে যা বললেন চিত্রনায়ক", subTitle: "", fileName: "https://picsum.photos/seed/ent2/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
  ],
  sports: [
    { storyId: 501, mainTitle: "বাংলাদেশ-ভারত টেস্ট সিরিজের সময়সূচি ঘোষণা", subTitle: "", fileName: "https://picsum.photos/seed/spt1/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 502, mainTitle: "আইপিএলে রেকর্ড গড়লেন বাংলাদেশি ক্রিকেটার", subTitle: "", fileName: "https://picsum.photos/seed/spt2/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
  ],
  lifestyle: [
    { storyId: 601, mainTitle: "গরমে সুস্থ থাকতে করণীয়", subTitle: "", fileName: "https://picsum.photos/seed/lif1/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
    { storyId: 602, mainTitle: "রমজানে স্বাস্থ্যসম্মত খাদ্যাভ্যাস", subTitle: "", fileName: "https://picsum.photos/seed/lif2/650/365", canonicalUrl: "#", isVideo: 0, isLive: 0, passedTime: "" },
  ],
};

// ── Category labels + fallback keys for each known componentId ────────
const CATEGORY_MAP: Record<string, { title: string; slug: string; fallbackKey: string }> = {
  s5_comp5:  { title: "রাজনীতি",      slug: "/politics",      fallbackKey: "politics" },
  s3_comp1:  { title: "অর্থনীতি",      slug: "/economy",       fallbackKey: "economy" },
  s5_comp1:  { title: "আন্তর্জাতিক",   slug: "/international", fallbackKey: "international" },
  s6_comp1:  { title: "বিনোদন",        slug: "/entertainment", fallbackKey: "entertainment" },
  s7_comp1:  { title: "খেলা",          slug: "/sports",        fallbackKey: "sports" },
  s9_comp1:  { title: "লাইফস্টাইল",    slug: "/lifestyle",     fallbackKey: "lifestyle" },
};

export default function HomePageSections({
  specialReportStories,
  categorySections = [],
}: {
  specialReportStories?: StoryModel[];
  categorySections?: SectionConfig[];
}) {
  // ── Resolve each category section: real API data or fallback ───────
  const resolved: { title: string; slug: string; stories: StoryModel[] }[] = [];

  for (const sec of categorySections) {
    const info = CATEGORY_MAP[sec.componentId];
    const title = sec.displayTitle || info?.title || "";
    const slug = sec.slug ? `/${sec.slug}` : info?.slug || "#";

    if (sec.stories.length >= 3) {
      resolved.push({ title, slug, stories: sec.stories });
    } else if (info?.fallbackKey && FALLBACK_STORIES[info.fallbackKey]) {
      resolved.push({ title, slug, stories: FALLBACK_STORIES[info.fallbackKey] });
    }
  }

  if (resolved.length === 0) return null;

  return (
    <>
      {/* ── Special Report Carousel (if data exists or fallback) ────── */}
      <SpecialReportCarousel stories={specialReportStories} />

      {/* ── Remaining Category Sections with ad banners between ─────── */}
      {resolved.map((sec, i) => (
        <div key={i}>
          <div className="my-6">
            <AdBanner height={90} />
          </div>
          {sec.title === "বিনোদন" ? (
            <EntertainmentSection
              title={sec.title}
              href={sec.slug}
              stories={sec.stories}
            />
          ) : (
            <CategorySection
              title={sec.title}
              href={sec.slug}
              stories={sec.stories}
            />
          )}
        </div>
      ))}
    </>
  );
}
