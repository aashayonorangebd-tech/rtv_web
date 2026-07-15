import ElectionMap from "@/components/ElectionMap";

export const metadata = {
  title: "নির্বাচন | RTV Online",
  description: "বাংলাদেশের নির্বাচনী মানচিত্র",
};

export default function ElectionPage() {
  return (
    <div className="font-bangla">
      <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          নির্বাচন
        </h1>
      </div>
      <ElectionMap />
    </div>
  );
}
