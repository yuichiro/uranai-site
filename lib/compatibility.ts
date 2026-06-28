import { calcLifePathNumber } from "./numerology";
import { calcShichu } from "./shichu";

// 数秘術の相性スコア（1-9 × 1-9）
const NUMEROLOGY_COMPAT: Record<string, number> = {
  "1-1":75,"1-2":70,"1-3":85,"1-4":60,"1-5":80,"1-6":65,"1-7":70,"1-8":90,"1-9":75,
  "2-2":80,"2-3":75,"2-4":85,"2-5":65,"2-6":90,"2-7":70,"2-8":60,"2-9":85,
  "3-3":70,"3-4":65,"3-5":90,"3-6":75,"3-7":80,"3-8":70,"3-9":85,
  "4-4":85,"4-5":60,"4-6":80,"4-7":75,"4-8":90,"4-9":65,
  "5-5":70,"5-6":75,"5-7":85,"5-8":65,"5-9":80,
  "6-6":90,"6-7":70,"6-8":75,"6-9":80,
  "7-7":80,"7-8":70,"7-9":85,
  "8-8":75,"8-9":70,
  "9-9":85,
};

function getCompat(a: number, b: number): number {
  const key = a <= b ? `${a}-${b}` : `${b}-${a}`;
  return NUMEROLOGY_COMPAT[key] ?? 70;
}

// 五行の相性
const GOKYO_COMPAT: Record<string, number> = {
  "木-木":70,"木-火":90,"木-土":60,"木-金":40,"木-水":85,
  "火-火":75,"火-土":85,"火-金":50,"火-水":45,
  "土-土":80,"土-金":85,"土-水":60,
  "金-金":70,"金-水":85,
  "水-水":75,
};

function getGokyoCompat(a: string, b: string): number {
  const key = a <= b ? `${a}-${b}` : `${b}-${a}`;
  return GOKYO_COMPAT[key] ?? 65;
}

const COMPAT_MESSAGES: Record<string, { title: string; message: string }> = {
  high: {
    title: "最高の相性 ✨",
    message: "二人は非常に高い相性を持っています。お互いの長所を引き出し合い、一緒にいることで大きなエネルギーが生まれます。",
  },
  good: {
    title: "良好な相性 💫",
    message: "二人は良い相性です。お互いを理解し、補い合うことができます。コミュニケーションを大切にすることでさらに深い絆が生まれます。",
  },
  normal: {
    title: "普通の相性 🌙",
    message: "二人は普通の相性です。努力と理解によって良い関係を築くことができます。お互いの違いを尊重することが大切です。",
  },
  low: {
    title: "要努力の相性 🌱",
    message: "二人の相性は挑戦的です。しかし、違いを乗り越えることで深い絆が生まれることもあります。相手を理解する努力が鍵です。",
  },
};

export interface CompatibilityResult {
  numerologyScore: number;
  gokyoScore: number;
  totalScore: number;
  personA: { lifePathNumber: number; gokyo: string };
  personB: { lifePathNumber: number; gokyo: string };
  level: "high" | "good" | "normal" | "low";
  title: string;
  message: string;
}

export function calcCompatibility(birthdateA: string, birthdateB: string): CompatibilityResult {
  const lpA = calcLifePathNumber(birthdateA);
  const lpB = calcLifePathNumber(birthdateB);
  const shichuA = calcShichu(birthdateA);
  const shichuB = calcShichu(birthdateB);
  const gokyoA = shichuA.day.gokyo;
  const gokyoB = shichuB.day.gokyo;

  const numerologyScore = getCompat(lpA % 9 || 9, lpB % 9 || 9);
  const gokyoScore = getGokyoCompat(gokyoA, gokyoB);
  const totalScore = Math.round(numerologyScore * 0.5 + gokyoScore * 0.5);

  const level = totalScore >= 80 ? "high" : totalScore >= 70 ? "good" : totalScore >= 55 ? "normal" : "low";

  return {
    numerologyScore,
    gokyoScore,
    totalScore,
    personA: { lifePathNumber: lpA, gokyo: gokyoA },
    personB: { lifePathNumber: lpB, gokyo: gokyoB },
    level,
    ...COMPAT_MESSAGES[level],
  };
}
