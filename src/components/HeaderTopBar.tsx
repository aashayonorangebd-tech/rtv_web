// ─── HeaderTopBar ────────────────────────────────────────────────────────────
// Top bar with location, date, action links (নির্বাচন, সর্বশেষ, LIVE, video),
// English link, and dark/light theme toggle.
// Theme toggle uses the custom useTheme from ThemeProvider.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { MapPin, Calendar, Sun } from "lucide-react";

export default function HeaderTopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="h-[55px] md:h-[65px] flex items-center justify-between pl-[100px] md:pl-[140px] lg:pl-[160px] pr-4 md:pr-6">
      {/* Left: Location & Date */}
      <div className="hidden lg:flex items-center gap-5 text-gray-600 dark:text-gray-300 text-[14px] font-medium">
        <div className="flex items-center gap-1.5">
          <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
          <span>ঢাকা</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
          <span>
            {mounted ? "বৃহস্পতিবার, ০২ জুলাই ২০২৬, ১৮ আষাঢ় ১৪৩৩" : ""}
          </span>
        </div>
      </div>

      {/* Right: Actions & Links */}
      <div className="flex items-center justify-center gap-x-3 ml-auto">
        <div className="hidden md:flex items-center justify-center">
          <a href="/election" className="w-8 h-auto flex flex-row items-center justify-center gap-0.5 text-center">
            <span className="text-[13px] font-light text-gray-800 dark:text-gray-200 hover:text-blue-700">নির্বাচন</span>
          </a>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <a href="/latest" className="w-8 h-auto flex flex-row items-center justify-center gap-0.5 text-center">
            <span className="text-[13px] font-light text-gray-800 dark:text-gray-200 hover:text-blue-700">সর্বশেষ</span>
          </a>
        </div>
        <div className="flex items-center justify-center">
          <a href="/live" className="w-auto h-auto flex flex-row items-center justify-center gap-1.5 text-center">
            <Image
              alt="live_icon"
              src="/rtvIcon/live_icon2.png"
              width={200}
              height={200}
              decoding="async"
              loading="lazy"
              className="object-contain pb-1 h-8 w-auto"
            />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-700"></span>
            </span>
            <span className="text-[13px] font-bold text-red-700 dark:text-red-500">LIVE</span>
          </a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <a href="/video-gallery" className="hover:opacity-80 transition-opacity">
            <span className="text-[1rem]">
              <span className="w-6 h-6 block">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#5d68c2]">
                  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z"></path>
                </svg>
              </span>
            </span>
          </a>
        </div>
        <div>
          <a href="/english" className="text-[12px] bg-[#2e4b99] hover:bg-[#1e305e] transition-colors py-[3px] px-[6px] text-white rounded-sm" target="_blank" rel="noreferrer">
            English
          </a>
        </div>
        <div>
          <button onClick={toggleTheme} className="bg-gray-200 dark:bg-slate-700 p-1.5 hover:bg-gray-400 dark:hover:bg-slate-600 rounded-full transition-colors flex items-center justify-center">
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4 text-gray-200" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
