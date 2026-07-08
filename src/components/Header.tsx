// ─── Header ─────────────────────────────────────────────────────────────────
// Composes the full site header: logo, top bar, and navigation.
// Fetches navigation menu from /api/navigation and passes to HeaderNav.
// Data is revalidated every 5 minutes.
// ─────────────────────────────────────────────────────────────────────────────

import type { MenuItem } from "@/lib/types";
import HeaderLogo from "@/components/HeaderLogo";
import HeaderTopBar from "@/components/HeaderTopBar";
import HeaderNav from "@/components/HeaderNav";

async function getNavigation(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/navigation`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.menuList ?? [];
  } catch {
    return [];
  }
}

export default async function Header() {
  const menuItems = await getNavigation();

  return (
  <header className="w-full font-sans bg-white dark:bg-slate-900 mt-[3px]">
      <div className="max-w-[1350px] mx-auto relative">
        <HeaderLogo />
        <HeaderTopBar />
      </div>
      <HeaderNav menuItems={menuItems} />
    </header>
  );
}
