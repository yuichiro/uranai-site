"use client";

import { useState } from "react";
import { SIGNS, getWeeklyFortune, getSignFromBirthdate } from "@/lib/horoscope";

function StarRating({ count }: { count: number }) {
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>★</span>
      ))}
    </span>
  );
}

export default function HoroscopePage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [birthdate, setBirthdate] = useState("");

  const fortune = selected !== null ? getWeeklyFortune(selected) : null;
  const sign = selected !== null ? SIGNS[selected] : null;

  function handleBirthdate(e: React.FormEvent) {
    e.preventDefault();
    if (!birthdate) return;
    setSelected(getSignFromBirthdate(birthdate));
  }

  const now = new Date();
  const weekLabel = `${now.getFullYear()}年${now.getMonth() + 1}月第${Math.ceil(now.getDate() / 7)}週`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">⭐</div>
        <h1 className="text-3xl font-bold text-indigo-800">星座占い</h1>
        <p className="text-gray-600">{weekLabel}の運勢</p>
      </div>

      {/* 生年月日から自動選択 */}
      <form onSubmit={handleBirthdate} className="bg-white rounded-2xl shadow-md p-6 flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">生年月日から星座を調べる</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white font-bold px-5 py-2 rounded-full hover:shadow-lg transition-all whitespace-nowrap">
          調べる
        </button>
      </form>

      {/* 星座一覧 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {SIGNS.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setSelected(i)}
            className={`rounded-xl p-3 text-center transition-all border-2 ${selected === i ? "border-indigo-400 bg-indigo-50" : "border-gray-100 bg-white hover:border-indigo-200"}`}
          >
            <div className="text-2xl">{s.emoji}</div>
            <div className="text-xs font-medium text-gray-700 mt-1">{s.name}</div>
            <div className="text-xs text-gray-400">{s.period}</div>
          </button>
        ))}
      </div>

      {/* 結果 */}
      {fortune && sign && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center space-y-3">
            <div className="text-5xl">{sign.emoji}</div>
            <div className="text-2xl font-bold">{sign.name}</div>
            <div className="text-sm opacity-80">{sign.period} / {sign.element}属性 / {sign.ruling}支配</div>
            <div className="text-4xl mt-2"><StarRating count={fortune.overall} /></div>
            <p className="leading-relaxed text-sm opacity-90">{fortune.message}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "💕 恋愛運", msg: fortune.love, bg: "bg-pink-50", color: "text-pink-700" },
              { label: "💼 仕事運", msg: fortune.work, bg: "bg-blue-50", color: "text-blue-700" },
              { label: "💰 金運", msg: fortune.money, bg: "bg-amber-50", color: "text-amber-700" },
            ].map((item) => (
              <div key={item.label} className={`${item.bg} rounded-xl p-4 space-y-2`}>
                <div className={`font-bold text-sm ${item.color}`}>{item.label}</div>
                <p className="text-sm text-gray-700">{item.msg}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-2">
            <h2 className="font-bold text-gray-800">{sign.name}の特徴</h2>
            <p className="text-sm text-gray-600">{sign.traits}</p>
          </div>
        </div>
      )}
    </div>
  );
}
