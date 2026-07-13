"use client";

// ─── ProbashSection ────────────────────────────────────────────────────
// প্রবাস section on homepage.
// Layout (12-col):
//   ┌───────────────────────────────────────────┬──────────────────────┐
//   │  8-col: 2-column story grid              │  4-col:             │
//   │  ┌──────────────┬───────────────────────┐ │  নামাজের সময়সূচি   │
//   │  │ Left:        │ Right: 3 horizontal   │ │  + আর্কাইভ         │
//   │  │ 1 featured   │ cards (7/5, hr sep)   │ │                    │
//   │  ├──────────────┴───────────────────────┤ │                    │
//   │  │ Row 2: 4 big horizontal cards        │ │                    │
//   │  │ (9/3 grid, text-xl, subtitle)        │ │                    │
//   │  └──────────────────────────────────────┘ │                    │
//   └───────────────────────────────────────────┴──────────────────────┘
// ─────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import type { StoryModel, PrayerTimeResponse } from "@/lib/types";
import { ENDPOINTS, storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.rtvonline.com";

const PRAYER_NAMES_BN: Record<string, string> = {
  fajr: "ফজর",
  dhuhr: "জোহর",
  asr: "আছর",
  maghrib: "মাগরিব",
  isha: "ইশা",
};

const MONTHS_BN = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

const DAYS_BN = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"];

function toBanglaTime(time: string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return time.replace(/\d/g, (d) => bnDigits[parseInt(d)]);
}

function PrayerTimeWidget() {
  const [prayerData, setPrayerData] = useState<PrayerTimeResponse["data"][number] | null>(null);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    fetch(`${API_BASE}${ENDPOINTS.utils.prayerTimes}?address=&isBangladesh=true&month=${month}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PrayerTimeResponse | null) => {
        if (data?.data?.length) {
          setPrayerData(data.data[0]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="text-center border border-[#e2e2e2] dark:border-gray-700 shadow-md rounded">
      <div className="flex items-center justify-center py-2.5">
        <a
          href="/namaz-time"
          className="text-2xl font-bold text-rtv-bg-blue dark:text-slate-300 hover:text-rtv-blue-text-hover"
        >
          নামাজের সময়সূচি
        </a>
      </div>

      <div className="flex justify-center sm:gap-x-10 pl-5 pb-2 max-sm:p-1 max-sm:grid max-sm:grid-cols-2 max-sm:gap-0 overflow-x-hidden">
        <div className="max-sm:w-full max-lg:w-1/2 my-auto">
          <div className="mx-auto max-sm:mt-2">
            <div className="pr-2.5">
              <div className="text-center mt-5">
                <p className="text-[15px] font-bold dark:text-slate-300">
                  {prayerData?.hijriDate || ""}
                </p>
                <p className="text-sm dark:text-slate-300 mt-1">
                  {prayerData?.currentDate || ""}
                </p>
              </div>
              <div className="flex gap-x-2.5 mr-1 max-sm:flex-col pt-5">
                {prayerData && (
                  <>
                    <div>
                      <p className="text-[15px] whitespace-nowrap dark:text-slate-300">
                        সেহেরি শেষ {toBanglaTime(prayerData.sehr)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[15px] whitespace-nowrap dark:text-slate-300">
                        ইফতার শুরু {toBanglaTime(prayerData.iftar)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-sm:w-full max-lg:w-1/2">
          <div className="flex flex-col ml-1 mt-4 gap-1 max-sm:gap-1">
            {["fajr", "dhuhr", "asr", "maghrib", "isha"].map((key) => {
              const time = prayerData?.[key as keyof typeof prayerData];
              return (
                <div
                  key={key}
                  className="grid grid-flow-col items-center grid-cols-2 text-left pr-3 px-2"
                >
                  <p className="col-span-1 text-[15px] dark:text-slate-300 mr-5 my-1">
                    {PRAYER_NAMES_BN[key]}
                  </p>
                  <p className="col-span-1 text-[15px] dark:text-slate-300 whitespace-nowrap">
                    {time ? toBanglaTime(time as string) : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <small className="text-black dark:text-slate-300 block pb-2">
        *স্থানভেদে সময়ের পার্থক্য হতে পারে
      </small>
    </div>
  );
}

// ── Archive Widget ─────────────────────────────────────────────────────
function getBanglaNumber(n: number): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n)
    .split("")
    .map((d) => bnDigits[parseInt(d)] || d)
    .join("");
}

function generateBanglaYears(): number[] {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= 1990; y--) years.push(y);
  return years;
}

function CalendarWidget() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const weeks: number[][] = [];
  let week: number[] = [];
  for (let i = 0; i < firstDay; i++) week.push(0);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(0);
    weeks.push(week);
  }

  const isFuture = year > todayYear || (year === todayYear && month > todayMonth) ||
    (year === todayYear && month === todayMonth && todayDate < daysInMonth);

  // First future day in the month
  const firstFutureDay = (() => {
    if (year > todayYear || (year === todayYear && month > todayMonth)) return 1;
    if (year === todayYear && month === todayMonth) return todayDate + 1;
    return 0;
  })();

  return (
    <div className="border border-[#e2e2e2] dark:border-gray-700 shadow-md p-5 w-full grid items-center justify-center rounded">
      <div className="p-2 flex flex-col justify-center items-center gap-2">
        <a href={`/api/story/view/archive?page=0&size=15`} className="text-lg font-bold text-rtv-bg-blue dark:text-slate-300 hover:text-rtv-blue-text-hover">আর্কাইভ</a>
        <div className="p-2 flex justify-between items-center gap-2">
          <button
            onClick={prevMonth}
            className="text-lg font-bold text-rtv-bg-blue dark:text-slate-300 hover:text-rtv-blue-text-hover"
          >
            &lt;
          </button>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="text-sm border border-[#e2e2e2] dark:border-gray-700 rounded px-1 py-0.5 bg-white dark:bg-slate-800"
          >
            {generateBanglaYears().map((y) => (
              <option key={y} value={y}>
                {getBanglaNumber(y)}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="text-sm border border-[#e2e2e2] dark:border-gray-700 rounded px-1 py-0.5 bg-white dark:bg-slate-800"
          >
            {MONTHS_BN.map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>

          <button
            onClick={nextMonth}
            disabled={isFuture && month >= todayMonth && year >= todayYear}
            className="text-lg font-bold text-rtv-bg-blue dark:text-slate-300 hover:text-rtv-blue-text-hover disabled:opacity-30 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0 text-center">
        {DAYS_BN.map((d) => (
          <div key={d} className="text-xs font-semibold dark:text-slate-300 py-1">
            {d}
          </div>
        ))}
        {weeks.flat().map((d, i) => (
          <div
            key={i}
            className={`text-xs py-1 ${
              d === 0
                ? "invisible"
                : d === todayDate && month === todayMonth && year === todayYear
                  ? "bg-rtv-blue-text-hover text-white rounded-full"
                  : d >= firstFutureDay && firstFutureDay > 0
                    ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    : "dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
            }`}
          >
            {d > 0 ? getBanglaNumber(d) : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────
export default function ProbashSection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  const minStories = 8;
  if (stories.length < minStories) return null;

  const featured = stories[0];
  const rightTop = stories.slice(1, 4); // 3 horizontal cards
  const bottomRowLeft = [stories[4], stories[5]]; // 2 big horizontal
  const bottomRowRight = [stories[6], stories[7]]; // 2 big horizontal

  return (
    <section className="section-padding">
      <div className="main-container">
        <div className="border-b border-rtv-border-clr dark:border-gray-700 py-5">
          <SectionHeader title={title} href={href} />

          <div className="grid grid-cols-12 gap-5">
            {/* ─── 8-col: Stories grid ────────────────────────────────── */}
            <div className="col-span-full md:col-span-12 lg:col-span-8 border-r border-[#e2e2e2] pr-5 dark:border-gray-700">
              {/* ── Row 1 ──────────────────────────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="col-span-full grid grid-cols-2 gap-2.5">
                  {/* Left: featured card */}
                  <div className="col-span-1 border-r border-[#e2e2e2] pr-2.5 dark:border-gray-700">
                    <a className="flex flex-col w-full group" href={storyPath(featured)}>
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={featured.fileName}
                          alt={featured.mainTitle}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="pt-2 my-2.5">
                        <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                          {featured.mainTitle}
                        </h3>
                      </div>
                      {featured.subTitle && (
                        <p className="text-base text-[#555] dark:text-slate-300">
                          {featured.subTitle}
                        </p>
                      )}
                    </a>
                  </div>

                  {/* Right: 3 horizontal cards */}
                  <div className="col-span-1">
                    {rightTop.map((story, i) => (
                      <React.Fragment key={story.storyId}>
                        <a
                          href={storyPath(story)}
                          className="grid grid-cols-12 md:grid-cols-12 gap-2 items-center group"
                        >
                          <div className="md:order-last lg:order-none col-span-7">
                            <h3 className="font-semibold group-hover:text-rtv-blue-text-hover hover:cursor-pointer text-lg dark:text-white">
                              {story.mainTitle}
                            </h3>
                          </div>
                          <div className="col-span-5">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={story.fileName}
                                alt={story.mainTitle}
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                          </div>
                        </a>
                        {i < 2 && <hr className="border-[#e2e2e2] dark:border-gray-700 my-2.5" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <hr className="col-span-full border-[#e2e2e2] dark:border-gray-700" />
              </div>

              {/* ── Row 2: 4 big horizontal cards ──────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
                <div className="border-r border-[#e2e2e2] pr-2.5 dark:border-gray-700">
                  {bottomRowLeft.map((story, i) => (
                    <React.Fragment key={story.storyId}>
                      <a
                        href={storyPath(story)}
                        className="grid grid-cols-12 md:grid-cols-12 gap-2 items-center group"
                      >
                        <div className="md:order-last lg:order-none col-span-9">
                          <h3 className="font-semibold group-hover:text-rtv-blue-text-hover hover:cursor-pointer text-xl pb-3 dark:text-white">
                            {story.mainTitle}
                          </h3>
                          {story.subTitle && (
                            <p className="text-base font-semibold text-slate-500 dark:text-slate-300">
                              {story.subTitle}
                            </p>
                          )}
                        </div>
                        <div className="col-span-3">
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={story.fileName}
                              alt={story.mainTitle}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </a>
                      {i === 0 && <hr className="border-[#e2e2e2] dark:border-gray-700 my-2.5" />}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex flex-col">
                  {bottomRowRight.map((story, i) => (
                    <React.Fragment key={story.storyId}>
                      <a
                        href={storyPath(story)}
                        className="grid grid-cols-12 md:grid-cols-12 gap-2 items-center group"
                      >
                        <div className="md:order-last lg:order-none col-span-9">
                          <h3 className="font-semibold group-hover:text-rtv-blue-text-hover hover:cursor-pointer text-xl pb-3 dark:text-white">
                            {story.mainTitle}
                          </h3>
                          {story.subTitle && (
                            <p className="text-base font-semibold text-slate-500 dark:text-slate-300">
                              {story.subTitle}
                            </p>
                          )}
                        </div>
                        <div className="col-span-3">
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={story.fileName}
                              alt={story.mainTitle}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </a>
                      {i === 0 && <hr className="border-[#e2e2e2] dark:border-gray-700 my-2.5" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── 4-col: Prayer Time + Archive ────────────────────────── */}
            <div className="col-span-full md:col-span-12 lg:col-span-4 flex flex-col justify-between gap-5">
              <PrayerTimeWidget />
              <CalendarWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
