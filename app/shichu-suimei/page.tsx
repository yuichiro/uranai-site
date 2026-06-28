"use client";

import { useState } from "react";
import { calcShichu, dominantGokyo, GOKYO_DESCRIPTION, type Pillar, type Shichu } from "@/lib/shichu";

export default function ShichuPage() {
  const [birthdate, setBirthdate] = useState("");
  const [birthHour, setBirthHour] = useState("");
  const [result, setResult] = useState<Shichu | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthdate) return;
    const hour = birthHour !== "" ? Number(birthHour) : undefined;
    setResult(calcShichu(birthdate, hour));
  }

  const dominant = result ? dominantGokyo(result) : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">🏮</div>
        <h1 className="text-3xl font-bold text-red-800">四柱推命</h1>
        <p className="text-gray-600">生年月日時から命式を算出し、あなたの本質を読み解きます</p>
      </div>


      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">生年月日</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            生まれた時間（任意）
          </label>
          <select
            value={birthHour}
            onChange={(e) => setBirthHour(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">不明</option>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>{i}時台</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">時柱は生まれた時間から算出されます。不明の場合は三柱で鑑定します。</p>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 rounded-full hover:shadow-lg transition-all"
        >
          命式を算出する 🏮
        </button>
      </form>

      {result && (
        <div className="space-y-6">

          {/* 命式表 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">命式</h2>
            <div className={`grid ${result.hour ? "grid-cols-4" : "grid-cols-3"} gap-3`}>
              {result.hour && <PillarCard label="時柱" pillar={result.hour} />}
              <PillarCard label="日柱" pillar={result.day} highlight />
              <PillarCard label="月柱" pillar={result.month} />
              <PillarCard label="年柱" pillar={result.year} />
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">※ 日柱はあなた自身を表す最重要の柱です</p>
          </div>

          {/* 五行バランス */}
          {dominant && (
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
              <h2 className="text-lg font-bold text-gray-800">あなたの主要五行：<span className={GOKYO_DESCRIPTION[dominant].color}>{dominant}行</span></h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-medium">特性：</span>{GOKYO_DESCRIPTION[dominant].traits}
              </p>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {Object.entries(GOKYO_DESCRIPTION).map(([g, v]) => (
                  <div key={g} className={`text-center p-2 rounded-lg border-2 ${g === dominant ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
                    <div className={`font-bold text-lg ${v.color}`}>{g}</div>
                    <div className="text-xs text-gray-500">行</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {!result && (
        <section className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">四柱推命とは？</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            四柱推命は中国発祥の東洋占術で、生まれた年・月・日・時刻の四つの「柱」から
            命式を算出し、個人の性格や運命を読み解きます。
            天干・地支・五行のバランスがあなたの本質と運勢を映し出します。
          </p>
        </section>
      )}
    </div>
  );
}

function PillarCard({ label, pillar, highlight = false }: { label: string; pillar: Pillar; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border-2 p-3 text-center space-y-1 ${highlight ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
      <div className="text-2xl font-bold text-red-800">{pillar.tenkan}</div>
      <div className="text-2xl font-bold text-gray-700">{pillar.chishi}</div>
      <div className="text-xs text-gray-500">{pillar.gokyo}・{pillar.inyo}</div>
    </div>
  );
}
