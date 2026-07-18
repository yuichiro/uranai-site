import { COLUMNS } from "../page";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { rakutenSearchLink, CATEGORY_TO_BOOK } from "@/lib/rakuten";

export function generateStaticParams() {
  return COLUMNS.map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const col = COLUMNS.find((c) => c.slug === slug);
  if (!col) return {};
  return { title: `${col.title}｜星の導き`, description: col.excerpt };
}

export default async function ColumnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const col = COLUMNS.find((c) => c.slug === slug);
  if (!col) notFound();

  const paragraphs = col.body.split("\n\n");

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${col.color}`}>{col.category}</span>
        <h1 className="text-2xl font-bold text-gray-800 leading-tight">{col.title}</h1>
        <p className="text-gray-500 text-sm">{col.excerpt}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
        {paragraphs.map((p, i) => {
          if (p.startsWith("## ")) {
            return <h2 key={i} className="text-lg font-bold text-gray-800 mt-6 mb-2">{p.replace("## ", "")}</h2>;
          }
          if (p.startsWith("### ")) {
            return <h3 key={i} className="font-bold text-gray-700 mt-4 mb-1">{p.replace("### ", "")}</h3>;
          }
          if (p.startsWith("- ")) {
            return (
              <ul key={i} className="list-disc pl-5 space-y-1">
                {p.split("\n").map((line, j) => (
                  <li key={j}>{line.replace(/^- \*\*(.+?)\*\*：/, "").replace(/^- /, "").replace(/\*\*(.+?)\*\*/g, "$1")}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{p.replace(/\*\*(.+?)\*\*/g, "$1")}</p>;
        })}
      </div>

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
