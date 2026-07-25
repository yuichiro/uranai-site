"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDailyAngel, type DailyAngel } from "@/lib/dailyAngel";

export default function TodayAngelNumberPage() {
  const [daily, setDaily] = useState<DailyAngel | null>(null);

  useEffect(() => {
    // 閲覧時の日付で「今日のエンジェルナンバー」を算出（毎日変わる）
    setDaily(getDailyAngel());
  }, []);

  const shareText = daily
    ? `今日のエンジェルナンバーは「${daily.angel.number}」（${daily.angel.title}）✨`
    : "";
  const shareUrl = "https://uranai.moritaro.com/today-angel-number";
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent("今日のエンジェルナンバー,星の導き")}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">🔮👼</div>
        <h1 className="text-3xl font-bold text-pink-700">今日のエンジェルナンバー</h1>
        <p className="text-gray-600">毎日変わる、今日あなたに届く天使からのメッセージ</p>
      </div>

      {!daily && (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center text-gray-400">
          読み込み中...
        </div>
      )}

      {daily && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className={`bg-gradient-to-r ${daily.angel.color} p-8 text-white text-center space-y-2`}>
              <div className="text-sm opacity-90">{daily.dateLabel}のエンジェルナンバー</div>
              <div className="text-7xl font-bold">{daily.angel.number}</div>
              <div className="text-xl font-bold">{daily.angel.title}</div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">{daily.angel.message}</p>
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="text-xs font-bold text-amber-600 mb-1">🌟 今日のヒント</div>
                <p className="text-sm text-gray-700">{daily.hint}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-xl p-4">
                  <div className="text-xs font-bold text-pink-600 mb-1">💕 恋愛・人間関係</div>
                  <p className="text-sm text-gray-700">{daily.angel.love}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-xs font-bold text-blue-600 mb-1">💼 仕事・目標</div>
                  <p className="text-sm text-gray-700">{daily.angel.work}</p>
                </div>
              </div>
            </div>
          </div>

          {/* シェア */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center space-y-4">
            <p className="text-sm font-medium text-gray-700">今日のナンバーをシェアする</p>
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

          {/* 関連導線 */}
          <div className="bg-fuchsia-50 rounded-2xl p-6 space-y-3 text-center">
            <p className="font-bold text-fuchsia-800">もっとエンジェルナンバーを知る</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/my-angel-number" className="bg-fuchsia-500 text-white text-sm px-4 py-2 rounded-full hover:shadow-md transition-all">あなた専用ナンバー診断</Link>
              <Link href="/angel-compatibility" className="bg-pink-500 text-white text-sm px-4 py-2 rounded-full hover:shadow-md transition-all">相性診断</Link>
              <Link href="/angel-number" className="bg-rose-400 text-white text-sm px-4 py-2 rounded-full hover:shadow-md transition-all">ナンバー一覧を見る</Link>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400">
            明日はまた違うエンジェルナンバーが届きます。毎日チェックしてみてください。
          </p>
        </div>
      )}
    </div>
  );
}
