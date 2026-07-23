import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchAreas, fetchDistricts, fetchSubDistricts, getLocationStories } from "@/lib/api";
import LocationStoriesFeed from "@/components/LocationStoriesFeed";

export async function generateStaticParams() {
  const areas = await fetchAreas();
  const params: { area: string; district: string }[] = [];
  for (const area of areas) {
    const districts = await fetchDistricts(area.id);
    for (const district of districts) {
      params.push({
        area: area.name.toLowerCase(),
        district: district.name.toLowerCase(),
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string; district: string }>;
}) {
  const { area, district } = await params;
  const areas = await fetchAreas();
  const areaData = areas.find((a) => a.name.toLowerCase() === area);
  if (!areaData) return { title: "দেশজুড়ে | রটিভি অনলাইন" };

  const districts = await fetchDistricts(areaData.id);
  const districtData = districts.find(
    (d) => d.name.toLowerCase() === district,
  );
  if (!districtData) return { title: `${areaData.displayName} | রটিভি অনলাইন` };

  return {
    title: `${districtData.displayName} | ${areaData.displayName} | রটিভি অনলাইন`,
    description: `${districtData.displayName} এর সর্বশেষ খবর ও আপডেট`,
    openGraph: {
      title: `${districtData.displayName} | ${areaData.displayName} | রটিভি অনলাইন`,
      description: `${districtData.displayName} এর সর্বশেষ খবর ও আপডেট`,
    },
  };
}

export default async function CountryDistrictPage({
  params,
}: {
  params: Promise<{ area: string; district: string }>;
}) {
  const { area, district } = await params;
  const areas = await fetchAreas();
  const areaData = areas.find((a) => a.name.toLowerCase() === area);

  if (!areaData) return notFound();

  const districts = await fetchDistricts(areaData.id);
  const districtData = districts.find(
    (d) => d.name.toLowerCase() === district,
  );

  if (!districtData) return notFound();

  const [subDistricts, data] = await Promise.all([
    fetchSubDistricts(districtData.id),
    getLocationStories(districtData.name.toLowerCase(), undefined, 0, 10),
  ]);

  const subDistrictTags = subDistricts.map((s) => ({
    id: s.id,
    name: s.name,
    displayName: s.displayName,
    href: `/country/${area}/${district}/${s.name.toLowerCase()}`,
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
                <p className="text-lg font-bold dark:text-white text-[#005adf] flex items-center gap-1">
                  <span className="flex items-center">
                    <Link href={`/country/${area}`}>{areaData.displayName}</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                  <span className="flex items-center">
                    <Link href={`/country/${area}/${district}`}>{districtData.displayName}</Link>
                  </span>
                </p>

                <div className="mt-1 mb-[5px] flex items-baseline">
                  <div className="h-[2px] bg-rtv-bg-blue w-full"></div>
                </div>

                <LocationStoriesFeed
                  districtName={districtData.name.toLowerCase()}
                  initialStories={data.stories.model}
                  totalPages={data.stories.totalPages}
                  areas={subDistrictTags}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
