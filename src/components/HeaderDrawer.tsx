"use client";

import Link from "next/link";
import Image from "next/image";
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
    <div className="absolute w-[97.5%] ml-4 left-0 top-[40px] bg-[#f4fff9] dark:bg-[#ffffff] z-50">
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
                className="w-full hover:text-red-600 text-black"
              >
                <div className="flex items-center gap-[12px] ml-[30px]">
                  <span className="py-0.5">{item.displayTitle}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="pb-2">
        <hr className="border-t border-gray-200 dark:border-gray-700" />
      </div>

      <div className="text-black flex items-center justify-center gap-x-5 pb-3">
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <Image
              src="https://rtvonline.com/rtvIcon/banglaconverter.png"
              alt="Bangla Converter"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </span>
          <a href="https://rtvonline.com/converter" className="text-[1rem]">বাংলা কনভার্টার</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <Image
              src="https://rtvonline.com/rtvIcon/rtv_live.gif"
              alt="Live TV"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </span>
          <Link href="/live" className="text-[1rem]">লাইভ টিভি</Link>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-4 h-4 flex items-center justify-center">
            <Image
              src="/rtvIcon/video.svg"
              alt="Video"
              width={16}
              height={16}
              className="w-5 h-5 text-[#045ba7]"
            />
          </span>
          <Link href="/video-gallery" className="text-[1rem]">ভিডিও</Link>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <Image
              src="https://rtvonline.com/rtvIcon/camera.png"
              alt="Photo Gallery"
              width={20}
              height={20}
              className="w-5 h-4"
            />
          </span>
          <a href="https://rtvonline.com" className="text-[1rem]">ছবি</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <Image
              src="https://rtvonline.com/rtvIcon/andriod.png"
              alt="Android"
              width={20}
              height={20}
              className="w-5 h-4"
            />
          </span>
          <a href="https://play.google.com/store/apps/details?id=com.rtv.newsportal" className="text-[1rem]">অ্যান্ড্রয়েড</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <Image
              src="https://rtvonline.com/rtvIcon/apple.png"
              alt="iPhone"
              width={20}
              height={20}
              className="w-5 h-7"
            />
          </span>
          <a href="https://apps.apple.com/us/app/rtv/id6753746064" className="text-[1rem]">আইফোন</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <Image
              src="https://rtvonline.com/rtvIcon/archive.png"
              alt="Archive"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </span>
          <a href="/archive" className="text-[1rem]">আর্কাইভ</a>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <span className="w-5 h-5 flex items-center justify-center">
            <Image
              src="https://rtvonline.com/rtvIcon/rtv_plus.webp"
              alt="RTV Plus"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </span>
          <a href="https://rtvplus.tv/" className="text-[1rem]">আরটিভি প্লাস</a>
        </div>
      </div>
    </div>
  );
}
