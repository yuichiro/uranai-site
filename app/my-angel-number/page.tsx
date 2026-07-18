"use client";

import { useState } from "react";
import Link from "next/link";
import { calcLifePathNumber } from "@/lib/numerology";
import { myAngelNumber, type AngelNumber } from "@/lib/angel";

interface Result {
  lifePath: number;
  angel: AngelNumber;
}

export default function MyAngelNumberPage() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthdate) return;
    const lifePath = calcLifePathNumber(birthdate);
    const angel = myAngelNumber(lifePath);
    if (angel) setResult({ lifePath, angel });
  }

  const shareText = result
    ? `私のエンジェルナンバーは「${result.angel.number}」（${result.angel.title}）でした✨ あなたの数字も調べてみて！`
    : "";
  const shareUrl = "https://uranai.moritaro.com/my-angel-number";
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent("エンジェルナンバー,星の導き")}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">🕊️</div>
        <h1 className="text-3xl font-bold text-pink-700">あなた専用エンジェルナンバー診断</h1>
        <p className="text-gray-600">
          生年月日から、あなたが生まれ持った「守護エンジェルナンバー」を算出します
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">生年月日</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition-all"
        >
          私のエンジェルナンバーを調べる 🕊️
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className={`bg-gradient-to-r ${result.angel.color} p-8 text-white text-center space-y-2`}>
              <div className="text-sm opacity-90">あなたの守護エンジェルナンバー</div>
              <div className="text-6xl font-bold">{result.angel.number}</div>
              <div className="text-xl font-bold">{result.angel.title}</div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">{result.angel.message}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="text-xs font-bold text-pink-600 mb-1">💕 恋愛・人間関係</div>
                  <p className="text-sm text-gray-700">{result.angel.love}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-xs font-bold text-blue-600 mb-1">💼 仕事・目標</div>
                  <p className="text-sm text-gray-700">{result.angel.work}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                ※ ライフパスナンバー{result.lifePath}に対応するエンジェルナンバーです。この数字を日常で見かけたら、天使からの特別なメッセージと受け取ってください。
              </p>
            </div>
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

          {["111", "222", "333", "444", "555", "666", "777", "888", "999", "1111"].includes(result.angel.number) && (
            <div className="text-center">
              <Link href={`/column/angel-${result.angel.number}`} className="text-sm text-indigo-600 hover:underline">
                {result.angel.number}の詳しい意味を読む →
              </Link>
            </div>
          )}
        </div>
      )}

      {!result && (
        <section className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">守護エンジェルナンバーとは？</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            エンジェルナンバーは通常「ふと目にする数字」からメッセージを読み取りますが、
            数秘術のライフパスナンバーと組み合わせることで、あなたが生まれながらに持つ
            「守護エンジェルナンバー」を導き出せます。
            この数字はあなたの人生のテーマと共鳴する特別な数字。
            日常でこの数字を見かけたときは、天使があなたに強く語りかけているサインです。
          </p>
        </section>
      )}
    </div>
  );
}
