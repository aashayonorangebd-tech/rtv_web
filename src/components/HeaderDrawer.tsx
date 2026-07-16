"use client";

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
    <div className="absolute w-[97.5%] ml-4 left-0 top-[40px] bg-[#f4fff9] dark:bg-surface z-50">
      <div className="grid grid-cols-6 gap-1.5 pt-3">
        {sortedItems.map((item) => {
          const slug = getSlug(item.clientUrl);
          return (
            <div
              key={item.id}
              className="text-[1.125rem] font-medium cursor-pointer text-black dark:text-white"
            >
              <Link
                href={`/category/${slug}`}
                onClick={onClose}
                className="w-full hover:text-red-600 dark:text-white"
              >
                <div className="flex items-center gap-[12px] ml-[30px]">
                  <span className="py-0.5">{item.displayTitle}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="pb-1">
        <hr />
      </div>

      <div className="text-black flex items-center justify-center gap-x-5 pb-3">
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="w-4 h-4 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
            </svg>
          </span>
          <a href="/converter" className="text-[1rem]">বাংলা কনভার্টার</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-600">
              <path d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" />
            </svg>
          </span>
          <Link href="/live" className="text-[1rem]">লাইভ টিভি</Link>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-4 h-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#045ba7]">
              <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
            </svg>
          </span>
          <a href="/video-gallery" className="text-[1rem]">ভিডিও</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="w-4 h-4 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          </span>
          <a href="/photo-gallery" className="text-[1rem]">ছবি</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
              <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.122.703-.536.656-.979l-.016-.13a6.003 6.003 0 0 0-3.477-4.563l-.094-.04a.75.75 0 0 1-.462-.694v-.076a.75.75 0 0 1 .637-.742 4.5 4.5 0 0 0 2.99-3.39.75.75 0 0 1 .847-.598 8.25 8.25 0 0 0-5.948-1.07.75.75 0 0 0-.578.61 4.502 4.502 0 0 1-3.39 2.97.75.75 0 0 0-.598.847 8.25 8.25 0 0 0 1.07 5.948.75.75 0 0 0 .61.578 4.502 4.502 0 0 1 2.97 3.39.75.75 0 0 0 .847.598Z" clip-rule="evenodd" />
            </svg>
          </span>
          <a href="https://play.google.com/store/apps/details?id=com.mcc.RTV&pli=1" className="text-[1rem]">অ্যান্ড্রয়েড</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-800">
              <path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3m-3 0h3" />
            </svg>
          </span>
          <a href="https://apps.apple.com/us/app/rtv/id734250822" className="text-[1rem]">আইফোন</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="w-4 h-4 text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </span>
          <a href="/archive" className="text-[1rem]">আর্কাইভ</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#2c4b9c]">
              <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
            </svg>
          </span>
          <a href="https://rtvplus.tv/" className="text-[1rem]">আরটিভি প্লাস</a>
        </div>
      </div>
    </div>
  );
}
