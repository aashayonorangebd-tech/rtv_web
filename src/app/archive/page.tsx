import { Metadata } from "next";
import ArchiveClient from "@/components/ArchiveClient";
import { getArchiveStories } from "@/lib/api";

export const metadata: Metadata = {
  title: "আর্কাইভ | RTV Online",
  description: "RTV Online-এর আর্কাইভ — পুরানো খবর ও প্রবন্ধগুলি খুঁজুন",
};

export default async function ArchivePage() {
  const initialData = await getArchiveStories(0, 12);

  return (
    <div className="font-bangla">
      <div className="main-container max-sm:mt-2">
        <ArchiveClient initialStories={initialData.stories} />
      </div>
    </div>
  );
}