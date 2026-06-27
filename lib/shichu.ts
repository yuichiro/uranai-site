// 四柱推命 簡易計算ライブラリ

const TENKAN = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const CHISHI = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
const GOKYO = ["木","木","火","火","土","土","金","金","水","水"];
const INKYO = ["陽","陰","陽","陰","陽","陰","陽","陰","陽","陰"];

const CHISHI_GOKYO: Record<string, string> = {
  子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",
  午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水",
};

export interface Pillar {
  tenkan: string;
  chishi: string;
  gokyo: string;
  inyo: string;
}

export interface Shichu {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar | null;
}

function calcYearPillar(year: number): Pillar {
  const base = year - 4;
  const tk = TENKAN[base % 10];
  const cs = CHISHI[base % 12];
  return { tenkan: tk, chishi: cs, gokyo: GOKYO[base % 10], inyo: INKYO[base % 10] };
}

function calcMonthPillar(year: number, month: number): Pillar {
  // 簡易計算：年の天干に基づく月柱
  const yearBase = (year - 4) % 10;
  const monthBase = (yearBase * 2 + month + 1) % 10;
  const chishiIndex = (month + 1) % 12;
  const tk = TENKAN[monthBase];
  const cs = CHISHI[chishiIndex];
  return { tenkan: tk, chishi: cs, gokyo: GOKYO[monthBase], inyo: INKYO[monthBase] };
}

function calcDayPillar(year: number, month: number, day: number): Pillar {
  // ユリウス日から日柱を計算
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const base = (jd - 11) % 60;
  const tkIndex = base % 10;
  const csIndex = base % 12;
  return { tenkan: TENKAN[tkIndex], chishi: CHISHI[csIndex], gokyo: GOKYO[tkIndex], inyo: INKYO[tkIndex] };
}

function calcHourPillar(dayTk: string, hour: number): Pillar {
  const chishiIndex = Math.floor((hour + 1) / 2) % 12;
  const dayTkIndex = TENKAN.indexOf(dayTk);
  const tkIndex = ((dayTkIndex % 5) * 2 + chishiIndex) % 10;
  const cs = CHISHI[chishiIndex];
  return { tenkan: TENKAN[tkIndex], chishi: cs, gokyo: GOKYO[tkIndex], inyo: INKYO[tkIndex] };
}

export function calcShichu(birthdate: string, birthHour?: number): Shichu {
  const [y, m, d] = birthdate.split("-").map(Number);
  const year = calcYearPillar(y);
  const month = calcMonthPillar(y, m);
  const day = calcDayPillar(y, m, d);
  const hour = birthHour !== undefined ? calcHourPillar(day.tenkan, birthHour) : null;
  return { year, month, day, hour };
}

export const GOKYO_DESCRIPTION: Record<string, { traits: string; color: string }> = {
  木: { traits: "成長・発展・柔軟性・向上心", color: "text-green-700" },
  火: { traits: "情熱・直感・積極性・カリスマ", color: "text-red-600" },
  土: { traits: "安定・誠実・粘り強さ・包容力", color: "text-yellow-700" },
  金: { traits: "決断力・完璧主義・正義感・鋭さ", color: "text-gray-500" },
  水: { traits: "知恵・柔軟性・コミュニケーション・適応力", color: "text-blue-600" },
};

export function dominantGokyo(shichu: Shichu): string {
  const count: Record<string, number> = { 木:0, 火:0, 土:0, 金:0, 水:0 };
  const pillars = [shichu.year, shichu.month, shichu.day, shichu.hour].filter(Boolean) as Pillar[];
  for (const p of pillars) {
    count[p.gokyo] = (count[p.gokyo] || 0) + 1;
    count[CHISHI_GOKYO[p.chishi]] = (count[CHISHI_GOKYO[p.chishi]] || 0) + 0.5;
  }
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}
