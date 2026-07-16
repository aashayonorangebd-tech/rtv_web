"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import type { StoryModel } from "@/lib/types";

const CATEGORIES = [
  { id: 8, displayTitle: "অন্যান্য" },
  { id: 28, displayTitle: "অপরাধ" },
  { id: 5, displayTitle: "অর্থনীতি" },
  { id: 16, displayTitle: "আইন-বিচার" },
  { id: 11, displayTitle: "আন্তর্জাতিক" },
  { id: 104, displayTitle: "আবহাওয়া" },
  { id: 12, displayTitle: "আরটিভি অনুষ্ঠান" },
  { id: 101, displayTitle: "ইভেন্ট" },
  { id: 71, displayTitle: "এক্সক্লুসিভ" },
  { id: 32, displayTitle: "এডিটর'স চয়েস" },
  { id: 26, displayTitle: "কিডস" },
  { id: 6, displayTitle: "খেলা" },
  { id: 1, displayTitle: "চাকরি" },
  { id: 42, displayTitle: "জনদুর্ভোগ" },
  { id: 50, displayTitle: "জাতীয়" },
  { id: 3, displayTitle: "তথ্যপ্রযুক্তি" },
  { id: 58, displayTitle: "দেশজুড়ে" },
  { id: 19, displayTitle: "ধর্ম" },
  { id: 93, displayTitle: "নারী" },
  { id: 107, displayTitle: "নির্বাচন" },
  { id: 87, displayTitle: "নির্বাচন কমিশন" },
  { id: 82, displayTitle: "নির্বাচিত কলাম" },
  { id: 36, displayTitle: "পরিবেশ ও জীববৈচিত্র" },
  { id: 4, displayTitle: "প্রবাস" },
  { id: 31, displayTitle: "ফিচার" },
  { id: 18, displayTitle: "বাংলাদেশ" },
  { id: 14, displayTitle: "বিজ্ঞান" },
  { id: 94, displayTitle: "বিজ্ঞাপন" },
  { id: 7, displayTitle: "বিনোদন" },
  { id: 91, displayTitle: "বিশেষ প্রতিবেদন" },
  { id: 25, displayTitle: "ভ্রমণ" },
  { id: 13, displayTitle: "মুক্তমত" },
  { id: 105, displayTitle: "রাজধানী" },
  { id: 27, displayTitle: "রাজনীতি" },
  { id: 2, displayTitle: "লাইফস্টাইল" },
  { id: 15, displayTitle: "শিক্ষা" },
  { id: 56, displayTitle: "শিল্প-সাহিত্য" },
  { id: 57, displayTitle: "সিটিজেন জার্নালিজম" },
  { id: 43, displayTitle: "সোশ্যাল মিডিয়া" },
  { id: 17, displayTitle: "স্বাস্থ্য" },
];

export default function ArchiveClient({
  initialStories,
  initialTotalPages,
}: {
  initialStories: StoryModel[];
  initialTotalPages: number;
}) {
  const [stories, setStories] = useState<StoryModel[]>(initialStories);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestedPagesRef = useRef<Set<number>>(new Set([0]));

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatApiDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year} 00:00:00`;
  };

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [search, setSearch] = useState("");
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const hasMore = page < totalPages - 1;

  const loadStories = useCallback(
    async (pageNum: number, reset: boolean = false) => {
      if (loadingRef.current) return;
      if (!reset && requestedPagesRef.current.has(pageNum)) return;

      if (reset) {
        requestedPagesRef.current = new Set([pageNum]);
        setPage(pageNum);
      } else {
        requestedPagesRef.current.add(pageNum);
      }

      loadingRef.current = true;
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(pageNum));
        params.set("size", "15");
        if (search.trim()) params.set("mainTitle", search.trim());
        if (categoryId) params.set("categoryIds", String(categoryId));
        if (dateFrom) params.set("startDate", formatApiDate(dateFrom));
        if (dateTo) params.set("endDate", formatApiDate(dateTo));

        const res = await fetch(
          `/api/story/view/archive?${params.toString()}`,
          {
            next: { revalidate: 0 },
            headers: { lang: "bangla" },
          }
        );
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const mapped = (data.model || []).map((item: any) => ({
          storyId: item.id,
          mainTitle: item.mainTitle,
          subTitle: item.subTitle,
          fileName: item.fileName,
          passedTime: item.passedTime || item.banglaDate || "",
          isLive: item.isLive ? 1 : 0,
          isVideo: item.hasVideo ? 1 : 0,
          banglaDate: item.banglaDate,
        }));
        if (reset) {
          setStories(mapped);
        } else {
          setStories((prev) => {
            const existingIds = new Set(prev.map((s) => s.storyId));
            const newStories = mapped.filter((s: any) => !existingIds.has(s.storyId));
            return [...prev, ...newStories];
          });
        }
        setTotalPages(data.totalPages || 0);
        setPage(pageNum);
      } catch {
        // keep existing stories on error
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [search, categoryId, dateFrom, dateTo]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadStories(0, true);
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadStories(page + 1);
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadStories, hasMore, page]);

  const fromDateValue = dateFrom ? new Date(dateFrom + "T00:00:00") : undefined;
  const toDateValue = dateTo ? new Date(dateTo + "T00:00:00") : undefined;

  return (
    <div className="px-5 sm:px-0 mt-4 overflow-hidden">
      <div className="font-bangla">
        <div className="main-container-inner pb-5 max-sm:px-2.5">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">আর্কাইভ</h1>
            <div className="mt-1 mb-[15px] flex items-baseline">
              <div className="h-[2px] w-[50px] bg-hover-text-color"></div>
              <div className="h-[1px] bg-[#E2E2E2] w-full"></div>
            </div>

            <div className="my-1 mt-[12px] z-[100] max-sm:z-[107] max-md:z-[107]">
              <form
                onSubmit={handleSearch}
                className="flex flex-1 flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <div className="w-full">
                  <div className="flex flex-row items-center gap-2.5 max-sm:flex-col max-sm:grid max-sm:grid-cols-2 max-sm:gap-3">
                    <div className="w-full text-[1.375rem]">
                      <DatePicker
                        selected={fromDateValue}
                        onChange={(date: Date | null) => {
                          const newFrom = date ? formatDate(date) : "";
                          setDateFrom(newFrom);
                          if (newFrom && dateTo) {
                            const toDate = new Date(dateTo + "T00:00:00");
                            const fromDate = new Date(newFrom + "T00:00:00");
                            if (toDate < fromDate) {
                              setDateTo("");
                              setToOpen(false);
                            }
                          }
                          setFromOpen(false);
                        }}
                        placeholderText="তারিখ থেকে"
                        dateFormat="dd-MM-yyyy"
                        open={fromOpen}
                        onFocus={() => setFromOpen(true)}
                        onClickOutside={() => setFromOpen(false)}
                        onKeyDown={(e) => e.preventDefault()}
                        className="transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-white-800 text-black dark:border-slate-600 rounded-lg tracking-wide font-light max-md:text-[1rem] max-lg:text-[0.8rem] xl:text-[1rem] placeholder-gray-400 bg-white focus:ring focus:border-rose-500 focus:ring-rose-500/20 archiveDarkMode"
                        wrapperClassName="w-full"
                      />
                    </div>
                    <div className="w-full text-[1.375rem]">
                      <DatePicker
                        selected={toDateValue}
                        onChange={(date: Date | null) => {
                          setDateTo(date ? formatDate(date) : "");
                          setToOpen(false);
                        }}
                        placeholderText="তারিখ পর্যন্ত"
                        dateFormat="dd-MM-yyyy"
                        open={dateFrom ? toOpen : false}
                        onFocus={() => dateFrom && setToOpen(true)}
                        onClickOutside={() => setToOpen(false)}
                        onKeyDown={(e) => e.preventDefault()}
                        minDate={fromDateValue}
                        className="transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-white-800 dark:text-black/80 dark:border-slate-600 rounded-lg tracking-wide font-light max-md:text-[1rem] max-lg:text-[0.8rem] xl:text-[1rem] placeholder-gray-400 bg-white focus:ring focus:border-rose-500 focus:ring-rose-500/20 archiveDarkMode"
                        wrapperClassName="w-full"
                      />
                    </div>
                    <div className="w-full text-[1.375rem] relative">
                      <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                        className="sidebar-scroll h-[42px] w-full rounded-md relative transition-all duration-300 py-2.5 pl-4 pr-14 border-gray-300 dark:bg-white dark:text-black tracking-wide font-light max-md:text-[1rem] max-lg:text-[0.8rem] xl:text-[1rem] placeholder-gray-400 focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20 dark:border-black customCSS"
                      >
                        <option value="" disabled hidden>ক্যাটাগরি</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.displayTitle}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full text-[1.375rem]">
                      <input
                        type="text"
                        placeholder="অনুসন্ধান করুন"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-[42px] w-full rounded-md relative transition-all duration-300 py-2.5 pl-4 pr-14 border-gray-300 dark:bg-white dark:text-black tracking-wide font-light max-md:text-[1rem] max-lg:text-[0.8rem] xl:text-[1rem] placeholder-gray-400 focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20 dark:border-black"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 lg:flex-row w-full max-sm:col-span-full">
                      <button
                        type="submit"
                        className="h-[42px] text-white px-3 w-full bg-hover-text-color rounded-md max-sm:w-full cursor-pointer"
                      >
                        {loading ? "খুঁজছে..." : "খুঁজুন"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-4">
              {stories.map((story, idx) => (
                <div key={story.storyId} className="group">
                  <a href={`/story/${story.storyId}`}>
                    <div className="grid grid-cols-12 gap-2.5">
                      <div className="col-span-3 max-sm:col-span-12 overflow-hidden rounded">
                        <div className="relative">
                          <Image
                            src={story.fileName || "/Images/rtv-logo.svg"}
                            alt={story.mainTitle}
                            width={500}
                            height={281}
                            className="object-cover object-center max-w-full aspect-video"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="col-span-9 max-sm:col-span-12">
                        <h2 className="main-title-post-innerpage dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300">
                          {story.mainTitle}
                        </h2>
                        <p className="subTitlePost textColor">{story.passedTime}</p>
                        <p className="subTitlePost dark:text-white lineclamped-2 mt-1">
                          {story.subTitle}
                        </p>
                      </div>
                    </div>
                  </a>
                  {idx < stories.length - 1 && (
                    <div className="h-[1px] my-2.5 max-lg:landscape:mt-1 max-lg:landscape:mb-2 bg-gray-300/[0.7] flex items-center justify-start [&:last-child]:h-[0]"></div>
                  )}
                </div>
              ))}
              <div ref={sentinelRef} className="h-10 flex items-center justify-center">
                {loading && <span className="text-sm text-gray-500">লোড হচ্ছে...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}