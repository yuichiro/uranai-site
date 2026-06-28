"use client";

import { useState } from "react";
import { calcCompatibility, type CompatibilityResult } from "@/lib/compatibility";

export default function CompatibilityPage() {
  const [bdA, setBdA] = useState("");
  const [bdB, setBdB] = useState("");
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!bdA || !bdB) return;
    setResult(calcCompatibility(bdA, bdB));
  }

  const levelColor = {
    high: "from-rose-400 to-pink-500",
    good: "from-purple-400 to-indigo-500",
    normal: "from-blue-400 to-cyan-500",
    low: "from-gray-400 to-slate-500",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">💑</div>
        <h1 className="text-3xl font-bold text-rose-700">相性占い</h1>
        <p className="text-gray-600">二人の生年月日から数秘術と四柱推命で相性を診断します</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-center">あなた</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">お名前（任意）</label>
              <input
                type="text"
                placeholder="例：太郎"
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">生年月日 <span className="text-red-500">*</span></label>
              <input
                type="date"
                required
                value={bdA}
                onChange={(e) => setBdA(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700 text-center">相手</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">お名前（任意）</label>
              <input
                type="text"
                placeholder="例：花子"
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">生年月日 <span className="text-red-500">*</span></label>
              <input
                type="date"
                required
                value={bdB}
                onChange={(e) => setBdB(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition-all"
        >
          相性を診断する 💑
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          {/* 総合スコア */}
          <div className={`bg-gradient-to-br ${levelColor[result.level]} rounded-2xl p-8 text-white text-center space-y-3`}>
            <div className="text-lg font-medium opacity-90">
              {nameA || "あなた"} × {nameB || "相手"}
            </div>
            <div className="text-7xl font-bold">{result.totalScore}<span className="text-3xl">点</span></div>
            <div className="text-2xl font-bold">{result.title}</div>
            <p className="text-sm opacity-90 leading-relaxed max-w-md mx-auto">{result.message}</p>
          </div>

          {/* 詳細スコア */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="font-bold text-gray-800">詳細診断</h2>
            <div className="space-y-3">
              <ScoreBar label="数秘術の相性" score={result.numerologyScore} color="bg-purple-400" />
              <ScoreBar label="五行（四柱推命）の相性" score={result.gokyoScore} color="bg-red-400" />
            </div>
          </div>

          {/* 個人情報 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 space-y-2">
              <div className="font-bold text-gray-700">{nameA || "あなた"}</div>
              <div className="text-sm text-gray-600">ライフパスナンバー：<span className="font-bold text-purple-600">{result.personA.lifePathNumber}</span></div>
              <div className="text-sm text-gray-600">日柱五行：<span className="font-bold text-red-600">{result.personA.gokyo}行</span></div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-5 space-y-2">
              <div className="font-bold text-gray-700">{nameB || "相手"}</div>
              <div className="text-sm text-gray-600">ライフパスナンバー：<span className="font-bold text-purple-600">{result.personB.lifePathNumber}</span></div>
              <div className="text-sm text-gray-600">日柱五行：<span className="font-bold text-red-600">{result.personB.gokyo}行</span></div>
            </div>
          </div>
        </div>
      )}

      {!result && (
        <section className="bg-white rounded-2xl shadow-md p-8 space-y-3">
          <h2 className="text-lg font-bold text-gray-800">相性占いとは？</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            数秘術のライフパスナンバーと四柱推命の五行を組み合わせて、二人の相性を多角的に診断します。
            恋人・友人・家族など、あらゆる関係の相性を調べることができます。
          </p>
        </section>
      )}
    </div>
  );
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-bold text-gray-800">{score}点</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div className={`${color} h-3 rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
