// ─── HeaderDrawer ───────────────────────────────────────────────────────────
// Full category drawer dropdown that appears below the nav bar when the
// hamburger menu is tapped. 6-column grid + bottom utility links.
// Width is constrained within the nav content area (logo-to-search).
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { X } from "lucide-react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";

function getSlug(clientUrl: string): string {
  try {
    const u = new URL(clientUrl);
    return u.pathname.replace(/^\//, "");
  } catch {
    return "#";
  }
}

export default function HeaderDrawer({
  items,
  open,
  onClose,
}: {
  items: MenuItem[];
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const sortedItems = [...items].sort(
    (a, b) => a.sequenceNumber - b.sequenceNumber
  );

  return (
    <div className="absolute w-[97.5%] ml-4 left-0 top-full bg-[#f4fff9] dark:bg-slate-700 z-50 shadow-lg rounded-b">
      {/* Close button */}
      <div className="flex justify-end pr-4 pt-2">
        <button
          onClick={onClose}
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
              onClick={onClose}
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
        <Link href="/converter" onClick={onClose} className="text-[1rem] hover:text-[#D12026] transition-colors">বাংলা কনভার্টার</Link>
        <Link href="/live" onClick={onClose} className="text-[1rem] hover:text-[#D12026] transition-colors">লাইভ টিভি</Link>
        <Link href="/video-gallery" onClick={onClose} className="text-[1rem] hover:text-[#D12026] transition-colors">ভিডিও</Link>
        <Link href="/photo-gallery" onClick={onClose} className="text-[1rem] hover:text-[#D12026] transition-colors">ছবি</Link>
        <Link href="https://play.google.com/store/apps/details?id=com.mcc.RTV&pli=1" onClick={onClose} className="text-[1rem] hover:text-[#D12026] transition-colors">অ্যান্ড্রয়েড</Link>
        <Link href="https://apps.apple.com/us/app/rtv/id734250822" onClick={onClose} className="text-[1rem] hover:text-[#D12026] transition-colors">আইফোন</Link>
        <Link href="/archive" onClick={onClose} className="text-[1rem] hover:text-[#D12026] transition-colors">আর্কাইভ</Link>
        <Link href="https://rtvplus.tv/" onClick={onClose} className="text-[1rem] hover:text-[#D12026] transition-colors">আরটিভি প্লাস</Link>
      </div>
    </div>
  );
}
