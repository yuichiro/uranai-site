"use client";

import { useState } from "react";
import Link from "next/link";
import { ANGEL_COMPAT_OPTIONS, calcAngelCompat, type AngelCompatResult } from "@/lib/angelCompat";

export default function AngelCompatibilityPage() {
  const [numA, setNumA] = useState("");
  const [numB, setNumB] = useState("");
  const [result, setResult] = useState<AngelCompatResult | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!numA || !numB) return;
    setResult(calcAngelCompat(numA, numB));
  }

  const levelColor = {
    high: "from-rose-400 to-pink-500",
    good: "from-purple-400 to-indigo-500",
    normal: "from-blue-400 to-cyan-500",
    low: "from-emerald-400 to-teal-500",
  };

  const shareText = result
    ? `私たちのエンジェルナンバー相性は${result.score}点「${result.title}」でした✨（${result.a.number}×${result.b.number}）`
    : "";
  const shareUrl = "https://uranai.moritaro.com/angel-compatibility";
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent("エンジェルナンバー相性,星の導き")}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">👼💕</div>
        <h1 className="text-3xl font-bold text-pink-700">エンジェルナンバー相性診断</h1>
        <p className="text-gray-600">
          二人がよく見るエンジェルナンバーから、天使が示す二人の相性を診断します
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-700 text-center">あなたのエンジェルナンバー</h3>
            <select
              value={numA}
              onChange={(e) => setNumA(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">選択してください</option>
              {ANGEL_COMPAT_OPTIONS.map((o) => (
                <option key={o.number} value={o.number}>{o.number}（{o.keyword}）</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-700 text-center">相手のエンジェルナンバー</h3>
            <select
              value={numB}
              onChange={(e) => setNumB(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">選択してください</option>
              {ANGEL_COMPAT_OPTIONS.map((o) => (
                <option key={o.number} value={o.number}>{o.number}（{o.keyword}）</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center">
          ※ 繰り返し目にする数字がわからない方は、
          <Link href="/my-angel-number" className="text-pink-600 underline">あなた専用エンジェルナンバー診断</Link>
          で調べられます
        </p>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition-all"
        >
          相性を診断する 💕
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          {/* スコア */}
          <div className={`bg-gradient-to-br ${levelColor[result.level]} rounded-2xl p-8 text-white text-center space-y-3`}>
            <div className="flex items-center justify-center gap-3 text-lg font-medium opacity-90">
              <span className="text-2xl font-bold">{result.a.number}</span>
              <span>×</span>
              <span className="text-2xl font-bold">{result.b.number}</span>
            </div>
            <div className="text-7xl font-bold">{result.score}<span className="text-3xl">点</span></div>
            <div className="text-2xl font-bold">{result.title}</div>
            <p className="text-sm opacity-90 leading-relaxed max-w-md mx-auto">{result.message}</p>
          </div>

          {/* 二つの数字のエネルギー */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 text-center space-y-2">
              <div className={`bg-gradient-to-br ${result.a.color} text-white font-bold text-2xl rounded-lg w-20 h-20 flex items-center justify-center mx-auto`}>
                {result.a.number}
              </div>
              <div className="text-sm font-bold text-gray-700">{result.a.keyword}</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 text-center space-y-2">
              <div className={`bg-gradient-to-br ${result.b.color} text-white font-bold text-2xl rounded-lg w-20 h-20 flex items-center justify-center mx-auto`}>
                {result.b.number}
              </div>
              <div className="text-sm font-bold text-gray-700">{result.b.keyword}</div>
            </div>
          </div>

          {/* アドバイス */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-2">
            <h2 className="font-bold text-gray-800">💡 二人へのアドバイス</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{result.advice}</p>
          </div>

          {/* シェア */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center space-y-4">
            <p className="text-sm font-medium text-gray-700">結果をシェアする</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a
                href={twitterHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white font-bold px-6 py-2 rounded-full hover:opacity-80 transition-opacity"
              >
                𝕏 でシェア
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText(`${shareText} ${shareUrl}`)}
                className="bg-gray-100 text-gray-700 font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                🔗 コピー
              </button>
            </div>
          </div>
        </div>
      )}

      {!result && (
        <section className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">エンジェルナンバー相性診断とは？</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            エンジェルナンバーは、繰り返し目にする数字に込められた天使からのメッセージです。
            それぞれの数字が持つエネルギー（1〜9）には固有の意味があり、
            二人の数字を組み合わせることで、天使が示す二人の相性を読み解くことができます。
            恋人・夫婦・友人・気になる相手など、あらゆる関係の相性を調べてみましょう。
          </p>
        </section>
      )}
    </div>
  );
}
