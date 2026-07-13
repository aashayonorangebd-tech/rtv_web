"use client";

// ─── LifestyleSection ──────────────────────────────────────────────────
// লাইফস্টাইল section on homepage.
// Layout:
//   ┌──────────────────────────────────────┬─────────────────────────┐
//   │  8-col: 2-column story grid          │  4-col: Online Poll    │
//   │  ┌──────────────┬──────────────────┐ │  Card                  │
//   │  │ Left col:    │ Right col:       │ │                        │
//   │  │ 1 featured + │ 4 horizontal     │ │                        │
//   │  │ 1 horizontal │ cards (hr sep)   │ │                        │
//   │  └──────────────┴──────────────────┘ │                        │
//   └──────────────────────────────────────┴─────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import type { StoryModel } from "@/lib/types";
import { storyPath } from "@/lib/api";
import SectionHeader from "@/components/SectionHeader";

interface PollOption {
  id: number;
  label: string;
  percentage: number;
  votes: number;
}

interface PollData {
  id: number;
  question: string;
  date: string;
  imageUrl: string;
  options: PollOption[];
  totalVotes: number;
}

const POLL_DATA: PollData = {
  id: 107,
  question:
    "বিদ্যুতের প্রিপেইড মিটারের মাসিক অতিরিক্ত চার্জ প্রত্যাহার করা হয়েছে। সরকারের এই সিদ্ধান্তকে যৌক্তিক বলে মনে করেন?",
  date: "০৪ জুন ২০২৬, ১০:০২ এএম",
  imageUrl:
    "https://imrs.rtvonline.com/api/image-service/resize?w=650&h=365&q=75&cmp=RM&img=/media/opinion/0000.jpg",
  options: [
    { id: 1, label: "হ্যাঁ", percentage: 95.22, votes: 259 },
    { id: 2, label: "না", percentage: 3.31, votes: 9 },
    { id: 3, label: "মন্তব্য নেই", percentage: 1.47, votes: 4 },
  ],
  totalVotes: 272,
};

function OnlinePollCard() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full border border-[#e2e2e2] dark:border-gray-700 rounded-md shadow-lg">
      <div className="flex flex-col items-center mx-5">
        <a href="/opinion-poll" className="w-full pt-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-rtv-bg-blue dark:text-slate-300">
              অনলাইন জরিপ
            </h2>
            <div className="flex items-center gap-1 text-rtv-bg-blue dark:text-slate-300">
              <p className="text-sm font-bold"> সকল জরিপ </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
          <div className="mt-1">
            <div className="h-[2px] w-full bg-rtv-bg-blue" />
          </div>
        </a>

        <div className="flex w-full items-center justify-start px-3 pt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="0.4"
            stroke="rgb(100 116 139)"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {POLL_DATA.date}
          </p>
        </div>

        <a href={`/opinion-poll/${POLL_DATA.id}`} className="mt-3 mb-4">
          <div className="relative">
            <img
              src={POLL_DATA.imageUrl}
              alt="banner_image"
              className="object-cover object-center max-w-full aspect-video"
              loading="lazy"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-30deg] text-black text-2xl font-bold whitespace-nowrap pointer-events-none select-none">
              Not Getting End Point Yet
            </div>
          </div>
        </a>

        <div className="w-full px-2">
          <a href={`/opinion-poll/${POLL_DATA.id}`}>
            <p className="text-base font-bold mb-4 text-justify">
              {POLL_DATA.question}
            </p>
          </a>

          {POLL_DATA.options.map((option) => (
            <div
              key={option.id}
              className="flex items-center mb-3 gap-x-2.5 relative"
            >
              <div className="inline-flex items-center">
                <input
                  className="h-5 w-5 text-blue-600 border-blue-600 border-2 rounded-full focus:ring-blue-500 cursor-pointer"
                  type="radio"
                  name="poll"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => setSelected(option.id)}
                />
              </div>
              <div className="relative flex-1 mt-1 h-8 bg-gray-200 dark:bg-slate-600 rounded border border-black dark:border-slate-500">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-300 dark:bg-blue-500 rounded"
                  style={{ width: `${option.percentage}%` }}
                />
                <p className="absolute inset-0 font-medium text-left pl-2 text-black dark:text-white text-xl flex flex-row justify-between items-center">
                  <span className="text-sm font-bold">{option.label}</span>
                  <span className="text-slate-600 dark:text-slate-300 font-semibold text-base pr-1">
                    {option.percentage.toFixed(2)}%
                  </span>
                </p>
              </div>
            </div>
          ))}

          <p className="text-center text-base text-gray-600 dark:text-slate-300 my-4">
            মোট ভোটদাতাঃ {POLL_DATA.totalVotes} জন
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LifestyleSection({
  title,
  href = "#",
  stories,
}: {
  title: string;
  href?: string;
  stories: StoryModel[];
}) {
  if (stories.length < 6) return null;

  const featured = stories[0];
  const leftHorizontal = stories[1];
  const rightCards = stories.slice(2, 6);

  return (
    <section className="section-padding">
      <div className="main-container">
        <SectionHeader title={title} href={href} />

        <div className="grid grid-cols-12 gap-2.5 my-5 pb-5 border-b border-rtv-border-clr dark:border-gray-700">
          {/* ─── 8-col: Lifestyle stories 2-column grid ──────────────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 gap-2.5">
              {/* ─── Left col: featured + horizontal card ──────────────── */}
              <div className="col-span-full md:col-span-1 border-r border-[#e2e2e2] pr-2.5 dark:border-gray-700 flex flex-col justify-between">
                <a className="flex flex-col w-full group" href={storyPath(featured)}>
                  <div className="relative">
                    <img
                      src={featured.fileName}
                      alt={featured.mainTitle}
                      className="object-cover object-center max-w-full aspect-video"
                      loading="lazy"
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

                <a
                  href={storyPath(leftHorizontal)}
                  className="grid grid-cols-12 md:grid-cols-12 gap-2 items-center group"
                >
                  <div className="md:order-last lg:order-none col-span-7">
                    <h3 className="font-semibold group-hover:text-rtv-blue-text-hover hover:cursor-pointer text-lg dark:text-white">
                      {leftHorizontal.mainTitle}
                    </h3>
                  </div>
                  <div className="col-span-5">
                    <div className="relative">
                      <img
                        src={leftHorizontal.fileName}
                        alt={leftHorizontal.mainTitle}
                        className="object-cover object-center max-w-full aspect-video"
                        loading="lazy"
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </a>
              </div>

              {/* ─── Right col: 4 horizontal cards with hr ──────────────── */}
              <div className="col-span-full md:col-span-1 flex flex-col gap-y-2.5">
                {rightCards.map((story, i) => (
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
                        <div className="relative">
                          <img
                            src={story.fileName}
                            alt={story.mainTitle}
                            className="object-cover object-center max-w-full aspect-video"
                            loading="lazy"
                          />
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </a>
                    {i < 3 && <hr className="border-[#e2e2e2] dark:border-gray-700" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ─── 4-col: Online Poll card ─────────────────────────────── */}
          <div className="col-span-full md:col-span-12 lg:col-span-4">
            <OnlinePollCard />
          </div>
        </div>
      </div>
    </section>
  );
}
