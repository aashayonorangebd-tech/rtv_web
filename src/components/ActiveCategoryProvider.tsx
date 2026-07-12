// ─── ActiveCategoryProvider ───────────────────────────────────────────────
// Client context that tracks which category is currently active so the header
// nav can highlight it with a red background.
//
// The slug is derived automatically from the URL on /category/{slug} pages,
// and is explicitly set by the story details page (which knows its category
// even though the URL is /story/{id}).
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { createContext, useContext, useState } from "react";

type ActiveCategoryValue = {
  activeSlug: string | null;
  setActiveSlug: (slug: string | null) => void;
};

const ActiveCategoryContext = createContext<ActiveCategoryValue>({
  activeSlug: null,
  setActiveSlug: () => {},
});

export function ActiveCategoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  return (
    <ActiveCategoryContext.Provider value={{ activeSlug, setActiveSlug }}>
      {children}
    </ActiveCategoryContext.Provider>
  );
}

export const useActiveCategory = () => useContext(ActiveCategoryContext);
