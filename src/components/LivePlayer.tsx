"use client";

import { useRef } from "react";

export default function LivePlayer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const play = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "*",
    );
  };

  const fullscreen = () => {
    if (wrapperRef.current?.requestFullscreen) {
      wrapperRef.current.requestFullscreen();
    }
  };

  return (
    <div className="player-wrapper">
      <div className="player-inside no-print" style={{ width: "100%", height: "100%" }}>
        <div ref={wrapperRef} className="relative w-full aspect-video bg-black">
          <iframe
            ref={iframeRef}
            frameBorder={0}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            title="RTV Live"
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/7P6pqY6bTDw?autoplay=0&mute=0&controls=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1"
            id="widget2"
          />
        </div>
      </div>
      <div className="no-print ml-2.5 mt-4 mb-2 flex items-center gap-2">
        <button
          type="button"
          onClick={play}
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          প্লে
        </button>
        <button
          type="button"
          onClick={fullscreen}
          className="rounded bg-slate-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          ফুলস্ক্রিন
        </button>
      </div>
    </div>
  );
}
