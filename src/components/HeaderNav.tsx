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
import { Menu, Search } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import { useActiveCategory } from "@/components/ActiveCategoryProvider";
import HeaderDrawer from "@/components/HeaderDrawer";

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
        <HeaderDrawer
          items={sortedItems}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </div>
  </div>
  );
}
