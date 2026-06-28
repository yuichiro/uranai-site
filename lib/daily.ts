import { calcLifePathNumber } from "./numerology";

// 日付と誕生数からシード値を生成
function seed(birthdate: string): number {
  const today = new Date().toISOString().slice(0, 10);
  const str = birthdate + today;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], s: number): T {
  return arr[s % arr.length];
}

const COLORS = ["赤", "オレンジ", "黄色", "緑", "青", "紫", "ピンク", "白", "金", "銀"];
const ITEMS = ["花", "本", "音楽", "コーヒー", "水", "鏡", "時計", "手帳", "石", "星"];
const DIRECTIONS = ["北", "南", "東", "西", "北東", "北西", "南東", "南西"];

const MESSAGES = [
  "今日はあなたの直感が冴えわたる日です。心の声に従って行動しましょう。",
  "人との出会いに恵まれる日。積極的にコミュニケーションを取ってみてください。",
  "じっくりと考えることで良い答えが見つかる日。焦らず丁寧に取り組みましょう。",
  "新しいことへの挑戦が吉。一歩踏み出す勇気が未来を開きます。",
  "感謝の気持ちを大切にする日。身近な人への思いやりが幸運を呼びます。",
  "クリエイティブなエネルギーが高まっています。アイデアをメモしておきましょう。",
  "安定と調和の日。無理をせず、自分のペースで過ごすことが大切です。",
  "過去を手放し、新しい流れに乗る準備をしましょう。変化は恵みです。",
  "学びと成長の日。新しい知識や情報があなたを豊かにします。",
  "愛情運が高まっています。大切な人との時間を丁寧に過ごしましょう。",
];

const LOVE_MESSAGES = [
  "気になる人への一言が関係を深めるかもしれません。",
  "パートナーとの対話を大切に。小さな気遣いが絆を育みます。",
  "新しい出会いのチャンスが訪れるかもしれません。オープンな心で。",
  "自分自身を愛することが、良い縁を引き寄せます。",
  "過去の恋愛から学んだことが、今の関係をより豊かにします。",
];

const WORK_MESSAGES = [
  "集中力が高まる日。重要な作業に取り組むのに最適です。",
  "チームワークで大きな成果が生まれます。協力を惜しまずに。",
  "新しいアイデアが評価される日。積極的に発信しましょう。",
  "丁寧さと誠実さが信頼を生む日。基本を大切にしましょう。",
  "計画を見直す好機。長期的な視点で物事を考えて。",
];

const STARS = [1, 2, 3, 4, 5];

export interface DailyFortune {
  overall: number;
  love: number;
  work: number;
  money: number;
  health: number;
  message: string;
  loveMessage: string;
  workMessage: string;
  luckyColor: string;
  luckyItem: string;
  luckyDirection: string;
  luckyNumber: number;
  lifePathNumber: number;
}

export function getDailyFortune(birthdate: string): DailyFortune {
  const s = seed(birthdate);
  const lifePathNumber = calcLifePathNumber(birthdate);
  return {
    overall: pick(STARS, s),
    love: pick(STARS, s + 1),
    work: pick(STARS, s + 2),
    money: pick(STARS, s + 3),
    health: pick(STARS, s + 4),
    message: pick(MESSAGES, s + 5),
    loveMessage: pick(LOVE_MESSAGES, s + 6),
    workMessage: pick(WORK_MESSAGES, s + 7),
    luckyColor: pick(COLORS, s + 8),
    luckyItem: pick(ITEMS, s + 9),
    luckyDirection: pick(DIRECTIONS, s + 10),
    luckyNumber: (s % 9) + 1,
    lifePathNumber,
  };
}

export function getJapaneseDate(): string {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
