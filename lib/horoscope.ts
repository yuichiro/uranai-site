export interface Sign {
  name: string;
  en: string;
  emoji: string;
  period: string;
  element: string;
  ruling: string;
  traits: string;
}

export const SIGNS: Sign[] = [
  { name: "牡羊座", en: "Aries", emoji: "♈", period: "3/21〜4/19", element: "火", ruling: "火星", traits: "積極的・行動力・リーダーシップ" },
  { name: "牡牛座", en: "Taurus", emoji: "♉", period: "4/20〜5/20", element: "土", ruling: "金星", traits: "忍耐力・安定志向・美的センス" },
  { name: "双子座", en: "Gemini", emoji: "♊", period: "5/21〜6/21", element: "風", ruling: "水星", traits: "知的好奇心・コミュニケーション・適応力" },
  { name: "蟹座", en: "Cancer", emoji: "♋", period: "6/22〜7/22", element: "水", ruling: "月", traits: "感受性・家族愛・直感力" },
  { name: "獅子座", en: "Leo", emoji: "♌", period: "7/23〜8/22", element: "火", ruling: "太陽", traits: "カリスマ・自信・創造力" },
  { name: "乙女座", en: "Virgo", emoji: "♍", period: "8/23〜9/22", element: "土", ruling: "水星", traits: "几帳面・分析力・奉仕精神" },
  { name: "天秤座", en: "Libra", emoji: "♎", period: "9/23〜10/23", element: "風", ruling: "金星", traits: "調和・美的感覚・公平性" },
  { name: "蠍座", en: "Scorpio", emoji: "♏", period: "10/24〜11/22", element: "水", ruling: "冥王星", traits: "情熱・洞察力・変革" },
  { name: "射手座", en: "Sagittarius", emoji: "♐", period: "11/23〜12/21", element: "火", ruling: "木星", traits: "自由・冒険心・楽観主義" },
  { name: "山羊座", en: "Capricorn", emoji: "♑", period: "12/22〜1/19", element: "土", ruling: "土星", traits: "責任感・忍耐力・現実主義" },
  { name: "水瓶座", en: "Aquarius", emoji: "♒", period: "1/20〜2/18", element: "風", ruling: "天王星", traits: "独自性・革新・人道主義" },
  { name: "魚座", en: "Pisces", emoji: "♓", period: "2/19〜3/20", element: "水", ruling: "海王星", traits: "直感・共感力・芸術的" },
];

const WEEKLY_FORTUNES = [
  { overall: 5, message: "今週は運気が最高潮に達します。新しいことへの挑戦が吉。積極的に行動することで大きな成果が得られます。", love: "運命的な出会いや関係の深化が期待できます。", work: "アイデアが評価され、昇進や新プロジェクトのチャンスが。", money: "臨時収入の可能性あり。投資も吉。" },
  { overall: 4, message: "エネルギーが高まる週。人間関係が充実し、協力者に恵まれます。チームで取り組むことで力が発揮できます。", love: "パートナーとの絆が深まります。素直な気持ちを伝えて。", work: "チームワークで大きな成果が出せます。", money: "計画的な出費を心がけると安定します。" },
  { overall: 4, message: "直感が冴える週。インスピレーションを大切にして行動すると良い結果につながります。", love: "新しい出会いのチャンスがあります。自分らしさを大切に。", work: "クリエイティブな仕事に向いた週。アイデアを積極的に発信して。", money: "予期せぬ出費に注意。備えを忘れずに。" },
  { overall: 3, message: "内省の週。じっくりと自分と向き合う時間を大切にしてください。焦らず着実に進むことが吉。", love: "自分の気持ちを整理する良い機会です。", work: "基礎固めに集中する週。急がずに丁寧に取り組んで。", money: "節約と貯蓄を意識する良いタイミング。" },
  { overall: 3, message: "変化の予感がある週。柔軟な対応が求められます。変化を恐れず受け入れることが大切です。", love: "関係に新しい風が吹きます。変化を楽しんで。", work: "環境の変化に適応する力が試されます。", money: "収支バランスを見直す機会。" },
  { overall: 5, message: "幸運の星が輝く週！長期間の努力が実を結びます。自信を持って前進してください。", love: "深い絆が生まれる特別な週。大切な人と過ごして。", work: "実力が認められ、大きなチャンスが訪れます。", money: "金運好調。思い切った行動が吉。" },
];

function getWeekSeed(signIndex: number): number {
  const now = new Date();
  const weekNum = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000));
  return (weekNum + signIndex * 7) % WEEKLY_FORTUNES.length;
}

export function getWeeklyFortune(signIndex: number) {
  return WEEKLY_FORTUNES[getWeekSeed(signIndex)];
}

export function getSignFromBirthdate(birthdate: string): number {
  const [, m, d] = birthdate.split("-").map(Number);
  const md = m * 100 + d;
  if (md >= 321 && md <= 419) return 0;
  if (md >= 420 && md <= 520) return 1;
  if (md >= 521 && md <= 621) return 2;
  if (md >= 622 && md <= 722) return 3;
  if (md >= 723 && md <= 822) return 4;
  if (md >= 823 && md <= 922) return 5;
  if (md >= 923 && md <= 1023) return 6;
  if (md >= 1024 && md <= 1122) return 7;
  if (md >= 1123 && md <= 1221) return 8;
  if (md >= 1222 || md <= 119) return 9;
  if (md >= 120 && md <= 218) return 10;
  return 11;
}
