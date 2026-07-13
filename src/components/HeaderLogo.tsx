// ─── HeaderLogo ──────────────────────────────────────────────────────────────
// RTV logo link positioned absolutely on the left edge of the header.
// Responsive sizing: 75px on mobile, 90px on md+.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";

export default function HeaderLogo() {
  return (
    <div className="absolute left-4 md:left-6 lg:left-8 top-1 md:top-2 z-45 w-[75px] md:w-[90px]">
      <Link href="/" className="block drop-shadow-md hover:opacity-95 transition-opacity">
        <Image
          src="/rtv-logo.svg"
          alt="RTV News"
          width={180}
          height={50}
          className="w-full h-auto object-contain"
        />
      </Link>
    </div>
  );
}
