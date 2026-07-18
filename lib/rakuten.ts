const AFFILIATE_ID = "04eb0e64.ab10cfa9.0b4347d8.9891efe1";

// 楽天市場の検索結果へのアフィリエイトリンクを生成
export function rakutenSearchLink(keyword: string): string {
  const searchUrl = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keyword)}/`;
  return `https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_ID}/?pc=${encodeURIComponent(searchUrl)}&link_type=text`;
}

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
