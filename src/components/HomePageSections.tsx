import AdBanner from "@/components/AdBanner";
import SpecialReportCarousel from "@/components/SpecialReportCarousel";
import CategorySection from "@/components/CategorySection";
import type { CategoryStory } from "@/components/CategorySection";

const placeholderHeadlines: CategoryStory[] = [
  {
    id: 1,
    title: "আধুনিক স্বাস্থ্যসেবায় ঢামেকের অবদান জাতীয় গর্বের বিষয়: প্রধানমন্ত্রী",
    summary:
      "প্রধানমন্ত্রী তারেক রহমানের সফরের পর বাংলাদেশি শ্রমিকদের জন্য আবারও খুলে দেওয়া হয়েছে মালয়েশিয়ার শ্রমবাজার। আগামী এক থেকে দুই মাসের মধ্যে বিনা খরচে কর্মী পাঠানো শুরু হবে বলে আশা করছে সরকার।",
    imageSeed: 101,
  },
  {
    id: 2,
    title: "১৬ জেলায় বন্যার শঙ্কা, এইচএসসি পরীক্ষার্থীদের যে বার্তা দিলো আন্তঃশিক্ষা বোর্ড",
    imageSeed: 102,
  },
  {
    id: 3,
    title: "জয়পুরহাটে ট্রাক-ইজিবাইকের সংঘর্ষে ২ জনের মৃত্যু",
    imageSeed: 103,
  },
  {
    id: 4,
    title: "বিশ্ববাজারে আরও কমল সোনার দাম",
    summary:
      "ঢাকা মেডিকেল কলেজের ৮০ বছর পূর্তি ও ৮১তম প্রতিষ্ঠাবার্ষিকী উপলক্ষে প্রধানমন্ত্রী তারেক রহমান প্রাক্তন, বর্তমান ছাত্র-ছাত্রী, কর্মকর্তা-কর্মচারীদের আন্তরিক শুভেচ্ছা ও অভিনন্দন জানিয়েছেন।",
    imageSeed: 104,
  },
  {
    id: 5,
    title: "সেনাবাহিনীর গ্রীষ্মকালীন মহড়া আকস্মিক পরিদর্শন করলেন প্রধানমন্ত্রী",
    imageSeed: 105,
  },
  {
    id: 6,
    title: "তুরস্কে ন্যাটো শীর্ষ সম্মেলন শুরু, ৩ বিষয়ে অগ্রাধিকার",
    imageSeed: 106,
  },
];

const nationalStories: CategoryStory[] = [
  {
    id: 10,
    title: "আধুনিক স্বাস্থ্যসেবায় ঢামেকের অবদান জাতীয় গর্বের বিষয়: প্রধানমন্ত্রী",
    summary: "প্রধানমন্ত্রী তারেক রহমান ঢাকা মেডিকেল কলেজের ৮০ বছর পূর্তি উপলক্ষে আয়োজিত অনুষ্ঠানে প্রধান অতিথি হিসেবে বক্তব্য রাখেন এবং স্বাস্থ্যসেবার মান উন্নয়নে সরকারের নানা উদ্যোগের কথা তুলে ধরেন।",
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
    summary: "সরকারি কর্মচারীদের নবম পে-স্কেল বাস্তবায়নে নতুন একটি কমিটি গঠন করা হয়েছে যা আগামী তিন মাসের মধ্যে তাদের প্রতিবেদন জমা দেবে বলে জানিয়েছেন সংশ্লিষ্ট autoridades।",
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

const politicsStories: CategoryStory[] = [
  {
    id: 20,
    title: "'জুলাই অভ্যুত্থান দমনে আ.লীগের অপরাধের প্রমাণ পেয়েছে ট্রাইব্যুনালের সংস্থা'",
    summary: "জুলাই গণ-অভ্যুত্থান দমনে দল হিসেবে বাংলাদেশ আওয়ামী লীগের অপরাধের প্রাথমিক প্রমাণ পেয়েছে আন্তর্জাতিক অপরাধ ট্রাইব্যুনালের তদন্ত সংস্থা।",
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

const economyStories: CategoryStory[] = [
  {
    id: 30,
    title: "বিশ্ববাজারে আরও কমল সোনার দাম, জ্বালানি তেলের দামও কমার সম্ভাবনা",
    summary: "আন্তর্জাতিক বাজারে সোনার দাম টানা তৃতীয় দিনের মতো কমেছে। একই সঙ্গে অপরিশোধিত জ্বালানি তেলের দামেও দেখা দিয়েছে নিম্নমুখী প্রবণতা।",
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

const internationalStories: CategoryStory[] = [
  {
    id: 40,
    title: "তুরস্কে ন্যাটো শীর্ষ সম্মেলন শুরু, ৩ বিষয়ে অগ্রাধিকার",
    summary: "তুরস্কের ইস্তাম্বুলে শুরু হয়েছে ন্যাটো শীর্ষ সম্মেলন। ইউক্রেন যুদ্ধ, সন্ত্রাসবাদ মোকাবিলা এবং সাইবার নিরাপত্তা এ সম্মেলনের প্রধান অগ্রাধিকার।",
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

const entertainmentStories: CategoryStory[] = [
  {
    id: 50,
    title: "আমির খানের তৃতীয় স্ত্রী গৌরী স্প্র্যাটের সম্পদের পরিমাণ কত?",
    summary: "বলিউডের জনপ্রিয় অভিনেতা আমির খানের তৃতীয় স্ত্রী গৌরী স্প্র্যাটের সম্পদের পরিমাণ নিয়ে চলছে নানা জল্পনা। সম্প্রতি এক সাক্ষাৎকারে তিনি নিজের ব্যবসা ও সম্পদ নিয়ে কথা বলেছেন।",
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

const sportsStories: CategoryStory[] = [
  {
    id: 60,
    title: "বাংলাদেশ-ভারত টেস্ট সিরিজের সময়সূচি ঘোষণা",
    summary: "বাংলাদেশ ও ভারতের মধ্যকার টেস্ট সিরিজের পূর্ণাঙ্গ সময়সূচি ঘোষণা করা হয়েছে। প্রথম টেস্ট হবে চট্টগ্রামে, দ্বিতীয় টেস্ট ঢাকায়।",
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

const lifestyleStories: CategoryStory[] = [
  {
    id: 70,
    title: "এইচএসসি ইংরেজি দ্বিতীয় পত্র: শেষ মুহূর্তের প্রস্তুতি",
    summary: "আগামীকাল এইচএসসি ইংরেজি দ্বিতীয় পত্র পরীক্ষা। পরীক্ষার্থীদের জন্য গুরুত্বপূর্ণ কিছু টিপস এবং শেষ মুহূর্তের প্রস্তুতির কৌশল নিয়ে এ প্রতিবেদন।",
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

const sidebarLabels = [
  "সারা দেশে বাড়ছে ডেঙ্গুর প্রকোপ, ২৪ ঘণ্টায় ২৩৫ জন হাসপাতালে",
  "এবার মেট্রোরেলে ভাঙচুর, গ্রেপ্তার ২",
  "ঢাকা ওয়াসার পানিতে দূষণ, উদ্বেগ পরিবেশবিদদের",
  "পেঁয়াজের দামে নিম্নআয়ের মানুষের দুর্ভোগ",
  "সড়ক দুর্ঘটনায় প্রাণ গেল ৩ জনের, আহত ৫",
  "শিক্ষাপ্রতিষ্ঠানে খোলা রাখার নির্দেশনা নতুন সিদ্ধান্ত",
];

export default function HomePageSections() {
  return (
    <>
      <AdBanner />

      <SpecialReportCarousel />

      <AdBanner />

      <CategorySection
        title="জাতীয়"
        href="/national"
        stories={nationalStories}
        sidebarHeadlines={sidebarLabels}
      />

      <AdBanner />

      <CategorySection
        title="রাজনীতি"
        href="/politics"
        stories={politicsStories}
        sidebarHeadlines={sidebarLabels.slice(0, 5)}
      />

      <CategorySection
        title="অর্থনীতি"
        href="/economy"
        stories={economyStories}
        sidebarHeadlines={sidebarLabels.slice(1, 6)}
      />

      <AdBanner />

      <CategorySection
        title="আন্তর্জাতিক"
        href="/international"
        stories={internationalStories}
        sidebarHeadlines={sidebarLabels.slice(0, 4)}
      />

      <CategorySection
        title="বিনোদন"
        href="/entertainment"
        stories={entertainmentStories}
        sidebarHeadlines={sidebarLabels.slice(2, 6)}
      />

      <CategorySection
        title="খেলা"
        href="/sports"
        stories={sportsStories}
        sidebarHeadlines={sidebarLabels.slice(0, 3)}
      />

      <CategorySection
        title="লাইফস্টাইল"
        href="/lifestyle"
        stories={lifestyleStories}
        sidebarHeadlines={sidebarLabels.slice(3, 6)}
      />
    </>
  );
}
