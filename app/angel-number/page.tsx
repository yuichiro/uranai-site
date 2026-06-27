"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import { ANGEL_NUMBERS, findAngelNumber, type AngelNumber } from "@/lib/angel";

export default function AngelNumberPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<AngelNumber | null | "notfound">(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = findAngelNumber(query);
    setResult(found ?? "notfound");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">👼</div>
        <h1 className="text-3xl font-bold text-pink-700">エンジェルナンバー</h1>
        <p className="text-gray-600">繰り返し目にする数字に込められた天使のメッセージを調べましょう</p>
      </div>

      <AdBanner format="horizontal" />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-4">
        <label className="block text-sm font-medium text-gray-700">気になる数字を入力</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="例：111, 444, 1111"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-6 py-2 rounded-full hover:shadow-lg transition-all"
          >
            調べる
          </button>
        </div>
      </form>

      {result === "notfound" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center text-yellow-800">
          <p className="font-medium">その数字のデータは現在準備中です</p>
          <p className="text-sm mt-1">下のリストから近い数字を参考にしてみてください</p>
        </div>
      )}

      {result && result !== "notfound" && (
        <div className="space-y-4">
          <AdBanner format="horizontal" />
          <AngelCard angel={result} />
          <AdBanner format="horizontal" />
        </div>
      )}

      {/* 一覧 */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">エンジェルナンバー一覧</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {ANGEL_NUMBERS.map((a) => (
            <button
              key={a.number}
              onClick={() => { setQuery(a.number); setResult(a); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-left bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4"
            >
              <div className={`bg-gradient-to-br ${a.color} text-white font-bold text-lg rounded-lg w-16 h-16 flex items-center justify-center shrink-0`}>
                {a.number}
              </div>
              <div>
                <div className="font-medium text-gray-800">{a.title}</div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{a.message}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function AngelCard({ angel }: { angel: AngelNumber }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className={`bg-gradient-to-r ${angel.color} p-6 text-white text-center`}>
        <div className="text-5xl font-bold">{angel.number}</div>
        <div className="text-xl font-bold mt-2">{angel.title}</div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-gray-700 leading-relaxed">{angel.message}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-pink-50 rounded-xl p-4">
            <div className="text-xs font-bold text-pink-600 mb-1">💕 恋愛・人間関係</div>
            <p className="text-sm text-gray-700">{angel.love}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="text-xs font-bold text-blue-600 mb-1">💼 仕事・目標</div>
            <p className="text-sm text-gray-700">{angel.work}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
