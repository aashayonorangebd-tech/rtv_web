// ─── HeaderNav ──────────────────────────────────────────────────────────────
// Bottom navigation bar with API-driven category links, sorted by sequenceNumber.
// First 9 items are shown; each item links to the slug extracted from clientUrl.
// Right side: hamburger menu + search buttons.
//
// The currently active category is highlighted with a red background. The active
// slug is derived from the URL on /category/{slug} pages, or set explicitly via
// ActiveCategoryProvider on story details pages (URL is /story/{id} there).
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import { useActiveCategory } from "@/components/ActiveCategoryProvider";

function getSlug(clientUrl: string): string {
  try {
    const u = new URL(clientUrl);
    return u.pathname.replace(/^\//, "");
  } catch {
    return "#";
  }
}

export default function HeaderNav({
  menuItems = [],
}: {
  menuItems: MenuItem[];
}) {
  const pathname = usePathname();
  const { activeSlug } = useActiveCategory();

  // On /category/{slug} use the URL segment. On /story/{id} use the slug set
  // by the story details page (the URL itself has no category). Any other page
  // has no active category, so the highlight is cleared.
  let currentSlug: string | null = null;
  if (pathname?.startsWith("/category/")) {
    currentSlug = decodeURIComponent(pathname.split("/")[2] || "");
  } else if (pathname?.startsWith("/story/")) {
    currentSlug = activeSlug;
  }

  const [drawerOpen, setDrawerOpen] = useState(false);

  const sortedItems = [...menuItems].sort(
    (a, b) => a.sequenceNumber - b.sequenceNumber
  );

  return (
    <div className="w-[calc(100%+170px)] -ml-[85px] -mr-[85px] bg-[#304a8c] border-t border-white/10 shadow-md z-40">
      <div className="px-[85px]">
        <div className="max-w-[1350px] mx-auto h-[33px] md:h-[35px] flex items-center justify-between pl-[100px] md:pl-[140px] lg:pl-[160px] pr-4 md:pr-6 relative">
        <nav className="flex-1 overflow-x-auto disable-scrollbars h-full">
          <ul className="flex items-center h-full whitespace-nowrap">
            {sortedItems.slice(0, 9).map((item, index, arr) => {
              const slug = getSlug(item.clientUrl);
              const isActive = currentSlug != null && slug === currentSlug;
              return (
              <React.Fragment key={item.id}>
                <li className="h-full flex items-center">
                  <a
                    href={`/category/${slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-[15px] md:text-[16px] font-bold transition-colors px-3 md:px-5 tracking-wide ${
                      isActive
                        ? "bg-red-600 text-white rounded-[4px] mx-3"
                        : "text-white hover:text-[#a3bffa]"
                    }`}
                  >
                    {item.displayTitle}
                  </a>
                </li>
                {index < arr.length - 1 && (
                  <li className="text-white/40 select-none text-sm font-bold flex items-center h-full">|</li>
                )}
              </React.Fragment>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5 text-white ml-4 pl-5 border-l border-white/20 h-full">
          <button
            className="hover:text-[#a3bffa] transition-colors"
            onClick={() => setDrawerOpen((p) => !p)}
          >
            <Menu size={22} />
          </button>
          <button className="hover:text-[#a3bffa] transition-colors">
            <Search size={20} />
          </button>
        </div>

        {/* ── Drawer dropdown ─────────────────────────────────────────── */}
        {drawerOpen && (
          <div className="absolute w-[97.5%] ml-4 left-0 top-full bg-[#f4fff9] dark:bg-slate-700 z-50 shadow-lg rounded-b">
            {/* Close button */}
            <div className="flex justify-end pr-4 pt-2">
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <X size={18} className="text-gray-500 dark:text-gray-300" />
              </button>
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-6 gap-1.5 pt-3">
              {sortedItems.map((item) => {
                const slug = getSlug(item.clientUrl);
                return (
                  <Link
                    key={item.id}
                    href={`/category/${slug}`}
                    onClick={() => setDrawerOpen(false)}
                    className="text-[1.125rem] font-medium cursor-pointer text-black dark:text-white hover:text-[#D12026] dark:hover:text-red-400 transition-colors"
                  >
                    <div className="flex items-center gap-[12px] ml-[30px]">
                      <span className="py-0.5">{item.displayTitle}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="pb-2">
              <hr className="border-gray-300 dark:border-gray-600" />
            </div>

            {/* Bottom utility links */}
            <div className="text-black dark:text-white flex items-center justify-center gap-x-5 pb-4 flex-wrap">
              <Link href="/converter" onClick={() => setDrawerOpen(false)} className="text-[1rem] hover:text-[#D12026] transition-colors">বাংলা কনভার্টার</Link>
              <Link href="/live" onClick={() => setDrawerOpen(false)} className="text-[1rem] hover:text-[#D12026] transition-colors">লাইভ টিভি</Link>
              <Link href="/video-gallery" onClick={() => setDrawerOpen(false)} className="text-[1rem] hover:text-[#D12026] transition-colors">ভিডিও</Link>
              <Link href="/photo-gallery" onClick={() => setDrawerOpen(false)} className="text-[1rem] hover:text-[#D12026] transition-colors">ছবি</Link>
              <Link href="https://play.google.com/store/apps/details?id=com.mcc.RTV&pli=1" onClick={() => setDrawerOpen(false)} className="text-[1rem] hover:text-[#D12026] transition-colors">অ্যান্ড্রয়েড</Link>
              <Link href="https://apps.apple.com/us/app/rtv/id734250822" onClick={() => setDrawerOpen(false)} className="text-[1rem] hover:text-[#D12026] transition-colors">আইফোন</Link>
              <Link href="/archive" onClick={() => setDrawerOpen(false)} className="text-[1rem] hover:text-[#D12026] transition-colors">আর্কাইভ</Link>
              <Link href="https://rtvplus.tv/" onClick={() => setDrawerOpen(false)} className="text-[1rem] hover:text-[#D12026] transition-colors">আরটিভি প্লাস</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
