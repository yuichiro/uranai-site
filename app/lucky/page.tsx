"use client";

import { useState } from "react";
import { getDailyFortune, getJapaneseDate, type DailyFortune } from "@/lib/daily";
import { rakutenSearchLink, COLOR_TO_STONE } from "@/lib/rakuten";

function Stars({ count }: { count: number }) {
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>★</span>
      ))}
    </span>
  );
}

export default function LuckyPage() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState<DailyFortune | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthdate) return;
    setResult(getDailyFortune(birthdate));
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">🌟</div>
        <h1 className="text-3xl font-bold text-amber-700">今日の運勢</h1>
        <p className="text-gray-600">生年月日から今日のあなたの運勢を占います</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">生年月日</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-bold py-3 rounded-full hover:shadow-lg transition-all"
        >
          今日の運勢を見る 🌟
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-md p-6 text-center space-y-2">
            <p className="text-sm text-amber-600 font-medium">{getJapaneseDate()}の運勢</p>
            <div className="text-4xl font-bold text-amber-700">総合運</div>
            <div className="text-3xl"><Stars count={result.overall} /></div>
            <p className="text-gray-700 leading-relaxed mt-4">{result.message}</p>
          </div>

          {/* 運勢詳細 */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "恋愛運", value: result.love, icon: "💕" },
              { label: "仕事運", value: result.work, icon: "💼" },
              { label: "金運", value: result.money, icon: "💰" },
              { label: "健康運", value: result.health, icon: "🌿" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl shadow-sm p-4 text-center">
                <div className="text-2xl">{item.icon}</div>
                <div className="text-sm font-medium text-gray-600 mt-1">{item.label}</div>
                <div className="mt-1"><Stars count={item.value} /></div>
              </div>
            ))}
          </div>

          {/* 恋愛・仕事メッセージ */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-pink-50 rounded-xl p-5 space-y-2">
              <div className="font-bold text-pink-700">💕 恋愛アドバイス</div>
              <p className="text-sm text-gray-700">{result.loveMessage}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 space-y-2">
              <div className="font-bold text-blue-700">💼 仕事アドバイス</div>
              <p className="text-sm text-gray-700">{result.workMessage}</p>
            </div>
          </div>

          {/* ラッキー情報 */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-bold text-gray-800 mb-4">🍀 今日のラッキー</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "ラッキーカラー", value: result.luckyColor, icon: "🎨" },
                { label: "ラッキーナンバー", value: result.luckyNumber, icon: "🔢" },
                { label: "ラッキーアイテム", value: result.luckyItem, icon: "✨" },
                { label: "ラッキー方位", value: result.luckyDirection, icon: "🧭" },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-amber-50 rounded-xl">
                  <div className="text-xl">{item.icon}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                  <div className="font-bold text-amber-700 mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 開運アイテム（アフィリエイト） */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-800">🔮 今日の開運アイテムを探す</h2>
              <span className="text-xs text-gray-400 border border-gray-300 rounded px-1.5 py-0.5">PR</span>
            </div>
            <p className="text-sm text-gray-600">
              今日のラッキーカラー「{result.luckyColor}」に対応するパワーストーンや開運グッズで、運気をさらに高めましょう。
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={rakutenSearchLink(COLOR_TO_STONE[result.luckyColor] ?? "パワーストーン ブレスレット")}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="block bg-amber-50 hover:bg-amber-100 rounded-xl p-4 transition-colors"
              >
                <div className="font-bold text-amber-800 text-sm">💎 {result.luckyColor}のパワーストーンを見る</div>
                <div className="text-xs text-gray-500 mt-1">{COLOR_TO_STONE[result.luckyColor] ?? "パワーストーン"}（楽天市場）→</div>
              </a>
              <a
                href={rakutenSearchLink(`開運 ${result.luckyItem}`)}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="block bg-amber-50 hover:bg-amber-100 rounded-xl p-4 transition-colors"
              >
                <div className="font-bold text-amber-800 text-sm">✨ ラッキーアイテム「{result.luckyItem}」を見る</div>
                <div className="text-xs text-gray-500 mt-1">開運 {result.luckyItem}（楽天市場）→</div>
              </a>
            </div>
          </div>
        </div>
      )}

      {!result && (
        <section className="bg-white rounded-2xl shadow-md p-8 space-y-3">
          <h2 className="text-lg font-bold text-gray-800">今日の運勢とは？</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            数秘術をベースに、あなたの生年月日と今日の日付から運勢を算出します。
            毎日結果が変わるので、朝のルーティンとしてチェックしてみてください。
          </p>
        </section>
      )}
    </div>
  );
}
