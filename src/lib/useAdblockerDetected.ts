// ─── useAdblockerDetected ───────────────────────────────────────────────────
// Client-side hook that detects adblockers using multiple techniques:
//   1. Bait div with known ad class names — adblockers hide these via CSS filters
//   2. Script bait — tries to load a Google AdSense script URL; if the request
//      is blocked at the network level, the script fires onerror immediately
//
// Returns: boolean — true if adblocker detected
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";

const BAIT_CLASSES =
  "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links";

export function useAdblockerDetected(): boolean {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Technique 1: CSS bait div
    const bait = document.createElement("div");
    bait.className = BAIT_CLASSES;
    bait.id = "google_ads_iframe_/21808527590/bait_0";
    bait.innerHTML =
      '<ins class="adsbygoogle" style="display:block"></ins>';
    bait.style.position = "absolute";
    bait.style.left = "-10000px";
    bait.style.width = "1px";
    bait.style.height = "1px";
    document.body.appendChild(bait);

    // Technique 2: Script bait (network-level blocking)
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.onerror = () => {
      if (!cancelled) setDetected(true);
    };

    const check = () => {
      if (cancelled) return;
      const styles = window.getComputedStyle(bait);
      const cssBlocked =
        styles.display === "none" ||
        styles.visibility === "hidden" ||
        styles.opacity === "0" ||
        bait.offsetHeight === 0;

      if (cssBlocked) {
        setDetected(true);
      }
      document.body.removeChild(bait);
    };

    requestAnimationFrame(check);
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      if (document.body.contains(bait)) document.body.removeChild(bait);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return detected;
}
