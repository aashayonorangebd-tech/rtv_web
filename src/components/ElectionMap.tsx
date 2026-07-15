"use client";

import { useEffect, useState } from "react";

export default function ElectionMap() {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/map.svg")
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((t) => {
        if (active) setSvg(t);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-300">
        মানচিত্র লোড করা যায়নি।
      </div>
    );
  }

  return (
    <div
      className="w-full h-screen max-sm:h-min [&>svg]:w-full [&>svg]:h-full"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
