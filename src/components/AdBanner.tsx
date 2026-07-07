// ─── AdBanner ─────────────────────────────────────────────────────────────
// Reusable mid-page advertisement placeholder.
// Renders a centered 970×90 banner with a "বিজ্ঞাপন" label.
// Visible on sm+ screens via container; wraps full-width on mobile.
// Accepts optional className for additional spacing overrides.
// ─────────────────────────────────────────────────────────────────────────

export default function AdBanner({ className = "" }: { className?: string }) {
  return (
    // Outer container — centered, horizontal padding on sm+, vertical margin
    <div
      className={`sm:container mt-4 sm:px-4 mx-auto dark:text-white sm:my-5 ${className}`}
    >
      {/* Flex center wrapper to keep banner aligned */}
      <div className="flex justify-center items-center overflow-hidden">
        {/* Banner box — 970×90 fixed size, gray placeholder bg, centered text */}
        <div className="w-[970px] max-w-full h-[90px] bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">
          বিজ্ঞাপন — 970×90
        </div>
      </div>
    </div>
  );
}
