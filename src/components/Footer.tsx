// ─── Footer ─────────────────────────────────────────────────────────────────
// Full site footer with:
//   1. Footer navigation links (from API footerList, sorted by sequenceNumber)
//   2. Logo, editor info, address, contact details
//   3. App download links (Google Play, App Store)
//   4. Social media icons (Facebook, X, YouTube, LinkedIn)
//   5. Privacy / Terms links
//
// Data: footerList is fetched from /api/navigation (Next.js deduplicates the fetch).
// ─────────────────────────────────────────────────────────────────────────────

import type { FooterItem } from "@/lib/types";

async function getFooterLinks(): Promise<FooterItem[]> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/navigation`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.footerList ?? [];
  } catch {
    return [];
  }
}

const SOCIAL_LINKS: {
  href: string;
  bg: string;
  viewBox: string;
  svg: React.ReactNode;
}[] = [
  {
    href: "https://www.facebook.com/rtvonline/",
    bg: "bg-blue-600",
    viewBox: "0 0 24 24",
    svg: <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />,
  },
  {
    href: "https://x.com/rtvonline",
    bg: "bg-black",
    viewBox: "0 0 24 24",
    svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    href: "https://www.youtube.com/RtvNews",
    bg: "bg-red-700",
    viewBox: "0 0 20 14",
    svg: <path fillRule="evenodd" d="M19.7 3.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.84c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.84A4.225 4.225 0 0 0 .3 3.038a30.148 30.148 0 0 0-.2 3.206v1.5c.01 1.071.076 2.142.2 3.206.094.712.363 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.15 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965c.124-1.064.19-2.135.2-3.206V6.243a30.672 30.672 0 0 0-.202-3.206ZM8.008 9.59V3.97l5.4 2.819-5.4 2.8Z" clipRule="evenodd" />,
  },
  {
    href: "https://www.linkedin.com/company/rtvdigital/",
    bg: "bg-blue-600",
    viewBox: "0 0 15 15",
    svg: (
      <>
        <path fillRule="evenodd" d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clipRule="evenodd" />
        <path d="M3 5.012H0V15h3V5.012Z" />
      </>
    ),
  },
];

export default async function Footer() {
  const footerLinks = await getFooterLinks();
  const sortedLinks = [...footerLinks].sort(
    (a, b) => a.sequenceNumber - b.sequenceNumber
  );

  return (
    <footer className="w-full dark:bg-inherit dark:text-white mt-8">
      {/* ── Top: footer navigation links ─────────────────────────────── */}
      <div>
        <div>
          <hr className="w-full border-gray-300 dark:border-gray-600" />
        </div>
        <div className="flex items-center justify-center gap-x-5 text-[1rem] font-normal py-1 flex-wrap">
          {sortedLinks.map((link) => (
            <a
              key={link.id}
              href={link.clientUrl}
              className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              {link.displayTitle}
            </a>
          ))}
        </div>
        <div>
          <hr className="border-gray-300 dark:border-gray-600" />
        </div>
      </div>

      {/* ── Middle: main content ──────────────────────────────────────── */}
      <div className="py-7 max-sm:py-3 max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-x-5 max-lg:grid-cols-2">
          {/* ── Column 1: Logo + Privacy links ─────────────────────────── */}
          <div className="mt-1 flex flex-col justify-between items-start">
            <div className="h-auto w-1/5 max-sm:w-[120px]">
              <a href="https://rtvonline.com">
                <img
                  alt="RTV Logo"
                  src="/rtv-logo.svg"
                  className="w-full h-auto"
                />
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-x-2 text-[1rem] mt-2.5 font-[400] text-gray-800 dark:text-white">
              <a href="https://rtvonline.com/privacy">
                <span className="whitespace-nowrap hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Privacy Policy</span>
              </a>
              <span className="text-gray-400">|</span>
              <a href="https://rtvonline.com/terms">
                <span className="whitespace-nowrap hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Terms of Use</span>
              </a>
              <span className="text-gray-400">|</span>
              <a href="https://rtvonline.com/advertisement">
                <span className="font-[600] hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Advertisement</span>
              </a>
            </div>
          </div>

          {/* ── Column 2: Editor info, address, contact ────────────────── */}
          <div className="flex-1 max-sm:hidden">
            <p className="text-[1.5rem] mt-2.5 font-[600] text-gray-800 dark:text-white">
              প্রধান সম্পাদক : সৈয়দ আশিক রহমান
            </p>
            <p className="text-[0.975rem] mt-2.5 font-[400] leading-5 text-gray-600 dark:text-gray-300">
              বেঙ্গল মিডিয়া করপোরেশন লিমিটেড,১০২ কাজী নজরুল ইসলাম এভিনিউ কারওয়ান বাজার, ঢাকা-১২১৫
            </p>
            <div className="mt-2.5">
              <p className="text-[0.975rem] font-[400] leading-[22px] text-gray-600 dark:text-gray-300">
                ফোন : +৮৮০-২-৫৫০১৩৫১১-১৫
              </p>
              <p className="text-[0.975rem] font-[400] leading-[22px] text-gray-600 dark:text-gray-300">
                নিউজ রুম : +৮৮০-১৮৭৮১৮৪৩৬৯-৭০
              </p>
              <p className="text-[0.975rem] font-[400] leading-[22px] text-gray-600 dark:text-gray-300">
                ই-মেইল : <a href="mailto:news@rtvbd.tv" className="text-blue-600 dark:text-blue-300 hover:underline">news@rtvbd.tv</a>
              </p>
              <p className="text-[0.975rem] font-[400] leading-[22px] text-gray-600 dark:text-gray-300">
                বিজ্ঞাপন : <a href="mailto:rtvdigitalad@gmail.com" className="text-blue-600 dark:text-blue-300 hover:underline">rtvdigitalad@gmail.com</a>
              </p>
            </div>
          </div>

          {/* ── Column 3: App downloads + Social media ──────────────────── */}
          <div className="flex-1 flex flex-col items-center justify-center max-lg:hidden">
            <p className="text-[1.225rem] my-2.5 text-gray-800 dark:text-white">
              মোবাইল অ্যাপস ডাউনলোড করুন
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.rtv.newsportal"
                className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white text-sm font-medium px-4 py-2 rounded transition-colors"
              >
                Google Play
              </a>
              <a
                href="https://apps.apple.com/us/app/rtv-news/id6753746064"
                className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white text-sm font-medium px-4 py-2 rounded transition-colors"
              >
                App Store
              </a>
            </div>
            <p className="text-[1rem] font-bold mt-2.5 text-gray-800 dark:text-white">
              অনুসরণ করুন
            </p>
            <div className="flex gap-4 mt-2">
              {SOCIAL_LINKS.map((social, i) => (
                <a key={i} href={social.href}>
                  <div className={`${social.bg} w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}>
                    <svg className="w-4 h-4 text-white" viewBox={social.viewBox || "0 0 24 24"} fill="currentColor">
                      {social.svg}
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
