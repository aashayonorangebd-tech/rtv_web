// ─── HeaderNav ──────────────────────────────────────────────────────────────
// Bottom navigation bar. First 9 categories shown inline.
// Menu icon toggles a dropdown grid with all remaining categories + utility links.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import type { MenuItem } from "@/lib/types";

function getSlug(clientUrl: string): string {
  try {
    const u = new URL(clientUrl);
    return u.pathname.replace(/^\//, "");
  } catch {
    return "#";
  }
}

const UTILITY_LINKS = [
  { label: "বাংলা কনভার্টার", icon: "/rtvIcon/banglaconverter.png", href: "https://rtvonline.com/converter" },
  { label: "লাইভ টিভি", icon: "/rtvIcon/rtv_live.gif", href: "https://rtvonline.com/live" },
  { label: "ভিডিও", icon: null, href: "https://rtvonline.com/video-gallery" },
  { label: "ছবি", icon: "/rtvIcon/camera.png", href: "https://rtvonline.com/photo-gallery" },
  { label: "অ্যান্ড্রয়েড", icon: "/rtvIcon/andriod.png", href: "https://play.google.com/store/apps/details?id=com.mcc.RTV&pli=1" },
  { label: "আইফোন", icon: "/rtvIcon/apple.png", href: "https://apps.apple.com/us/app/rtv/id734250822" },
  { label: "আর্কাইভ", icon: "/rtvIcon/archive.png", href: "https://rtvonline.com/archive" },
  { label: "আরটিভি প্লাস", icon: "/rtvIcon/rtv_plus.webp", href: "https://rtvplus.tv/" },
];

export default function HeaderNav({
  menuItems = [],
}: {
  menuItems: MenuItem[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sorted = [...menuItems].sort((a, b) => a.sequenceNumber - b.sequenceNumber);
  const first9 = sorted.slice(0, 9);
  const rest = sorted.slice(9);

  return (
    <div className="relative">
      <div className="w-[calc(100%+170px)] -ml-[85px] -mr-[85px] bg-[#304a8c] border-t border-white/10 shadow-md relative z-40">
        <div className="px-[85px]">
          <div className="max-w-[1350px] mx-auto h-[33px] md:h-[35px] flex items-center justify-between pl-[100px] md:pl-[140px] lg:pl-[160px] pr-4 md:pr-6">
          <nav className="flex-1 overflow-x-auto disable-scrollbars h-full">
            <ul className="flex items-center h-full whitespace-nowrap">
              {first9.map((item, index, arr) => (
                <React.Fragment key={item.id}>
                  <li className="h-full flex items-center">
                    <a
                      href={`/category/${getSlug(item.clientUrl)}`}
                      className="text-white text-[18px] font-bold hover:text-[#a3bffa] transition-colors px-3 md:px-5 tracking-wide"
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

          <div className="flex items-center gap-5 text-white ml-8 pl-6 border-l-2 border-white/20 h-full shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hover:text-[#a3bffa] transition-colors"
              aria-label={menuOpen ? "Close" : "Menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button className="hover:text-[#a3bffa] transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="w-[calc(100%+170px)] -ml-[85px] -mr-[85px] absolute top-[35px] bg-[#f4fff9] z-50 shadow-lg overflow-hidden">
          <div className="px-[85px]">
            <div className="max-w-[1350px] mx-auto">
              <div className="grid grid-cols-6 gap-1.5 pt-[10px]">
                {rest.map((item) => (
                  <div key={item.id} className="text-[1.125rem] font-medium cursor-pointer text-black dark:text-white">
                    <a href={item.clientUrl} className="w-full hover:text-[#D12026]">
                      <div className="flex items-center gap-[12px] ml-[30px]">
                        <span className="py-0.5">{item.displayTitle}</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <div className="pb-2">
                <hr className="border-gray-300" />
              </div>
              <div className="text-black flex items-center justify-center gap-x-5 pb-4 flex-wrap">
            {UTILITY_LINKS.map((link, i) => (
              <div key={i} className="flex items-center justify-center gap-x-2">
                <span className="w-5 h-5 flex items-center justify-center shrink-0">
                  {link.icon ? (
                    <img alt={link.label} src={link.icon} className="w-full" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#045ba7]">
                      <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                    </svg>
                  )}
                </span>
                <a href={link.href} className="text-[1rem] text-black hover:text-[#D12026]">{link.label}</a>
              </div>
            ))}
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
