export default function SectionHeader({
  title,
  href = "#",
}: {
  title: string;
  href?: string;
}) {
  return (
    <div>
      <a href={href} className="flex justify-between items-baseline group">
        <h2 className="text-2xl font-bold text-[#2c4b9c] dark:text-slate-300">
          {title}
        </h2>
        <div className="flex gap-1 items-center">
          <p className="text-base dark:text-white text-[#2c4b9c] font-bold">আরও</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-3.5 h-3.5 text-[#2c4b9c] dark:text-slate-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </a>
      <div className="mt-1 mb-[15px] flex items-baseline">
        <div className="h-[2px] bg-[#2c4b9c] dark:bg-white w-full" />
      </div>
    </div>
  );
}
