// ─── useAdblockerDetected ───────────────────────────────────────────────────
// Client-side hook that detects adblockers by inserting a bait div with
// known ad-class names. If the browser hides the element (display:none,
// visibility:hidden, opacity:0, or zero height), we assume an adblocker
// is active.
//
// Returns: boolean — true if adblocker detected
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";

export function useAdblockerDetected(): boolean {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const bait = document.createElement("div");
    bait.className =
      "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links";
    bait.style.position = "absolute";
    bait.style.left = "-10000px";
    bait.style.width = "1px";
    bait.style.height = "1px";
    document.body.appendChild(bait);

    requestAnimationFrame(() => {
      const styles = window.getComputedStyle(bait);
      const isBlocked =
        styles.display === "none" ||
        styles.visibility === "hidden" ||
        styles.opacity === "0" ||
        bait.offsetHeight === 0;
      setDetected(isBlocked);
      document.body.removeChild(bait);
    });
  }, []);

  return detected;
}

