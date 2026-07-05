"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MapPin, Calendar, Menu, Search, Sun } from "lucide-react";
import React from "react";

const categories = [
  { id: 1, name: "জাতীয়", slug: "national" },
  { id: 2, name: "রাজনীতি", slug: "politics" },
  { id: 3, name: "রাজধানী", slug: "capital" },
  { id: 4, name: "দেশজুড়ে", slug: "countrywide" },
  { id: 5, name: "অর্থনীতি", slug: "economy" },
  { id: 6, name: "আন্তর্জাতিক", slug: "international" },
  { id: 7, name: "বিনোদন", slug: "entertainment" },
  { id: 8, name: "খেলা", slug: "sports" },
  { id: 9, name: "লাইফস্টাইল", slug: "lifestyle" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="w-full font-sans bg-[#e2e2e2] dark:bg-slate-900">
      <div className="max-w-[1350px] mx-auto relative">
        <div className="absolute left-4 md:left-6 lg:left-8 top-1 md:top-2 z-45 w-[75px] md:w-[90px]">
          <a href="/" className="block drop-shadow-md hover:opacity-95 transition-opacity">
            <img
              src="/rtv-logo.svg"
              alt="RTV News"
              className="w-full h-auto object-contain"
            />
          </a>
        </div>

        {/* Top Bar (Gray) */}
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
            <div className="hidden md:flex items-center justify-center mr-5">
              <a href="/latest" className="w-8 h-auto flex flex-row items-center justify-center gap-0.5 text-center">
                <span className="text-[13px] font-light text-gray-800 dark:text-gray-200 hover:text-blue-700">সর্বশেষ</span>
              </a>
            </div>
            <div className="flex items-center justify-center mr-2 md:mr-5">
              <a href="/live" className="w-auto h-auto flex flex-row items-center justify-center gap-1.5 text-center">
                <div className="bg-[#0072bc] text-white text-[11px] font-bold italic px-2.5 py-0.5 rounded-full shadow-sm">
                  Rtv
                </div>
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
      </div>

      {/* Bottom Bar (Navy Blue) */}
      <div className="w-full bg-[#304a8c] dark:bg-slate-950 border-t border-white/10 shadow-md relative z-40">
        <div className="max-w-[1350px] mx-auto h-[40px] md:h-[45px] flex items-center justify-between pl-[100px] md:pl-[140px] lg:pl-[160px] pr-4 md:pr-6">

          {/* Navigation Links */}
          <nav className="flex-1 overflow-x-auto no-scrollbar h-full">
            <ul className="flex items-center h-full whitespace-nowrap">
              {categories.map((cat, index) => (
                <React.Fragment key={cat.id}>
                  <li className="h-full flex items-center">
                    <a
                      href={`/category/${cat.slug}`}
                      className="text-white text-[15px] md:text-[16px] font-bold hover:text-[#a3bffa] transition-colors px-3 md:px-5 tracking-wide"
                    >
                      {cat.name}
                    </a>
                  </li>
                  {index < categories.length && (
                    <li className="text-white/40 select-none text-sm font-bold flex items-center h-full">|</li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>

          {/* Right Icons (Menu & Search) */}
          <div className="flex items-center gap-5 text-white ml-4 pl-5 border-l border-white/20 h-full">
            <button className="hover:text-[#a3bffa] transition-colors">
              <Menu size={22} />
            </button>
            <button className="hover:text-[#a3bffa] transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}