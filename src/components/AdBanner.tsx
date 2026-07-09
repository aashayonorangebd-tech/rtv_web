// ─── AdBanner ────────────────────────────────────────────────────────────────
// Ad placeholder component that detects adblockers.
// When blocked: returns null (collapses space).
// Default height is 250px (300×250), override via height prop.
// Supports className passthrough for wrapper styling.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useAdblockerDetected } from "@/lib/useAdblockerDetected";

export default function AdBanner({
  className = "",
  height = 250,
  collapseOnBlock = true,
}: {
  className?: string;
  height?: number;
  collapseOnBlock?: boolean;
}) {
  const blocked = useAdblockerDetected();

  if (blocked) {
    if (collapseOnBlock) return null;
    // Keep the space reserved
    return (
      <div
        className={className}
        style={{ minHeight: height, height }}
        aria-hidden
      />
    );
  }

  const isSmall = height === 90;

  return (
    <div className={className}>
      {isSmall && (
        <div
          className="pg-ad-label"
          style={{
            margin: 0,
            fontWeight: 300,
            letterSpacing: 1,
            fontSize: 12,
            textAlign: "center",
            padding: "5px 0px 6px 0px",
            color: "#aaa",
          }}
        >
          বিজ্ঞাপন
        </div>
      )}
      <div
        className={`w-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400`}
        style={{ minHeight: height }}
      >
        Ad Space 300×{height}
      </div>
    </div>
  );
}
