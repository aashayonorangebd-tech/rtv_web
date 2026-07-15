import Link from "next/link";
import { notFound } from "next/navigation";

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

function humanize(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return DISTRICTS.map((district) => ({ district }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string }>;
}) {
  const { district } = await params;
  return {
    title: `${humanize(district)} | নির্বাচন | RTV Online`,
    description: `${humanize(district)} জেলার নির্বাচনী তথ্য`,
  };
}

export default async function ElectionDistrictPage({
  params,
}: {
  params: Promise<{ district: string }>;
}) {
  const { district } = await params;
  if (!DISTRICTS.includes(district)) notFound();

  const name = humanize(district);

  return (
    <div className="font-bangla max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-6">
      <Link
        href="/election"
        className="text-blue-700 hover:underline text-sm"
      >
        ← মানচিত্রে ফিরে যান
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold mt-3 mb-4 text-gray-900 dark:text-white">
        {name}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        এই জেলার নির্বাচনী তথ্য শীঘ্রই আসছে।
      </p>
    </div>
  );
}
