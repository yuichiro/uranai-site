import { COLUMNS } from "../page";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { rakutenSearchLink, CATEGORY_TO_BOOK, ANGEL_TO_STONE } from "@/lib/rakuten";

const SITE_URL = "https://uranai.moritaro.com";

// エンジェルナンバー記事のFAQ（組み合わせ検索の獲得 + FAQPage構造化データ用）
const FAQS: Record<string, { q: string; a: string }[]> = {
  "angel-111": [
    { q: "エンジェルナンバー111にはどんな意味がありますか？", a: "111は「新しい始まり」と「思考の現実化」を表すサインです。ポジティブな思考が現実になりやすい時期なので、望む未来を明確にイメージしましょう。" },
    { q: "111と1111の違いは何ですか？", a: "111は新しい始まりで行動を促すサイン、1111はさらに強力で覚醒や意識の変容、使命への気づきを促すサインです。" },
    { q: "111を見たときは何をすればいいですか？", a: "その瞬間に考えていたことをメモし、ポジティブなアファメーションを唱えて、直感に従って行動するのがおすすめです。" },
  ],
  "angel-222": [
    { q: "エンジェルナンバー222の意味は？", a: "222は「信頼・バランス・調和」の象徴です。今は種まきの時期で、すぐ結果が出なくても焦らず続けることが大切だと伝えています。" },
    { q: "222と2222の違いは？", a: "2222は222の意味がさらに強調されたサインで、「強く信じ続けなさい」という天使からの励ましです。" },
    { q: "222を繰り返し見るのはなぜ？", a: "あなたが正しい方向に進んでいることを天使が知らせ、忍耐と信頼を持ち続けるよう促しているサインです。" },
  ],
  "angel-333": [
    { q: "エンジェルナンバー333の意味は？", a: "333は「創造・表現・アセンデッドマスターの応援」を象徴します。あなたの才能や個性を自由に表現するよう後押しするサインです。" },
    { q: "333と3333の違いは？", a: "3333は333のエネルギーが強まったサインで、より大きなサポートと創造の力が働いていることを示します。" },
    { q: "333を見たときはどうすればいい？", a: "自分の気持ちに正直になり、創造的な活動や自己表現に一歩踏み出すと良いタイミングです。" },
  ],
  "angel-444": [
    { q: "エンジェルナンバー444の意味は？", a: "444は「天使の保護と安心」のサインです。あなたのそばに天使がいて、正しい道を進んでいることを伝えています。" },
    { q: "444と4444の違いは？", a: "4444は444の守護の力がさらに強まったサインで、より多くの天使に守られていることを示します。" },
    { q: "不安なときに444を見ても大丈夫？", a: "はい。444は「心配いらない、守られている」というメッセージなので、安心して前に進んで大丈夫です。" },
  ],
  "angel-555": [
    { q: "エンジェルナンバー555の意味は？", a: "555は「大きな変化の前兆」です。人生が良い方向へ転換するサインで、変化を恐れず受け入れることが幸運の鍵になります。" },
    { q: "555と5555の違いは？", a: "5555は555の変化のエネルギーがさらに強力になったサインで、人生の大きな転換点が近いことを示します。" },
    { q: "555を見たら何を準備すべき？", a: "新しい環境や機会に柔軟に対応できるよう、古い執着を手放し、前向きに変化を迎える準備をしましょう。" },
  ],
  "angel-666": [
    { q: "666は不吉・悪魔の数字ですか？", a: "いいえ。「666＝悪魔」は西洋の宗教的な言い伝えで、エンジェルナンバーの666は愛と調和を伝える天使のメッセージです。恐れる必要はありません。" },
    { q: "666と6666の違いは？", a: "6666は666の調和のエネルギーが増幅されたサインで、家族や身近な人との愛や絆を大切にするよう促しています。" },
    { q: "666を繰り返し見るのはなぜ？", a: "物質的なことへの執着や不安に意識が偏りすぎているサインです。心のバランスを取り戻すよう天使が促しています。" },
  ],
  "angel-777": [
    { q: "エンジェルナンバー777の意味は？", a: "777は「最高の幸運と正しい道」のサインです。あなたの努力や選択が正しく、幸運が訪れていることを示します。" },
    { q: "777と7777の違いは？", a: "7777は777の幸運のエネルギーがさらに高まったサインで、奇跡的な幸運や大きな成果を示します。" },
    { q: "777を見たときはどうすればいい？", a: "自信を持って今の道を進み続けましょう。直感やスピリチュアルな気づきを大切にすると良い時期です。" },
  ],
  "angel-888": [
    { q: "888を見るのは何の前兆ですか？", a: "888は「豊かさ・成功・収穫」の前兆です。これまでの努力が実り、金運やチャンスが訪れるうれしいサインです。" },
    { q: "888と8888の違いは？", a: "888は豊かさが流れ込む「入口」のサイン、8888は豊かさが本格的に「実現」するより大きなサインです。" },
    { q: "888を見たときはどうすればいい？", a: "豊かさを受け取る準備をし、今ある豊かさに感謝しながら、積極的にチャンスをつかみに行きましょう。" },
  ],
  "angel-999": [
    { q: "エンジェルナンバー999の意味は？", a: "999は「完結と新たな始まり」のサインです。ひとつのサイクルが終わり、次のステージへ進む時期であることを示します。" },
    { q: "999と9999の違いは？", a: "9999は999の完結のエネルギーが強まったサインで、大きな節目や人生の使命への移行を示します。" },
    { q: "999を見たときはどうすればいい？", a: "役目を終えたものを手放し、新しい始まりに向けて心の準備を整えると良いタイミングです。" },
  ],
  "angel-1111": [
    { q: "1111は警告のサインですか？", a: "基本はポジティブなサインです。ただ思考が現実化しやすい状態のため、「不安ではなく望む未来に意識を向けて」という注意喚起の意味を含むことがあります。" },
    { q: "なぜ11:11によく気づくのですか？", a: "潜在意識がそのタイミングで時計を見るよう促し、天使がメッセージを届けようとしているとされます。願いごとをするのも良いでしょう。" },
    { q: "1111とツインレイの関係は？", a: "1111はツインレイとの繋がりを示す代表的な数字で、出会いの前兆や関係が新しい段階へ進むサインとして現れます。" },
  ],
};

export function generateStaticParams() {
  return COLUMNS.map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const col = COLUMNS.find((c) => c.slug === slug);
  if (!col) return {};
  const url = `${SITE_URL}/column/${col.slug}`;
  return {
    title: col.title,
    description: col.excerpt,
    alternates: { canonical: url },
    openGraph: { title: col.title, description: col.excerpt, url, type: "article", siteName: "星の導き" },
    twitter: { card: "summary", title: col.title, description: col.excerpt },
  };
}

export default async function ColumnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const col = COLUMNS.find((c) => c.slug === slug);
  if (!col) notFound();

  const paragraphs = col.body.split("\n\n");

  // 同じカテゴリの関連コラム（内部リンク：順位向上と回遊のため）
  const related = COLUMNS.filter((c) => c.category === col.category && c.slug !== col.slug).slice(0, 6);

  // エンジェルナンバー記事 → 番号に対応する守護ストーン（アフィリ）
  const angelNum = col.slug.startsWith("angel-") ? col.slug.replace("angel-", "") : "";
  const stoneKeyword = ANGEL_TO_STONE[angelNum];

  // 構造化データ（JSON-LD）
  const pageUrl = `${SITE_URL}/column/${col.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: col.title,
    description: col.excerpt,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    inLanguage: "ja",
    articleSection: col.category,
    author: { "@type": "Organization", name: "星の導き" },
    publisher: { "@type": "Organization", name: "星の導き" },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/column` },
      { "@type": "ListItem", position: 3, name: col.title, item: pageUrl },
    ],
  };

  // FAQ（表示 + FAQPage構造化データ）
  const faqs = FAQS[col.slug];
  const faqLd = faqs && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <div className="space-y-3">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${col.color}`}>{col.category}</span>
        <h1 className="text-2xl font-bold text-gray-800 leading-tight">{col.title}</h1>
        <p className="text-gray-500 text-sm">{col.excerpt}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
        {paragraphs.map((p, i) => {
          if (p.startsWith("## ")) {
            return <h2 key={i} className="text-lg font-bold text-gray-800 mt-6 mb-2">{renderInline(p.replace("## ", ""))}</h2>;
          }
          if (p.startsWith("### ")) {
            return <h3 key={i} className="font-bold text-gray-700 mt-4 mb-1">{renderInline(p.replace("### ", ""))}</h3>;
          }
          if (p.startsWith("|")) {
            return renderTable(p, i);
          }
          if (p.startsWith("- ")) {
            return (
              <ul key={i} className="list-disc pl-5 space-y-1">
                {p.split("\n").map((line, j) => (
                  <li key={j}>{renderInline(line.replace(/^- /, ""))}</li>
                ))}
              </ul>
            );
          }
          if (/^\d+\. /.test(p)) {
            return (
              <ol key={i} className="list-decimal pl-5 space-y-1">
                {p.split("\n").map((line, j) => (
                  <li key={j}>{renderInline(line.replace(/^\d+\. /, ""))}</li>
                ))}
              </ol>
            );
          }
          return <p key={i}>{renderInline(p)}</p>;
        })}
      </div>

      {/* よくある質問（組み合わせ検索の獲得 + FAQPage構造化データ） */}
      {faqs && (
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">よくある質問</h2>
          {faqs.map((f, i) => (
            <div key={i} className="space-y-1">
              <h3 className="font-bold text-gray-700">Q. {f.q}</h3>
              <p className="text-gray-700 leading-relaxed">A. {f.a}</p>
            </div>
          ))}
        </div>
      )}

      {/* 守護ストーン（エンジェルナンバー記事のアフィリエイト） */}
      {stoneKeyword && (
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800">💎 このナンバーの守護ストーン</p>
            <span className="text-xs text-gray-400 border border-gray-300 rounded px-1.5 py-0.5">PR</span>
          </div>
          <p className="text-sm text-gray-600">エンジェルナンバー{angelNum}のエネルギーを高めるパワーストーンを楽天市場で探せます。</p>
          <a
            href={rakutenSearchLink(stoneKeyword)}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="block bg-pink-50 hover:bg-pink-100 rounded-xl p-4 transition-colors"
          >
            <div className="font-bold text-pink-800 text-sm">{stoneKeyword}を見る（楽天市場）→</div>
          </a>
        </div>
      )}

      {/* 関連書籍（アフィリエイト） */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800">📖 もっと深く学びたい方へ</p>
          <span className="text-xs text-gray-400 border border-gray-300 rounded px-1.5 py-0.5">PR</span>
        </div>
        <p className="text-sm text-gray-600">{col.category}をより詳しく学べる書籍を楽天ブックスで探せます。</p>
        <a
          href={rakutenSearchLink(CATEGORY_TO_BOOK[col.category] ?? "占い 本")}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="block bg-indigo-50 hover:bg-indigo-100 rounded-xl p-4 transition-colors"
        >
          <div className="font-bold text-indigo-800 text-sm">{col.category}の関連書籍を見る（楽天市場）→</div>
        </a>
      </div>

      <div className="flex justify-between">
        <Link href="/column" className="text-sm text-indigo-600 hover:underline">← コラム一覧に戻る</Link>
      </div>

      {/* 関連コラムへの内部リンク（順位向上・回遊のため） */}
      {related.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
          <p className="font-bold text-gray-800">🔗 関連するコラム</p>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/column/${r.slug}`} className="text-indigo-600 hover:underline text-sm">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 関連占いへの誘導 */}
      <div className="bg-indigo-50 rounded-2xl p-6 space-y-3">
        <p className="font-bold text-indigo-800">実際に占ってみる</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/numerology" className="bg-purple-600 text-white text-sm px-4 py-2 rounded-full hover:shadow-md transition-all">数秘術を試す</Link>
          <Link href="/shichu-suimei" className="bg-red-600 text-white text-sm px-4 py-2 rounded-full hover:shadow-md transition-all">四柱推命を試す</Link>
          <Link href="/angel-number" className="bg-pink-500 text-white text-sm px-4 py-2 rounded-full hover:shadow-md transition-all">エンジェルナンバーを調べる</Link>
        </div>
      </div>
    </div>
  );
}

// **太字** と [リンク](/url) を含むテキストをReactノードに変換
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // リンクとボールドを順に処理
  const tokenRe = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = tokenRe.exec(text)) !== null) {
    if (m.index > lastIndex) {
      nodes.push(text.slice(lastIndex, m.index));
    }
    if (m[1] !== undefined) {
      // リンク
      const href = m[2];
      const label = m[1];
      if (href.startsWith("/")) {
        nodes.push(<Link key={key++} href={href} className="text-indigo-600 underline hover:text-indigo-800">{label}</Link>);
      } else {
        nodes.push(<a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline hover:text-indigo-800">{label}</a>);
      }
    } else if (m[3] !== undefined) {
      // 太字
      nodes.push(<strong key={key++} className="font-bold text-gray-800">{m[3]}</strong>);
    }
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

// Markdownテーブルを描画（ヘッダー行 + 区切り行 + データ行）
function renderTable(block: string, key: number): React.ReactNode {
  const rows = block.split("\n").filter((r) => r.trim().startsWith("|"));
  if (rows.length < 2) return <p key={key}>{renderInline(block)}</p>;
  const parseCells = (row: string) =>
    row.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const header = parseCells(rows[0]);
  const dataRows = rows.slice(2).map(parseCells); // rows[1] は区切り行
  return (
    <div key={key} className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={i} className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-bold text-gray-700">{renderInline(h)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((cells, r) => (
            <tr key={r}>
              {cells.map((c, i) => (
                <td key={i} className="border border-gray-200 px-3 py-2">{renderInline(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
