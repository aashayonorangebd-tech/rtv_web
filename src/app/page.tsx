import HomePage from "@/components/HomePage";
import type { HomeTemplateResponse } from "@/lib/types";

async function getHomeData(): Promise<HomeTemplateResponse | null> {
  try {
    const res = await fetch(
      `${process.env.API_BASE_URL || "https://api.rtvonline.com"}/api/collection/view/all-active-temp-collection/stories`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const data = await getHomeData();

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-foreground/60">
        Unable to load content. Please try again later.
      </div>
    );
  }

  return <HomePage data={data} />;
}
