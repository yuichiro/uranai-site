// AIパーソナライズ鑑定文の型。
// 生成: scripts/generate-fortunes.mjs（エンジェルナンバー別）/ scripts/generate-daily-fortunes.mjs（ライフパス別・日次）
// 読み込み: lib/serverData.ts（サーバー描画でHTMLに含める）

export interface AiReading {
  intro: string;
  love: string;
  work: string;
  money: string;
  health: string;
  action: string;
}

// 「今日の運勢」用: ライフパスナンバー別のAI鑑定文
export interface DailyFortuneText {
  overall: string;
  love: string;
  work: string;
  money: string;
  health: string;
  action: string;
}
