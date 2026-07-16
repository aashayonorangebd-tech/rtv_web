"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useAdblockerDetected } from "@/lib/useAdblockerDetected";

export default function AnchorAd() {
  const blocked = useAdblockerDetected();
  const [minimized, setMinimized] = useState(false);

  if (blocked) return null;

  return (
    <div className="w-full">
      {/* Ad content */}
      {!minimized && (
        <div className="relative flex justify-center bg-white dark:bg-background border-t border-gray-300 dark:border-border">
          {/* Minimize button — centered at top of ad */}
          <button
            onClick={() => setMinimized(true)}
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-white dark:bg-background border border-gray-300 dark:border-border rounded-b px-3 py-0.5 shadow-md hover:bg-gray-100 dark:hover:bg-surface transition-colors text-gray-500 z-10"
            aria-label="Hide ad"
          >
            <ChevronDown size={16} />
          </button>

          <div
            id="google_ads_iframe_/21808527590/pg_anchor_rtvonline.com_0__container__"
            style={{
              width: 941,
              height: 116,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <iframe
              src="https://577c381a9b60ffe0d8ec25e34e11b658.safeframe.googlesyndication.com/safeframe/1-0-45/html/container.html"
              width={941}
              height={116}
              style={{ border: 0, verticalAlign: "bottom", overflow: "hidden" }}
              title="বিজ্ঞাপন"
              sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Restore button — only visible when minimized */}
      {minimized && (
        <div className="flex justify-center bg-white dark:bg-background border-t border-gray-300 dark:border-border">
          <button
            onClick={() => setMinimized(false)}
            className="px-4 py-1 text-gray-500 hover:text-gray-700 dark:hover:text-foreground hover:bg-gray-100 dark:hover:bg-surface transition-colors"
            aria-label="Show ad"
          >
            <ChevronUp size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
