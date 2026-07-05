import React from "react";
import { Menu, Search } from "lucide-react";

const categories = [
  { id: 1, name: "জাতীয়", slug: "national" },
  { id: 2, name: "রাজনীতি", slug: "politics" },
  { id: 3, name: "রাজধানী", slug: "capital" },
  { id: 4, name: "দেশজুড়ে", slug: "countrywide" },
  { id: 5, name: "অর্থনীতি", slug: "economy" },
  { id: 6, name: "আন্তর্জাতিক", slug: "international" },
  { id: 7, name: "বিনোদন", slug: "entertainment" },
  { id: 8, name: "খেলা", slug: "sports" },
  { id: 9, name: "লাইফস্টাইল", slug: "lifestyle" },
];

export default function HeaderNav() {
  return (
    <div className="w-full bg-[#304a8c] dark:bg-slate-950 border-t border-white/10 shadow-md relative z-40">
      <div className="max-w-[1350px] mx-auto h-[40px] md:h-[45px] flex items-center justify-between pl-[100px] md:pl-[140px] lg:pl-[160px] pr-4 md:pr-6">
        <nav className="flex-1 overflow-x-auto no-scrollbar h-full">
          <ul className="flex items-center h-full whitespace-nowrap">
            {categories.map((cat, index) => (
              <React.Fragment key={cat.id}>
                <li className="h-full flex items-center">
                  <a
                    href={`/category/${cat.slug}`}
                    className="text-white text-[15px] md:text-[16px] font-bold hover:text-[#a3bffa] transition-colors px-3 md:px-5 tracking-wide"
                  >
                    {cat.name}
                  </a>
                </li>
                {index < categories.length && (
                  <li className="text-white/40 select-none text-sm font-bold flex items-center h-full">|</li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 text-white ml-4 pl-5 border-l border-white/20 h-full">
          <button className="hover:text-[#a3bffa] transition-colors">
            <Menu size={22} />
          </button>
          <button className="hover:text-[#a3bffa] transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
