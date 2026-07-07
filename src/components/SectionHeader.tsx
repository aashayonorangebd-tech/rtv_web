// ─── SectionHeader ─────────────────────────────────────────────────────────
// Reusable heading block for every category/carousel section on the homepage.
// Structure (top → bottom):
//   1. Title   — text-2xl (≈24px), bold, theme-blue (#2c4b9c), linked to href
//   2. "আরও"  — right-aligned link with a right-chevron SVG icon
//   3. Divider — 2px solid blue line spanning full width
//
// Props:
//   title : Bengali section name (e.g. "জাতীয়", "বিশেষ প্রতিবেদন")
//   href  : category URL the title + "আরও" link point to
// ─────────────────────────────────────────────────────────────────────────

export default function SectionHeader({
  title,
  href = "#",
}: {
  title: string;
  href?: string;
}) {
  return (
    <div>
      {/* ── Title row: left = heading, right = "আরও" link + chevron ───── */}
      <a href={href} className="flex justify-between items-baseline group">
        {/* Section title — 24px, bold, theme blue */}
        <h2 className="text-2xl font-bold text-[#2c4b9c] dark:text-slate-300">
          {title}
        </h2>

        {/* "আরও" link with right arrow SVG */}
        <div className="flex gap-1 items-center">
          <p className="text-base dark:text-white text-[#2c4b9c] font-bold">
            আরও
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-3.5 h-3.5 text-[#2c4b9c] dark:text-slate-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </a>

      {/* ── Blue divider line — 2px thick, theme blue / white in dark ──── */}
      <div className="mt-1 mb-[15px] flex items-baseline">
        <div className="h-[2px] bg-[#2c4b9c] dark:bg-white w-full" />
      </div>
    </div>
  );
}
