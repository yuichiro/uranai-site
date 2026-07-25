// エンジェルナンバー相性診断
// 各エンジェルナンバーが持つ「エネルギー数（1-9）」をもとに相性を算出します。

export interface AngelCompatOption {
  number: string;
  energy: number;
  keyword: string;
  color: string;
}

// 診断で選べるエンジェルナンバーと、そのエネルギー・キーワード
export const ANGEL_COMPAT_OPTIONS: AngelCompatOption[] = [
  { number: "111", energy: 1, keyword: "始まり・創造", color: "from-yellow-400 to-orange-400" },
  { number: "222", energy: 2, keyword: "調和・信頼", color: "from-pink-400 to-rose-400" },
  { number: "333", energy: 3, keyword: "表現・喜び", color: "from-purple-400 to-violet-400" },
  { number: "444", energy: 4, keyword: "安定・保護", color: "from-blue-400 to-indigo-400" },
  { number: "555", energy: 5, keyword: "変化・自由", color: "from-green-400 to-teal-400" },
  { number: "666", energy: 6, keyword: "愛・調和", color: "from-emerald-400 to-cyan-400" },
  { number: "777", energy: 7, keyword: "幸運・探求", color: "from-amber-400 to-yellow-400" },
  { number: "888", energy: 8, keyword: "豊かさ・成功", color: "from-yellow-500 to-amber-500" },
  { number: "999", energy: 9, keyword: "完結・博愛", color: "from-violet-400 to-purple-500" },
  { number: "1111", energy: 1, keyword: "覚醒・使命", color: "from-rose-400 to-pink-500" },
];

// エネルギー数（1-9）同士の相性スコア
const ENERGY_COMPAT: Record<string, number> = {
  "1-1": 82, "1-2": 70, "1-3": 88, "1-4": 62, "1-5": 85, "1-6": 66, "1-7": 72, "1-8": 90, "1-9": 76,
  "2-2": 84, "2-3": 74, "2-4": 86, "2-5": 64, "2-6": 92, "2-7": 70, "2-8": 62, "2-9": 86,
  "3-3": 78, "3-4": 64, "3-5": 90, "3-6": 80, "3-7": 82, "3-8": 72, "3-9": 88,
  "4-4": 86, "4-5": 60, "4-6": 82, "4-7": 76, "4-8": 92, "4-9": 66,
  "5-5": 74, "5-6": 76, "5-7": 86, "5-8": 66, "5-9": 82,
  "6-6": 92, "6-7": 72, "6-8": 78, "6-9": 84,
  "7-7": 82, "7-8": 72, "7-9": 88,
  "8-8": 80, "8-9": 72,
  "9-9": 86,
};

function energyCompat(a: number, b: number): number {
  const key = a <= b ? `${a}-${b}` : `${b}-${a}`;
  return ENERGY_COMPAT[key] ?? 72;
}

const LEVEL_MESSAGES: Record<string, { title: string; message: string }> = {
  high: {
    title: "最高の相性 ✨",
    message: "二つのエンジェルナンバーは天使も祝福する素晴らしい組み合わせ。お互いのエネルギーが響き合い、一緒にいるほど運気が高まっていく関係です。",
  },
  good: {
    title: "良好な相性 💫",
    message: "二人のエネルギーはよく調和しています。違いを認め合いながら、お互いを高め合える良い関係を築けるでしょう。",
  },
  normal: {
    title: "学び合う相性 🌙",
    message: "異なるエネルギーを持つ二人。最初は違いを感じても、理解し合うことでお互いを成長させる関係になります。",
  },
  low: {
    title: "成長を促す相性 🌱",
    message: "二人のエネルギーは対照的です。だからこそ、相手はあなたにないものを教えてくれる存在。歩み寄る努力が深い絆を生みます。",
  },
};

export interface AngelCompatResult {
  a: AngelCompatOption;
  b: AngelCompatOption;
  score: number;
  level: "high" | "good" | "normal" | "low";
  title: string;
  message: string;
  advice: string;
}

function buildAdvice(a: AngelCompatOption, b: AngelCompatOption): string {
  return `${a.number}が持つ「${a.keyword}」のエネルギーと、${b.number}が持つ「${b.keyword}」のエネルギーが出会う組み合わせです。それぞれの数字が示す天使のメッセージを意識することで、二人の関係はより良い方向へ導かれます。`;
}

export function calcAngelCompat(numA: string, numB: string): AngelCompatResult | null {
  const a = ANGEL_COMPAT_OPTIONS.find((o) => o.number === numA);
  const b = ANGEL_COMPAT_OPTIONS.find((o) => o.number === numB);
  if (!a || !b) return null;

  const score = energyCompat(a.energy, b.energy);
  const level = score >= 85 ? "high" : score >= 75 ? "good" : score >= 65 ? "normal" : "low";

  return {
    a,
    b,
    score,
    level,
    ...LEVEL_MESSAGES[level],
    advice: buildAdvice(a, b),
  };
}
