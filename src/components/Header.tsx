"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Home, Search, Menu, Globe, PlayCircle, Sun, Moon } from "lucide-react";

const categories = [
  { id: 1, name: "সর্বশেষ", slug: "সর্বশেষ" },
  { id: 2, name: "রাজনীতি", slug: "রাজনীতি" },
  { id: 3, name: "বাংলাদেশ", slug: "বাংলাদেশ" },
  { id: 4, name: "বিনোদন", slug: "বিনোদন" },
  { id: 5, name: "খেলা", slug: "খেলা" },
  { id: 6, name: "ভিডিও", slug: "ভিডিও" },
  { id: 7, name: "অর্থনীতি", slug: "অর্থনীতি" },
  { id: 8, name: "আন্তর্জাতিক", slug: "আন্তর্জাতিক" },
  { id: 9, name: "প্রযুক্তি", slug: "প্রযুক্তি" },
  { id: 10, name: "লাইফস্টাইল", slug: "লাইফস্টাইল" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">

      {/* 2. MAIN BRANDING BAR (White) */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img 
              src="/rtv-logo.svg" 
              alt="RTV News" 
              className="h-10 md:h-14 w-auto object-contain" 
            />
          </a>

          {/* Right Section Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Live TV */}
            <a href="/live" className="flex items-center gap-1.5 border border-red-100 px-3 py-1 rounded-full bg-red-50/50">
               <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="text-red-600 font-bold text-xs">LIVE</span>
            </a>

            {/* Date & Language */}
            <div className="hidden lg:flex items-center gap-4 text-gray-500 font-medium">
               <span className="text-[13px]">
                  {mounted && new Date().toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}
               </span>
               <div className="h-4 w-[1px] bg-gray-200"></div>
               <button className="text-[11px] font-bold border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-50">ENGLISH</button>
               
               {/* Custom YouTube SVG Icon (Fixes the import error) */}
               <a href="https://youtube.com" target="_blank" className="text-[#FF0000] hover:opacity-80 transition-opacity">
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor">
                    <path d="M27.412 3.125s-.272-1.925-1.107-2.773c-1.06-1.114-2.246-1.12-2.79-1.185C19.61 1 14.004 1 14.004 1s-5.608 0-9.512.267c-.544.065-1.73.07-2.79 1.185C.868 1.3 0.596 3.225 0.596 3.225S0.323 5.43 0.323 7.635v2.068c0 2.205.273 4.41.273 4.41s.272 1.925 1.107 2.773c1.06 1.114 2.394 1.08 3.002 1.194 2.235.215 9.299.282 9.299.282s5.612-.008 9.516-.275c.544-.065 1.73-.07 2.79-1.185.835-.848 1.107-2.773 1.107-2.773s.273-2.205.273-4.41V7.635c0-2.205-.273-4.41-.273-4.41zM11.134 13.063V5.887l7.004 3.597-7.004 3.579z"/>
                  </svg>
               </a>
            </div>

            {/* Search */}
            <div className="flex items-center gap-1">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Search size={20} />
                </button>
                <button className="md:hidden p-2 text-gray-500">
                    <Menu size={24} />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (Navy Blue) */}
      <nav className="bg-[#003366] text-white">
        <div className="max-w-7xl mx-auto">
          <ul className="flex items-center overflow-x-auto no-scrollbar whitespace-nowrap">
            <li className="flex-shrink-0">
              <a href="/" className="px-5 py-3 flex items-center hover:bg-white/10 transition-colors border-r border-white/5">
                <Home size={18} fill="currentColor" />
              </a>
            </li>
            {categories.map((cat) => (
              <li key={cat.id} className="flex-shrink-0">
                <a
                  href={`/category/${cat.slug}`}
                  className="px-4 py-3 block text-[15px] font-medium hover:bg-white/10 transition-colors border-r border-white/5"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}