// ─── HomePageSections ─────────────────────────────────────────────────────
// Orchestrator component that composes ALL sections below the SubHeroGrid.
// Each section is separated by an AdBanner where appropriate.
//
// Section order:
//   1. AdBanner
//   2. SpecialReportCarousel  ("বিশেষ প্রতিবেদন")
//   3. AdBanner
//   4. CategorySection        ("জাতীয়")
//   5. AdBanner
//   6. CategorySection        ("রাজনীতি")
//   7. CategorySection        ("অর্থনীতি")
//   8. AdBanner
//   9. CategorySection        ("আন্তর্জাতিক")
//  10. CategorySection        ("বিনোদন")
//  11. CategorySection        ("খেলা")
//  12. CategorySection        ("লাইফস্টাইল")
//
// All data is hardcoded Bengali placeholder content (no API calls).
// Images use picsum.photos with unique seeds for reproducibility.
// ─────────────────────────────────────────────────────────────────────────

import AdBanner from "@/components/AdBanner";
import SpecialReportCarousel from "@/components/SpecialReportCarousel";
import CategorySection from "@/components/CategorySection";
import type { CategoryStory } from "@/components/CategorySection";

// ── CATEGORY DATA SETS ──────────────────────────────────────────────────
// Each array follows the CategoryStory shape:
//   first item  → featured (large 8-col card with optional summary)
//   next 2 items → side cards (smaller 4-col, title only)
//   extra items ignored (CategorySection only uses stories[0..2])

// ── জাতীয় (National) ────────────────────────────────────────────────────
const nationalStories: CategoryStory[] = [
  {
    id: 10,
    title: "আধুনিক স্বাস্থ্যসেবায় ঢামেকের অবদান জাতীয় গর্বের বিষয়: প্রধানমন্ত্রী",
    summary:
      "প্রধানমন্ত্রী তারেক রহমান ঢাকা মেডিকেল কলেজের ৮০ বছর পূর্তি উপলক্ষে আয়োজিত অনুষ্ঠানে প্রধান অতিথি হিসেবে বক্তব্য রাখেন এবং স্বাস্থ্যসেবার মান উন্নয়নে সরকারের নানা উদ্যোগের কথা তুলে ধরেন।",
    imageSeed: 201,
  },
  {
    id: 11,
    title: "১৬ জেলায় বন্যার শঙ্কা, এইচএসসি পরীক্ষার্থীদের যে বার্তা দিলো বোর্ড",
    imageSeed: 202,
  },
  {
    id: 12,
    title: "জয়পুরহাটে ট্রাক-ইজিবাইকের সংঘর্ষে ২ জন নিহত",
    imageSeed: 203,
  },
  {
    id: 13,
    title: "নবম পে-স্কেল বাস্তবায়ন নিয়ে এবার নতুন পরিকল্পনা সরকারের",
    summary:
      "সরকারি কর্মচারীদের নবম পে-স্কেল বাস্তবায়নে নতুন একটি কমিটি গঠন করা হয়েছে যা আগামী তিন মাসের মধ্যে তাদের প্রতিবেদন জমা দেবে বলে জানিয়েছেন সংশ্লিষ্ট autoridades।",
    imageSeed: 204,
  },
  {
    id: 14,
    title: "ক্যানসার আক্রান্ত জুলাই শহীদের ভাইকে চাকরির আশ্বাস প্রধানমন্ত্রীর",
    imageSeed: 205,
  },
  {
    id: 15,
    title: "একসঙ্গে সমুদ্রে গোসলে নামল ৫ বন্ধু, অতঃপর...",
    imageSeed: 206,
  },
];

// ── রাজনীতি (Politics) ──────────────────────────────────────────────────
const politicsStories: CategoryStory[] = [
  {
    id: 20,
    title: "'জুলাই অভ্যুত্থান দমনে আ.লীগের অপরাধের প্রমাণ পেয়েছে ট্রাইব্যুনালের সংস্থা'",
    summary:
      "জুলাই গণ-অভ্যুত্থান দমনে দল হিসেবে বাংলাদেশ আওয়ামী লীগের অপরাধের প্রাথমিক প্রমাণ পেয়েছে আন্তর্জাতিক অপরাধ ট্রাইব্যুনালের তদন্ত সংস্থা।",
    imageSeed: 301,
  },
  {
    id: 21,
    title: "সংসদে বিরোধী দলের ওয়াকআউট, স্পিকারের কড়া মন্তব্য",
    imageSeed: 302,
  },
  {
    id: 22,
    title: "স্থানীয় সরকার নির্বাচন নিয়ে নতুন ভাবনা কমিশনের",
    imageSeed: 303,
  },
];

// ── অর্থনীতি (Economy) ──────────────────────────────────────────────────
const economyStories: CategoryStory[] = [
  {
    id: 30,
    title: "বিশ্ববাজারে আরও কমল সোনার দাম, জ্বালানি তেলের দামও কমার সম্ভাবনা",
    summary:
      "আন্তর্জাতিক বাজারে সোনার দাম টানা তৃতীয় দিনের মতো কমেছে। একই সঙ্গে অপরিশোধিত জ্বালানি তেলের দামেও দেখা দিয়েছে নিম্নমুখী প্রবণতা।",
    imageSeed: 401,
  },
  {
    id: 31,
    title: "আরও কমলো জেট ফুয়েলের দাম, স্বস্তি বিমান চলাচলে",
    imageSeed: 402,
  },
  {
    id: 32,
    title: "রেমিট্যান্স আয়ে রেকর্ড, প্রবাসীরা পাঠালেন ২৫০ কোটি ডলার",
    imageSeed: 403,
  },
];

// ── আন্তর্জাতিক (International) ─────────────────────────────────────────
const internationalStories: CategoryStory[] = [
  {
    id: 40,
    title: "তুরস্কে ন্যাটো শীর্ষ সম্মেলন শুরু, ৩ বিষয়ে অগ্রাধিকার",
    summary:
      "তুরস্কের ইস্তাম্বুলে শুরু হয়েছে ন্যাটো শীর্ষ সম্মেলন। ইউক্রেন যুদ্ধ, সন্ত্রাসবাদ মোকাবিলা এবং সাইবার নিরাপত্তা এ সম্মেলনের প্রধান অগ্রাধিকার।",
    imageSeed: 501,
  },
  {
    id: 41,
    title: "ইসরায়েলিদের চোখে যুদ্ধে 'জয়ী' হয়েছে ইরান!",
    imageSeed: 502,
  },
  {
    id: 42,
    title: "পাকিস্তানে রাজনৈতিক অস্থিরতা, ইমরানের দল বিক্ষোভে",
    imageSeed: 503,
  },
];

// ── বিনোদন (Entertainment) ──────────────────────────────────────────────
const entertainmentStories: CategoryStory[] = [
  {
    id: 50,
    title: "আমির খানের তৃতীয় স্ত্রী গৌরী স্প্র্যাটের সম্পদের পরিমাণ কত?",
    summary:
      "বলিউডের জনপ্রিয় অভিনেতা আমির খানের তৃতীয় স্ত্রী গৌরী স্প্র্যাটের সম্পদের পরিমাণ নিয়ে চলছে নানা জল্পনা। সম্প্রতি এক সাক্ষাৎকারে তিনি নিজের ব্যবসা ও সম্পদ নিয়ে কথা বলেছেন।",
    imageSeed: 601,
  },
  {
    id: 51,
    title: "ঈদের বিশেষ অনুষ্ঠান নিয়ে যা বললেন চিত্রনায়ক",
    imageSeed: 602,
  },
  {
    id: 52,
    title: "ওটিটি প্ল্যাটফর্মে বাংলাদেশি সিনেমার জয়জয়কার",
    imageSeed: 603,
  },
];

// ── খেলা (Sports) ────────────────────────────────────────────────────────
const sportsStories: CategoryStory[] = [
  {
    id: 60,
    title: "বাংলাদেশ-ভারত টেস্ট সিরিজের সময়সূচি ঘোষণা",
    summary:
      "বাংলাদেশ ও ভারতের মধ্যকার টেস্ট সিরিজের পূর্ণাঙ্গ সময়সূচি ঘোষণা করা হয়েছে। প্রথম টেস্ট হবে চট্টগ্রামে, দ্বিতীয় টেস্ট ঢাকায়।",
    imageSeed: 701,
  },
  {
    id: 61,
    title: "আইপিএলে রেকর্ড গড়লেন বাংলাদেশি ক্রিকেটার",
    imageSeed: 702,
  },
  {
    id: 62,
    title: "এশিয়ান গেমসে বাংলাদেশের পদকের আশা",
    imageSeed: 703,
  },
];

// ── লাইফস্টাইল (Lifestyle) ──────────────────────────────────────────────
const lifestyleStories: CategoryStory[] = [
  {
    id: 70,
    title: "এইচএসসি ইংরেজি দ্বিতীয় পত্র: শেষ মুহূর্তের প্রস্তুতি",
    summary:
      "আগামীকাল এইচএসসি ইংরেজি দ্বিতীয় পত্র পরীক্ষা। পরীক্ষার্থীদের জন্য গুরুত্বপূর্ণ কিছু টিপস এবং শেষ মুহূর্তের প্রস্তুতির কৌশল নিয়ে এ প্রতিবেদন।",
    imageSeed: 801,
  },
  {
    id: 71,
    title: "গরমে সুস্থ থাকতে করণীয়",
    imageSeed: 802,
  },
  {
    id: 72,
    title: "রমজানে সাস্থ্যসম্মত খাদ্যাভ্যাস",
    imageSeed: 803,
  },
];

// ── SIDEBAR HEADLINES ─────────────────────────────────────────────────────
// Reused across category sidebars (sliced differently per section).
const sidebarLabels = [
  "সারা দেশে বাড়ছে ডেঙ্গুর প্রকোপ, ২৪ ঘণ্টায় ২৩৫ জন হাসপাতালে",
  "এবার মেট্রোরেলে ভাঙচুর, গ্রেপ্তার ২",
  "ঢাকা ওয়াসার পানিতে দূষণ, উদ্বেগ পরিবেশবিদদের",
  "পেঁয়াজের দামে নিম্নআয়ের মানুষের দুর্ভোগ",
  "সড়ক দুর্ঘটনায় প্রাণ গেল ৩ জনের, আহত ৫",
  "শিক্ষাপ্রতিষ্ঠানে খোলা রাখার নির্দেশনা নতুন সিদ্ধান্ত",
];

// ── HomePageSections — compose all sections in order ─────────────────────
export default function HomePageSections() {
  return (
    <>
      {/* ── Mid-page ad banner ───────────────────────────────────────── */}
      <AdBanner />

      {/* ── বিশেষ প্রতিবেদন (Special Report Carousel) ───────────────── */}
      <SpecialReportCarousel />

      {/* ── Ad banner separator ──────────────────────────────────────── */}
      <AdBanner />

      {/* ── জাতীয় ────────────────────────────────────────────────────── */}
      <CategorySection
        title="জাতীয়"
        href="/national"
        stories={nationalStories}
        sidebarHeadlines={sidebarLabels}
      />

      {/* ── Ad banner separator ──────────────────────────────────────── */}
      <AdBanner />

      {/* ── রাজনীতি ──────────────────────────────────────────────────── */}
      <CategorySection
        title="রাজনীতি"
        href="/politics"
        stories={politicsStories}
        sidebarHeadlines={sidebarLabels.slice(0, 5)}
      />

      {/* ── অর্থনীতি ─────────────────────────────────────────────────── */}
      <CategorySection
        title="অর্থনীতি"
        href="/economy"
        stories={economyStories}
        sidebarHeadlines={sidebarLabels.slice(1, 6)}
      />

      {/* ── Ad banner separator ──────────────────────────────────────── */}
      <AdBanner />

      {/* ── আন্তর্জাতিক ──────────────────────────────────────────────── */}
      <CategorySection
        title="আন্তর্জাতিক"
        href="/international"
        stories={internationalStories}
        sidebarHeadlines={sidebarLabels.slice(0, 4)}
      />

      {/* ── বিনোদন ──────────────────────────────────────────────────── */}
      <CategorySection
        title="বিনোদন"
        href="/entertainment"
        stories={entertainmentStories}
        sidebarHeadlines={sidebarLabels.slice(2, 6)}
      />

      {/* ── খেলা ─────────────────────────────────────────────────────── */}
      <CategorySection
        title="খেলা"
        href="/sports"
        stories={sportsStories}
        sidebarHeadlines={sidebarLabels.slice(0, 3)}
      />

      {/* ── লাইফস্টাইল ───────────────────────────────────────────────── */}
      <CategorySection
        title="লাইফস্টাইল"
        href="/lifestyle"
        stories={lifestyleStories}
        sidebarHeadlines={sidebarLabels.slice(3, 6)}
      />
    </>
  );
}
