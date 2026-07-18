const AFFILIATE_ID = "04eb0e64.ab10cfa9.0b4347d8.9891efe1";

// 楽天市場の検索結果へのアフィリエイトリンクを生成
export function rakutenSearchLink(keyword: string): string {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`;
  return `https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_ID}/?pc=${encodeURIComponent(searchUrl)}&link_type=text`;
}

// コラムカテゴリ → 関連書籍の検索キーワード
export const CATEGORY_TO_BOOK: Record<string, string> = {
  数秘術: "数秘術 入門 本",
  四柱推命: "四柱推命 入門 本",
  エンジェルナンバー: "エンジェルナンバー 本",
  活用方法: "占い 入門 本",
};

// エンジェルナンバー → 守護ストーン検索キーワード
export const ANGEL_TO_STONE: Record<string, string> = {
  "111": "ルチルクォーツ ブレスレット",
  "222": "ムーンストーン ブレスレット",
  "333": "シトリン ブレスレット",
  "444": "スモーキークォーツ ブレスレット",
  "555": "ターコイズ ブレスレット",
  "666": "ローズクォーツ ブレスレット",
  "777": "ラピスラズリ ブレスレット",
  "888": "タイガーアイ ブレスレット",
  "999": "アメジスト ブレスレット",
  "1111": "水晶 ブレスレット",
  "1212": "アクアマリン ブレスレット",
  "2222": "翡翠 ブレスレット",
};

// ラッキーカラー → パワーストーン検索キーワード
export const COLOR_TO_STONE: Record<string, string> = {
  赤: "レッドジャスパー ブレスレット",
  オレンジ: "カーネリアン ブレスレット",
  黄色: "シトリン ブレスレット",
  緑: "アベンチュリン ブレスレット",
  青: "ラピスラズリ ブレスレット",
  紫: "アメジスト ブレスレット",
  ピンク: "ローズクォーツ ブレスレット",
  白: "水晶 ブレスレット",
  金: "ルチルクォーツ ブレスレット",
  銀: "ヘマタイト ブレスレット",
};
