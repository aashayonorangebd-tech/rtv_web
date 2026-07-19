// ─── Election district → RTV area id mapping ────────────────────────────────
// RTV's election news comes from the (publicly callable, unauthenticated)
// endpoint:
//   GET /api/election-area/view/{districtId}/stories?page=N
//   GET /api/election-area/view/{districtId}/{electionAreaId}/stories?page=N
// The districtId for each district slug is resolved by RTV's server from the
// slug; the values below were extracted from RTV's rendered election pages
// (districtId field) and map 1:1 to Bangladesh's 64 districts.
// A constituency (আসন) "রংপুর-N" uses electionAreaId = N.

export const DISTRICT_IDS: Record<string, number> = {
  dhaka: 1,
  faridpur: 2,
  gazipur: 3,
  gopalganj: 4,
  jamalpur: 5,
  kishoreganj: 6,
  madaripur: 7,
  manikganj: 8,
  munshiganj: 9,
  mymensingh: 10,
  narayanganj: 11,
  narsingdi: 12,
  netrakona: 13,
  rajbari: 14,
  shariatpur: 15,
  sherpur: 16,
  tangail: 17,
  bandarban: 18,
  brahmanbaria: 19,
  chandpur: 20,
  chittagong: 21,
  comilla: 22,
  coxsBazar: 23, // coxs-bazar
  feni: 24,
  khagrachhari: 25,
  lakshmipur: 26,
  noakhali: 27,
  rangamati: 28,
  bogra: 29,
  joypurhat: 30,
  naogaon: 31,
  natore: 32,
  nawabganj: 33, // chapainawabganj
  pabna: 34,
  rajshahi: 35,
  sirajganj: 36,
  bagerhat: 37,
  chuadanga: 38,
  jessore: 39,
  jhenaidah: 40,
  khulna: 41,
  kushtia: 42,
  magura: 43,
  meherpur: 44,
  narail: 45,
  satkhira: 46,
  barguna: 47,
  barisal: 48,
  bhola: 49,
  jhalokati: 50,
  patuakhali: 51,
  pirojpur: 52,
  habiganj: 53,
  maulvibazar: 54,
  sunamganj: 55,
  sylhet: 56,
  dinajpur: 57,
  gaibandha: 58,
  kurigram: 59,
  lalmonirhat: 60,
  nilphamari: 61,
  panchagarh: 62,
  rangpur: 63,
  thakurgaon: 64,
};

// Number of Jatiya Sangsad constituencies (আসন) per district.
export const DISTRICT_SEATS: Record<string, number> = {
  bagerhat: 3,
  bandarban: 1,
  barguna: 2,
  barisal: 6,
  bhola: 4,
  bogra: 7,
  brahmanbaria: 6,
  chandpur: 5,
  chittagong: 12,
  chuadanga: 2,
  comilla: 11,
  "coxs-bazar": 4,
  dhaka: 20,
  dinajpur: 6,
  faridpur: 4,
  feni: 3,
  gaibandha: 5,
  gazipur: 5,
  gopalganj: 3,
  habiganj: 4,
  jamalpur: 5,
  jessore: 6,
  jhalokati: 2,
  jhenaidah: 4,
  joypurhat: 2,
  khagrachhari: 1,
  khulna: 6,
  kishoreganj: 6,
  kurigram: 4,
  kushtia: 4,
  lakshmipur: 4,
  lalmonirhat: 3,
  madaripur: 3,
  magura: 2,
  manikganj: 3,
  maulvibazar: 4,
  meherpur: 2,
  munshiganj: 3,
  mymensingh: 11,
  naogaon: 6,
  narail: 2,
  narayanganj: 5,
  narsingdi: 5,
  natore: 4,
  nawabganj: 3,
  netrakona: 5,
  nilphamari: 4,
  noakhali: 6,
  pabna: 5,
  panchagarh: 2,
  patuakhali: 4,
  pirojpur: 3,
  rajbari: 2,
  rajshahi: 6,
  rangamati: 1,
  rangpur: 6,
  satkhira: 4,
  shariatpur: 3,
  sherpur: 3,
  sirajganj: 6,
  sunamganj: 5,
  sylhet: 6,
  tangail: 8,
  thakurgaon: 3,
};

// Bengali display names for each district slug (from RTV location API).
export const DISTRICT_BN_NAMES: Record<string, string> = {
  bagerhat: "বাগেরহাট",
  bandarban: "বান্দরবান",
  barguna: "বরগুনা",
  barisal: "বরিশাল",
  bhola: "ভোলা",
  bogra: "বগুড়া",
  brahmanbaria: "ব্রাহ্মণবাড়িয়া",
  chandpur: "চাঁদপুর",
  chittagong: "চট্টগ্রাম",
  chuadanga: "চুয়াডাঙ্গা",
  comilla: "কুমিল্লা",
  "coxs-bazar": "কক্সবাজার",
  dhaka: "ঢাকা",
  dinajpur: "দিনাজপুর",
  faridpur: "ফরিদপুর",
  feni: "ফেনী",
  gaibandha: "গাইবান্ধা",
  gazipur: "গাজীপুর",
  gopalganj: "গোপালগঞ্জ",
  habiganj: "হবিগঞ্জ",
  jamalpur: "জামালপুর",
  jessore: "যশোর",
  jhalokati: "ঝালকাঠি",
  jhenaidah: "ঝিনাইদহ",
  joypurhat: "জয়পুরহাট",
  khagrachhari: "খাগড়াছড়ি",
  khulna: "খুলনা",
  kishoreganj: "কিশোরগঞ্জ",
  kurigram: "কুড়িগ্রাম",
  kushtia: "কুষ্টিয়া",
  lakshmipur: "লক্ষীপুর",
  lalmonirhat: "লালমনিরহাট",
  madaripur: "মাদারীপুর",
  magura: "মাগুরা",
  manikganj: "মানিকগঞ্জ",
  maulvibazar: "মৌলভীবাজার",
  meherpur: "মেহেরপুর",
  munshiganj: "মুন্সীগঞ্জ",
  mymensingh: "ময়মনসিংহ",
  naogaon: "নওগাঁ",
  narail: "নড়াইল",
  narayanganj: "নারায়ণগঞ্জ",
  narsingdi: "নরসিংদী",
  natore: "নাটোর",
  nawabganj: "চাঁপাইনবাবগঞ্জ",
  netrakona: "নেত্রকোনা",
  nilphamari: "নীলফামারী",
  noakhali: "নোয়াখালী",
  pabna: "পাবনা",
  panchagarh: "পঞ্চগড়",
  patuakhali: "পটুয়াখালী",
  pirojpur: "পিরোজপুর",
  rajbari: "রাজবাড়ী",
  rajshahi: "রাজশাহী",
  rangamati: "রাঙ্গামাটি",
  rangpur: "রংপুর",
  satkhira: "সাতক্ষীরা",
  shariatpur: "শরীয়তপুর",
  sherpur: "শেরপুর",
  sirajganj: "সিরাজগঞ্জ",
  sunamganj: "সুনামগঞ্জ",
  sylhet: "সিলেট",
  tangail: "টাঙ্গাইল",
  thakurgaon: "ঠাকুরগাঁও",
};

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(n: number): string {
  return String(n)
    .split("")
    .map((c) => (c >= "0" && c <= "9" ? BENGALI_DIGITS[Number(c)] : c))
    .join("");
}

export function getDistrictId(district: string): number | undefined {
  return DISTRICT_IDS[district];
}

export function getDistrictBnName(district: string): string {
  return DISTRICT_BN_NAMES[district] ?? humanizeFallback(district);
}

// Fallback humanizer for any slug missing from DISTRICT_BN_NAMES.
function humanizeFallback(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getDistrictSeats(district: string): number {
  return DISTRICT_SEATS[district] ?? 0;
}
