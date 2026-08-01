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

const COLORS = ["赤", "オレンジ", "黄色", "緑", "青", "紫", "ピンク", "白", "金", "銀", "水色", "紺"];
const ITEMS = ["花", "本", "音楽", "コーヒー", "水", "鏡", "時計", "手帳", "天然石", "星のモチーフ", "アロマ", "お守り", "ハンカチ", "観葉植物"];
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
  "笑顔がラッキーを呼び込む日。明るい気持ちで一日をスタートさせましょう。",
  "整理整頓が運気を上げます。身の回りを片付けると新しい風が入ります。",
  "小さな親切が大きな幸運となって返ってくる日です。",
  "自分を信じて決断すべき日。あなたの選択は間違っていません。",
  "リラックスが鍵。ゆったりと過ごすことで良いひらめきが訪れます。",
];

const LOVE_MESSAGES = [
  "気になる人への一言が関係を深めるかもしれません。",
  "パートナーとの対話を大切に。小さな気遣いが絆を育みます。",
  "新しい出会いのチャンスが訪れるかもしれません。オープンな心で。",
  "自分自身を愛することが、良い縁を引き寄せます。",
  "過去の恋愛から学んだことが、今の関係をより豊かにします。",
  "素直な気持ちを伝えることで、二人の距離が縮まります。",
  "笑顔と感謝の言葉が、恋愛運を大きく高めてくれます。",
];

const WORK_MESSAGES = [
  "集中力が高まる日。重要な作業に取り組むのに最適です。",
  "チームワークで大きな成果が生まれます。協力を惜しまずに。",
  "新しいアイデアが評価される日。積極的に発信しましょう。",
  "丁寧さと誠実さが信頼を生む日。基本を大切にしましょう。",
  "計画を見直す好機。長期的な視点で物事を考えて。",
  "苦手なことに向き合うと、思わぬ成長が得られる日です。",
  "周囲へのひと声が、仕事をスムーズに進める鍵になります。",
];

const MONEY_MESSAGES = [
  "無駄遣いを見直すことで、金運が安定します。",
  "臨時収入の予感。アンテナを張っておきましょう。",
  "自己投資が将来の豊かさにつながる日です。",
  "お財布の整理が金運アップのきっかけに。",
  "人への贈り物やご馳走が、巡り巡って幸運を呼びます。",
  "衝動買いは控えめに。計画的な買い物が吉です。",
  "節約と感謝の気持ちが、お金の流れを整えます。",
];

const HEALTH_MESSAGES = [
  "十分な睡眠を心がけて。体を休めることが運気を高めます。",
  "軽い運動やストレッチで、心も体もリフレッシュ。",
  "水分をしっかり摂って、体の巡りを整えましょう。",
  "深呼吸でリラックス。心の余裕が健康運を支えます。",
  "旬の食材を取り入れると、活力が湧いてきます。",
  "目の疲れに注意。適度な休憩を挟みましょう。",
  "自然に触れることで、心身のバランスが整います。",
];

const LUCKY_ACTIONS = [
  "朝に窓を開けて新鮮な空気を取り込む",
  "行ったことのないお店に立ち寄ってみる",
  "大切な人にありがとうを伝える",
  "机の上を5分だけ片付ける",
  "いつもより少し早く起きて余裕を持つ",
  "好きな音楽を聴いて気分を上げる",
  "温かい飲み物でひと息つく",
  "空を見上げて深呼吸する",
  "鏡の前で笑顔を作ってみる",
  "小さな目標をひとつ決めて実行する",
];

const STARS = [1, 2, 3, 4, 5];

// 総合運の星の数に応じたコメント
function overallComment(stars: number): string {
  switch (stars) {
    case 5: return "絶好調！何をやってもうまくいく最高の一日になりそうです。積極的に動きましょう。";
    case 4: return "好調な一日。前向きな行動が良い結果を引き寄せます。";
    case 3: return "穏やかで安定した一日。自分のペースを大切に過ごしましょう。";
    case 2: return "少し慎重に過ごしたい日。無理をせず、丁寧に行動することが吉です。";
    default: return "焦らずゆっくり過ごす日。休息を取り、次のチャンスに備えましょう。";
  }
}

export interface DailyFortune {
  overall: number;
  love: number;
  work: number;
  money: number;
  health: number;
  overallComment: string;
  message: string;
  loveMessage: string;
  workMessage: string;
  moneyMessage: string;
  healthMessage: string;
  luckyAction: string;
  luckyColor: string;
  luckyItem: string;
  luckyDirection: string;
  luckyNumber: number;
  lifePathNumber: number;
}

export function getDailyFortune(birthdate: string): DailyFortune {
  const s = seed(birthdate);
  const lifePathNumber = calcLifePathNumber(birthdate);
  const overall = pick(STARS, s);
  return {
    overall,
    love: pick(STARS, s + 1),
    work: pick(STARS, s + 2),
    money: pick(STARS, s + 3),
    health: pick(STARS, s + 4),
    overallComment: overallComment(overall),
    message: pick(MESSAGES, s + 5),
    loveMessage: pick(LOVE_MESSAGES, s + 6),
    workMessage: pick(WORK_MESSAGES, s + 7),
    moneyMessage: pick(MONEY_MESSAGES, s + 11),
    healthMessage: pick(HEALTH_MESSAGES, s + 12),
    luckyAction: pick(LUCKY_ACTIONS, s + 13),
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
