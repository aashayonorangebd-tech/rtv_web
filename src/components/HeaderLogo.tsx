// ─── HeaderLogo ──────────────────────────────────────────────────────────────
// RTV logo link positioned absolutely on the left edge of the header.
// Responsive sizing: 75px on mobile, 90px on md+.
// ─────────────────────────────────────────────────────────────────────────────

export default function HeaderLogo() {
  return (
    <div className="absolute left-4 md:left-6 lg:left-8 top-1 md:top-2 z-45 w-[75px] md:w-[90px]">
      <a href="/" className="block drop-shadow-md hover:opacity-95 transition-opacity">
        <img
          src="/rtv-logo.svg"
          alt="RTV News"
          className="w-full h-auto object-contain"
        />
      </a>
    </div>
  );
}
