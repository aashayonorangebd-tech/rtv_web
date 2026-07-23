import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchAreas, fetchDistricts, getLocationStories } from "@/lib/api";
import LocationStoriesFeed from "@/components/LocationStoriesFeed";

const PAGE_SIZE = 10;

export async function generateStaticParams() {
  const areas = await fetchAreas();
  return areas.map((area) => ({
    slug: [area.name.toLowerCase()],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const areas = await fetchAreas();
  const areaName = slug[0]?.toLowerCase();
  const area = areas.find((a) => a.name.toLowerCase() === areaName);
  if (!area) return { title: "দেশজুড়ে | রটিভি অনলাইন" };

  return {
    title: `${area.displayName} | রটিভি অনলাইন`,
    description: `${area.displayName} এর সর্বশেষ খবর ও আপডেট`,
    openGraph: {
      title: `${area.displayName} | রটিভি অনলাইন`,
      description: `${area.displayName} এর সর্বশেষ খবর ও আপডেট`,
    },
  };
}

export default async function CountryAreaPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const areas = await fetchAreas();
  const areaName = slug[0]?.toLowerCase();
  const area = areas.find((a) => a.name.toLowerCase() === areaName);

  if (!area) return notFound();

  const [districts, data] = await Promise.all([
    fetchDistricts(area.id),
    getLocationStories(undefined, undefined, 0, 10, areaName),
  ]);

  const areaTags = districts.map((d) => ({
    id: d.id,
    name: d.name,
    displayName: d.displayName,
    href: `/country/${area.name.toLowerCase()}/${d.name.toLowerCase()}`,
  }));

  return (
    <main className="px-5 sm:px-0 mt-4 overflow-hidden">
      <div className="font-bangla">
        <div className="main-container-inner py-2.5 place-content-between max-sm:py-0 grid grid-cols-12 gap-x-2.5">
          <div className="col-span-12 max-sm:col-span-12 max-lg:col-span-6">
            <div className="flex flex-col justify-between gap-3">
              <div className="px-4 md:px-1">
                <h1 className="text-2xl font-bold dark:text-rtv-red-clr mb-3 text-[#005adf]">
                  <Link href="/category/country">দেশজুড়ে</Link>
                </h1>
                <p className="text-lg font-bold dark:text-white text-[#005adf]">
                  {area.displayName}
                </p>

                <div className="mt-1 mb-[5px] flex items-baseline">
                  <div className="h-[2px] bg-rtv-bg-blue w-full"></div>
                </div>

                {/* ─── District tags */}
                {areaTags.length > 0 && (
                  <div className="overflow-x-auto whitespace-nowrap no-scrollbar items-center dark:bg-black5 flex justify-start gap-2 list-none my-2.5">
                    {areaTags.map((tag, index) => (
                      <span
                        key={tag.id}
                        className="border-r border-r-black dark:border-r-white last:border-r-0"
                      >
                        <Link href={tag.href}>
                          <span className={`text-[1.2rem] outline-none cursor-pointer hover:text-rtv-red-clr dark:hover:text-[#d8d7d7] ${index === 0 ? "pl-0 pr-3" : "px-3"}`}>
                            {tag.displayName}
                          </span>
                        </Link>
                      </span>
                    ))}
                  </div>
                )}

                <LocationStoriesFeed
                  districtName={areaName}
                  divisionName={areaName}
                  initialStories={data.stories.model}
                  totalPages={data.stories.totalPages}
                  areas={[]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
