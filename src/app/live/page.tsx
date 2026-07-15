import LivePlayer from "@/components/LivePlayer";
import AdBanner from "@/components/AdBanner";

export const metadata = {
  title: "আরটিভি লাইভ | RTV Online",
  description: "আরটিভি সরাসরি সম্প্রচার",
};

export default function LivePage() {
  return (
    <div className="font-bangla">
      <div className="main-container max-sm:mt-2">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-2.5 items-center">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              আরটিভি লাইভ
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-12 max-sm:items-center justify-center gap-5 sm:mt-5">
          <div className="col-span-full sm:col-span-9">
            <div className="h-[2px] w-full bg-blue-600 mb-2"></div>
            <LivePlayer />
          </div>
          <div className="col-span-full sm:col-span-3">
            <AdBanner height={250} className="mt-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
