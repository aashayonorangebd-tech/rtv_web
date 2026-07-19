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
  const params: { district: string; constituency: string }[] = [];
  for (const district of DISTRICTS) {
    const seats = getDistrictSeats(district);
    for (let n = 1; n <= seats; n++) {
      params.push({ district, constituency: `${district}-${n}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string; constituency: string }>;
}) {
  const { district, constituency } = await params;
  const districtName = getDistrictBnName(district);
  const seatNum = Number(constituency.replace(`${district}-`, ""));
  const seatName = `${districtName}-${toBengaliNumber(seatNum)}`;
  return {
    title: `${seatName} | ${districtName} | নির্বাচন | RTV Online`,
    description: `${districtName} এর ${seatName} আসনের নির্বাচনী তথ্য`,
  };
}

export default async function ElectionConstituencyPage({
  params,
}: {
  params: Promise<{ district: string; constituency: string }>;
}) {
  const { district, constituency } = await params;
  if (!DISTRICTS.includes(district)) notFound();

  const seats = getDistrictSeats(district);
  const seatNum = Number(constituency.replace(`${district}-`, ""));
  if (!constituency.startsWith(`${district}-`) || !(seatNum >= 1 && seatNum <= seats)) {
    notFound();
  }

  const districtId = getDistrictId(district);
  const districtName = getDistrictBnName(district);
  const seatName = `${districtName}-${toBengaliNumber(seatNum)}`;

  const data =
    districtId !== undefined
      ? await getElectionAreaStories(districtId, seatNum, 0, 10)
      : { model: [], totalPages: 0, currentPage: 0, totalElements: 0 };
  const stories = data.model;

  const [lead, secondary, ...rest] = stories;
  const rowStories = rest.slice(0, 4);
  const gridStories = rest.slice(4);

  return (
    <main className="px-5 sm:px-0 mt-4 overflow-hidden">
      <div className="font-bangla">
        <div className="main-container-inner py-2.5 max-sm:py-0">
          <Link
            href="/election"
            className="text-blue-700 hover:underline text-sm"
          >
            ← মানচিত্রে ফিরে যান
          </Link>
          <h1 className="text-2xl font-bold dark:text-white mt-3">{seatName}</h1>
          <div className="mt-1 mb-[5px] flex items-baseline">
            <div className="h-[2px] bg-rtv-bg-blue w-full"></div>
          </div>
          <Link
            href={`/election/${district}`}
            className="text-[1.2rem] text-[#005adf] hover:text-rtv-red-clr"
          >
            {districtName}
          </Link>

          {/* ─── Lead + secondary story row ───────────────────── */}
          {lead && (
            <div className="pb-2.5 mt-3 grid grid-cols-12 gap-x-2.5">
              <div className="col-span-12">
                <div className="flex flex-col sm:flex-row gap-x-2">
                  <div className="mb-2.5 border-b pb-5">
                    <div className="grid grid-cols-12 gap-2.5">
                      <div className="col-span-12 lg:col-span-8 group border-r pr-2">
                        <a href={countryPath(lead)} title={lead.mainTitle}>
                          <img
                            alt={lead.mainTitle}
                            src={lead.fileName}
                            width={700}
                            height={393}
                            loading="lazy"
                            className="object-cover object-center max-w-full aspect-video"
                          />
                          <h2 className="category-title-catSec pt-2.5 pl-1 text-[#2F343F] dark:text-white group-hover:text-blue-800 group-hover:dark:text-blue-300 line-clamp-3 font-extrabold">
                            {lead.mainTitle}
                          </h2>
                        </a>
                      </div>

                      {secondary && (
                        <div className="col-span-12 lg:col-span-4 border-r pr-2">
                          <a
                            href={countryPath(secondary)}
                            className="flex flex-col gap-y-2 group"
                          >
                            <img
                              src={secondary.fileName}
                              width={650}
                              height={365}
                              loading="lazy"
                              alt={secondary.mainTitle}
                              className="object-cover object-center max-w-full aspect-video"
                            />
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

                {rowStories.length > 0 && (
                  <div className="flex flex-row flex-wrap lg:flex-nowrap gap-2 divide-x border-b pb-2 mb-5">
                    {rowStories.map((s) => (
                      <div key={s.storyId} className="pl-2">
                        <a className="flex flex-col w-full" href={countryPath(s)}>
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
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {gridStories.length > 0 && districtId ? (
            <DistrictStories
              districtId={districtId}
              electionAreaId={seatNum}
              initialStories={gridStories}
              initialTotalPages={data.totalPages}
              initialPage={0}
              pageSize={10}
            />
          ) : (
            !lead && (
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                এই আসনের নির্বাচনী তথ্য পাওয়া যায়নি।
              </p>
            )
          )}
        </div>
      </div>
    </main>
  );
}
