import { getArchiveStories } from "@/lib/api";
import LatestNewsGrid from "@/components/LatestNewsGrid";

export default async function LatestPage() {
  const { stories, totalPages } = await getArchiveStories(0, 12);

  return <LatestNewsGrid initialStories={stories} totalPages={totalPages} />;
}
