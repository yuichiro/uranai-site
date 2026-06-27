// 数字を1桁になるまで足し合わせる（11, 22はマスターナンバーとして保持）
export function reduceNumber(n: number, keepMaster = true): number {
  if (keepMaster && (n === 11 || n === 22 || n === 33)) return n;
  if (n < 10) return n;
  const sum = String(n).split("").reduce((acc, d) => acc + Number(d), 0);
  return reduceNumber(sum, keepMaster);
}

// 生年月日からライフパスナンバーを算出
export function calcLifePathNumber(birthdate: string): number {
  // YYYY-MM-DD
  const digits = birthdate.replace(/-/g, "").split("").map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceNumber(sum);
}

// 名前からルビ（ひらがな）を数値に変換して表現数を算出
const KANA_MAP: Record<string, number> = {
  あ:1,い:1,う:1,え:1,お:1,
  か:2,き:2,く:2,け:2,こ:2,
  さ:3,し:3,す:3,せ:3,そ:3,
  た:4,ち:4,つ:4,て:4,と:4,
  な:5,に:5,ぬ:5,ね:5,の:5,
  は:6,ひ:6,ふ:6,へ:6,ほ:6,
  ま:7,み:7,む:7,め:7,も:7,
  や:8,ゆ:8,よ:8,
  ら:9,り:9,る:9,れ:9,ろ:9,
  わ:1,ゐ:1,ゑ:1,を:6,ん:5,
  // 濁音・半濁音は清音と同じ
  が:2,ぎ:2,ぐ:2,げ:2,ご:2,
  ざ:3,じ:3,ず:3,ぜ:3,ぞ:3,
  だ:4,ぢ:4,づ:4,で:4,ど:4,
  ば:6,び:6,ぶ:6,べ:6,ぼ:6,
  ぱ:6,ぴ:6,ぷ:6,ぺ:6,ぽ:6,
  // 小文字は無視
  ぁ:1,ぃ:1,ぅ:1,ぇ:1,ぉ:1,
  っ:4,ゃ:8,ゅ:8,ょ:8,
};

export function calcExpressionNumber(kana: string): number {
  const values = kana.split("").map((c) => KANA_MAP[c] ?? 0);
  const sum = values.reduce((a, b) => a + b, 0);
  return reduceNumber(sum);
}

// ソウルナンバー（母音のみ）
const VOWELS = new Set(["あ","い","う","え","お","ぁ","ぃ","ぅ","ぇ","ぉ"]);
export function calcSoulNumber(kana: string): number {
  const sum = kana.split("").reduce((a, c) => a + (VOWELS.has(c) ? (KANA_MAP[c] ?? 0) : 0), 0);
  return reduceNumber(sum);
}

// 各数字の意味
export const NUMBER_MEANINGS: Record<number, { keyword: string; description: string }> = {
  1: { keyword: "リーダーシップ・独立", description: "強い意志と開拓精神を持つ先駆者。自分の道を切り開く力があります。" },
  2: { keyword: "協調・感受性", description: "繊細な感受性と協調性を持ち、人との絆を大切にする調停者。" },
  3: { keyword: "創造・表現", description: "豊かな創造力と表現力の持ち主。コミュニケーションで人を魅了します。" },
  4: { keyword: "安定・努力", description: "誠実さと粘り強さで着実に目標を達成する実務家。" },
  5: { keyword: "自由・変化", description: "変化と冒険を愛し、自由な発想で多様な経験を求めます。" },
  6: { keyword: "愛情・責任", description: "深い愛情と責任感で周囲を守る、家族や地域のための人。" },
  7: { keyword: "探求・内省", description: "真理を求める探求者。深い洞察力と精神性を持ちます。" },
  8: { keyword: "達成・豊かさ", description: "物質的な成功と権力を引き寄せる、エネルギッシュな実業家。" },
  9: { keyword: "博愛・完成", description: "人類愛を持ち、奉仕の精神で社会に貢献する完成者。" },
  11: { keyword: "直感・啓示（マスターナンバー）", description: "強い直感力と霊的な感受性を持つマスターナンバー。" },
  22: { keyword: "大きな夢・実現（マスターナンバー）", description: "大きなビジョンを現実化できるマスタービルダー。" },
  33: { keyword: "奉仕・マスター教師（マスターナンバー）", description: "無条件の愛で世界を導くマスターティーチャー。" },
};
