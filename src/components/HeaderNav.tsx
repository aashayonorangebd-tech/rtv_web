// ─── HeaderNav ──────────────────────────────────────────────────────────────
// Bottom navigation bar with API-driven category links, sorted by sequenceNumber.
// First 9 items are shown; each item links to the slug extracted from clientUrl.
// Right side: hamburger menu + search buttons.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Menu, Search } from "lucide-react";
import type { MenuItem } from "@/lib/types";

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
  return (
    <div className="w-full bg-[#304a8c] dark:bg-slate-950 border-t border-white/10 shadow-md relative z-40">
      <div className="max-w-[1350px] mx-auto h-[33px] md:h-[35px] flex items-center justify-between pl-[100px] md:pl-[140px] lg:pl-[160px] pr-4 md:pr-6">
        <nav className="flex-1 overflow-x-auto disable-scrollbars h-full">
          <ul className="flex items-center h-full whitespace-nowrap">
            {[...menuItems]
              .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
              .slice(0, 9)
              .map((item, index, arr) => (
              <React.Fragment key={item.id}>
                <li className="h-full flex items-center">
                  <a
                    href={`/category/${getSlug(item.clientUrl)}`}
                    className="text-white text-[15px] md:text-[16px] font-bold hover:text-[#a3bffa] transition-colors px-3 md:px-5 tracking-wide"
                  >
                    {item.displayTitle}
                  </a>
                </li>
                {index < arr.length - 1 && (
                  <li className="text-white/40 select-none text-sm font-bold flex items-center h-full">|</li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

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
  );
}
