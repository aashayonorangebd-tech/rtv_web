export default function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`sm:container mt-4 sm:px-4 mx-auto dark:text-white sm:my-5 ${className}`}>
      <div className="flex justify-center items-center overflow-hidden">
        <div className="w-[970px] max-w-full h-[90px] bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400">
          বিজ্ঞাপন — 970×90
        </div>
      </div>
    </div>
  );
}
