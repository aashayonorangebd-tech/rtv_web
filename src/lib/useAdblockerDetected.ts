// ─── useAdblockerDetected ───────────────────────────────────────────────────
// Client-side hook that detects adblockers using multiple strategies:
//   1. Bait div with ad class names — adblockers hide these via cosmetic filters
//   2. Script bait — tries to load a Google AdSense script URL; blocked at the
//      network level by adblockers, triggering onerror
//   3. Fetch bait — attempts to HEAD a known ad URL; blocked requests reject
//   4. Repeated checks (rAF + 1.5s timeout) to catch delayed cosmetic filtering
//
// Returns: boolean — true if adblocker detected
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";

const AD_URLS = [
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
  "https://www.googletagservices.com/tag/js/gpt.js",
  "https://www.googletagmanager.com/gtm.js",
  "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
];

export function useAdblockerDetected(): boolean {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // ── Bait div ──────────────────────────────────────────────────────────
    const bait = document.createElement("div");
    bait.className =
      "adsbox pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links";
    bait.innerHTML = '<ins class="adsbygoogle"></ins>';
    bait.style.cssText =
      "position:absolute;left:-10000px;top:0;width:1px;height:1px;z-index:-1;";
    document.body.appendChild(bait);

    const checkBait = () => {
      if (cancelled) return false;
      const s = window.getComputedStyle(bait);
      return (
        s.display === "none" ||
        s.visibility === "hidden" ||
        s.opacity === "0" ||
        bait.offsetHeight === 0 ||
        bait.offsetParent === null
      );
    };

    const markDetected = () => {
      if (!cancelled) {
        setDetected(true);
        cancelled = true;
        cleanup();
      }
    };

    const cleanup = () => {
      if (bait.parentNode) bait.parentNode.removeChild(bait);
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    // ── Check 1: on next animation frame ─────────────────────────────────
    requestAnimationFrame(() => {
      if (checkBait()) markDetected();
    });

    // ── Check 2: after 1.5s (catches slow filter application) ────────────
    setTimeout(() => {
      if (cancelled) return;
      if (checkBait()) markDetected();
    }, 1500);

    // ── Script bait: blocked at network level by adblockers ──────────────
    const script = document.createElement("script");
    script.async = true;
    script.src = AD_URLS[0];
    script.onerror = () => markDetected();
    document.head.appendChild(script);

    // ── Fetch bait: try to HEAD known ad URLs ────────────────────────────
    for (const url of AD_URLS) {
      fetch(url, { method: "HEAD", mode: "no-cors" }).catch(() => {
        markDetected();
      });
    }

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return detected;
}
