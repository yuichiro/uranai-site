import { ANGEL_NUMBERS, type AngelNumber } from "./angel";

// その日の日付から決まる「今日のエンジェルナンバー」
// 全ての訪問者に同じ数字が表示され、毎日変わります。
function dateSeed(y: number, m: number, d: number): number {
  const key = `${y}-${m}-${d}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// その日の一言メッセージ（ナンバーとは別に日替わりで添える）
const DAILY_HINTS = [
  "この数字を意識して過ごすと、天使からのサインに気づきやすくなります。",
  "今日は直感を信じて行動してみましょう。",
  "ふと目にした数字やしるしを大切にしてください。",
  "感謝の気持ちを持つことで、良い流れが巡ってきます。",
  "焦らず、自分のペースを大切に過ごしましょう。",
  "身近な人への思いやりが、今日の運を開きます。",
  "新しい一歩を踏み出すのに良い日です。",
];

export interface DailyAngel {
  angel: AngelNumber;
  hint: string;
  dateLabel: string;
}

// 暦日（年・月・日）から「今日のエンジェルナンバー」を決める。サーバー描画では日本時間の暦日を渡す。
export function getDailyAngelFor(y: number, m: number, d: number): DailyAngel {
  const s = dateSeed(y, m, d);
  const angel = ANGEL_NUMBERS[s % ANGEL_NUMBERS.length];
  const hint = DAILY_HINTS[s % DAILY_HINTS.length];
  return { angel, hint, dateLabel: `${y}年${m}月${d}日` };
}

export function getDailyAngel(date: Date = new Date()): DailyAngel {
  return getDailyAngelFor(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
