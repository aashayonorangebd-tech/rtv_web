import Link from "next/link";
import { notFound } from "next/navigation";
import { getElectionAreaStories, countryPath } from "@/lib/api";
import {
  getDistrictId,
  getDistrictBnName,
  getDistrictSeats,
  toBengaliNumber,
} from "@/lib/electionSeats";
import DistrictStories from "@/components/DistrictStories";

const DISTRICTS = [
  "bagerhat",
  "bandarban",
  "barguna",
  "barisal",
  "bhola",
  "bogra",
  "brahmanbaria",
  "chandpur",
  "chittagong",
  "chuadanga",
  "comilla",
  "coxs-bazar",
  "dhaka",
  "dinajpur",
  "faridpur",
  "feni",
  "gaibandha",
  "gazipur",
  "gopalganj",
  "habiganj",
  "jamalpur",
  "jessore",
  "jhalokati",
  "jhenaidah",
  "joypurhat",
  "khagrachhari",
  "khulna",
  "kishoreganj",
  "kurigram",
  "kushtia",
  "lakshmipur",
  "lalmonirhat",
  "madaripur",
  "magura",
  "manikganj",
  "maulvibazar",
  "meherpur",
  "munshiganj",
  "mymensingh",
  "naogaon",
  "narail",
  "narayanganj",
  "narsingdi",
  "natore",
  "nawabganj",
  "netrakona",
  "nilphamari",
  "noakhali",
  "pabna",
  "panchagarh",
  "patuakhali",
  "pirojpur",
  "rajbari",
  "rajshahi",
  "rangamati",
  "rangpur",
  "satkhira",
  "shariatpur",
  "sherpur",
  "sirajganj",
  "sunamganj",
  "sylhet",
  "tangail",
  "thakurgaon",
];

export function generateStaticParams() {
  return DISTRICTS.map((district) => ({ district }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string }>;
}) {
  const { district } = await params;
  const name = getDistrictBnName(district);
  return {
    title: `${name} | নির্বাচন | RTV Online`,
    description: `${name} জেলার নির্বাচনী তথ্য`,
  };
}

export default async function ElectionDistrictPage({
  params,
}: {
  params: Promise<{ district: string }>;
}) {
  const { district } = await params;
  if (!DISTRICTS.includes(district)) notFound();

  const districtId = getDistrictId(district);
  const name = getDistrictBnName(district);

  const data = districtId
    ? await getElectionAreaStories(districtId, undefined, 0, 10)
    : { model: [], totalPages: 0, currentPage: 0, totalElements: 0 };
  const stories = data.model;

  const seatCount = getDistrictSeats(district);
  const seats = Array.from({ length: seatCount }, (_, i) => i + 1);

  const [lead, secondary, ...rest] = stories;
  const rowStories = rest.slice(0, 4);
  const gridStories = rest.slice(4);

  return (
    <main className="px-5 sm:px-0 mt-4 overflow-hidden">
      <div className="font-bangla">
        <div className="main-container-inner py-2.5 place-content-between max-sm:py-0 grid grid-cols-12 gap-x-2.5">
          <div className="col-span-12 max-sm:col-span-12 max-lg:col-span-6">
            <div className="flex flex-col justify-between gap-3">
              <div className="px-4 md:px-1">
                <h1 className="text-2xl font-bold dark:text-rtv-red-clr mb-3 text-[#005adf]">
                  <Link href="/election">নির্বাচন</Link>
                </h1>
                <p className="text-lg font-bold dark:text-white text-[#005adf] flex items-center gap-1">
                  <span className="flex items-center">
                    <span className="inline-flex items-center flex-wrap">
                      <span>{name}</span>
                    </span>
                  </span>
                </p>

                <div className="mt-1 mb-[5px] flex items-baseline">
                  <div className="h-[2px] bg-rtv-bg-blue w-full"></div>
                </div>

                {/* ─── Constituency (আসন) bar — Bengali numerals ──────── */}
                {seats.length > 0 && (
                  <div className="flex items-center justify-start gap-2 list-none my-2.5 dark:bg-black/5 overflow-x-auto whitespace-nowrap no-scrollbar flex-nowrap lg:overflow-visible lg:whitespace-normal lg:flex-wrap">
                    {seats.map((n, i) => (
                      <span key={n} className="inline-flex items-center">
                        <Link
                          href={`/election/${district}/${district}-${n}`}
                          className="text-[1.2rem] inline-flex outline-none cursor-pointer hover:text-rtv-red-clr dark:hover:text-[#d8d7d7] pl-0"
                        >
                          {name}-{toBengaliNumber(n)}
                        </Link>
                        {i < seats.length - 1 && (
                          <span className="mx-2 text-black/60 dark:text-white/60">
                            |
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}

                {/* ─── Lead + secondary story row ───────────────────── */}
                {lead && (
                  <div className="pb-2.5 place-content-between max-sm:py-0 grid grid-cols-12 gap-x-2.5">
                    <div className="col-span-12">
                      <div className="flex flex-col sm:flex-row gap-x-2">
                        <div className="mb-2.5 border-b pb-5">
                          <div className="grid grid-cols-12 gap-2.5">
                            <div className="col-span-12 lg:col-span-8 group border-r pr-2">
                              <a href={countryPath(lead)} title={lead.mainTitle}>
                                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                                  <img
                                    alt={lead.mainTitle}
                                    src={lead.fileName}
                                    width={700}
                                    height={393}
                                    loading="lazy"
                                    className="object-cover object-center max-w-full aspect-video"
                                  />
                                </div>
                                <div className="flex flex-col flex-wrap items-start group">
                                  <h2 className="category-title-catSec pt-2.5 pl-1 text-[#2F343F] dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300 line-clamp-3 font-extrabold">
                                    {lead.mainTitle}
                                  </h2>
                                </div>
                              </a>
                            </div>

                            {secondary && (
                              <div className="col-span-12 lg:col-span-4 border-r pr-2">
                                <a
                                  href={countryPath(secondary)}
                                  className="flex flex-col gap-y-2 group"
                                >
                                  <div className="aspect-video w-full relative overflow-hidden bg-cover bg-no-repeat">
                                    <img
                                      src={secondary.fileName}
                                      width={650}
                                      height={365}
                                      loading="lazy"
                                      alt={secondary.mainTitle}
                                      className="object-cover object-center max-w-full aspect-video"
                                    />
                                  </div>
                                  <div className="mt-2 font-extrabold">
                                    <h3 className="main-title-post dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300">
                                      {secondary.mainTitle}
                                    </h3>
                                  </div>
                                  {secondary.subTitle && (
                                    <p className="text-[#555] subTitlePost dark:text-white lineclamped-3 mt-1">
                                      {secondary.subTitle}
                                    </p>
                                  )}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ─── 4-up small card row ─────────────────────── */}
                      {rowStories.length > 0 && (
                        <div className="flex flex-row flex-wrap lg:flex-nowrap gap-2 divide-x border-b pb-2 mb-5">
                          {rowStories.map((s) => (
                            <div key={s.storyId} className="pl-2">
                              <a
                                className="flex flex-col w-full"
                                href={countryPath(s)}
                              >
                                <div className="group relative">
                                  <img
                                    alt={s.mainTitle}
                                    src={s.fileName}
                                    width={650}
                                    height={365}
                                    loading="lazy"
                                    className="object-cover object-center max-w-full aspect-video"
                                  />
                                  <div className="pt-2">
                                    <h3 className="dark:text-white text-[1.2rem] leading-[23px] font-bold group-hover:text-rtv-blue-text-hover">
                                      {s.mainTitle}
                                    </h3>
                                  </div>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ─── Remaining stories grid + load more ──────────── */}
                {gridStories.length > 0 && districtId ? (
                  <DistrictStories
                    districtId={districtId}
                    electionAreaId={undefined}
                    initialStories={gridStories}
                    initialTotalPages={data.totalPages}
                    initialPage={0}
                    pageSize={10}
                  />
                ) : (
                  !lead && (
                    <p className="text-gray-600 dark:text-gray-300">
                      এই জেলার নির্বাচনী তথ্য পাওয়া যায়নি।
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
