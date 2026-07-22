import { notFound } from "next/navigation";
import type { CategoryHeaderResponse, StoryModel } from "@/lib/types";
import { getCategoryPageData, toCategoryStoryModel } from "@/lib/api";
import CategoryFeed from "@/components/CategoryFeed";

export async function generateMetadata() {
  const { metadata } = await getCategoryPageData(10);
  if (!metadata) return { title: "সাক্ষাৎকার | RTV Online" };

  return {
    title: `${metadata.displayTitle} | RTV Online`,
    description: `${metadata.displayTitle} – সর্বশেষ খবর ও আপডেট`,
    openGraph: {
      title: `${metadata.displayTitle} | RTV Online`,
      description: `${metadata.displayTitle} – সর্বশেষ খবর ও আপডেট`,
    },
  };
}

export default async function InterviewCategoryPage() {
  const { metadata, stories } = await getCategoryPageData(10);

  if (!metadata) return notFound();

  const initialStories: StoryModel[] = stories.model.map(toCategoryStoryModel);

  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6 dark:text-white">
      <CategoryFeed
        slug="others/interview"
        categoryId={metadata.id}
        displayTitle={metadata.displayTitle}
        initialStories={initialStories}
        totalPages={stories.totalPages}
        subcategories={[]}
        parentTitle={metadata.parentTitle}
        parentUrl={metadata.parentUrl}
      />
    </div>
  );
}
