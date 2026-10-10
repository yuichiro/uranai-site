import type { Metadata } from "next";
import Link from "next/link";
import LuckyClient from "./LuckyClient";
import { getDailyFortunesData, todayJstParts } from "@/lib/serverData";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "今日の運勢｜数秘術で占う無料の毎日占い（ライフパスナンバー別）",
  description:
    "生年月日から今日のあなたの運勢を無料で占います。数秘術のライフパスナンバー別に、総合運・恋愛運・仕事運・金運・健康運と今日の開運アクションを毎朝更新。",
  alternates: { canonical: "https://uranai.moritaro.com/lucky" },
};

const LIFE_PATHS = [
  { lp: "1", label: "ライフパス1" },
  { lp: "2", label: "ライフパス2" },
  { lp: "3", label: "ライフパス3" },
  { lp: "4", label: "ライフパス4" },
  { lp: "5", label: "ライフパス5" },
  { lp: "6", label: "ライフパス6" },
  { lp: "7", label: "ライフパス7" },
  { lp: "8", label: "ライフパス8" },
  { lp: "9", label: "ライフパス9" },
  { lp: "11", label: "ライフパス11（マスターナンバー）" },
  { lp: "22", label: "ライフパス22（マスターナンバー）" },
  { lp: "33", label: "ライフパス33（マスターナンバー）" },
];

export default function LuckyPage() {
  const data = getDailyFortunesData();
  const { m, d } = todayJstParts();

  return (
    <>
      <LuckyClient fortunes={data?.fortunes ?? null} />

      {/* ライフパス別の今日の運勢（サーバー描画＝検索エンジンが読める本文） */}
      {data && (
        <section className="max-w-3xl mx-auto px-4 pb-12 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            ライフパスナンバー別・今日の運勢（{m}月{d}日）
          </h2>
          <p className="text-sm text-gray-600">
            ライフパスナンバーは生年月日のすべての数字を1桁になるまで足して求めます（11・22・33はそのまま）。
            自分の数字がわからない方は、上のフォームに生年月日を入れると自動で計算されます。
            <Link href="/column/life-path-number" className="text-indigo-600 underline ml-1">ライフパスナンバーとは</Link>
          </p>
          <div className="space-y-3">
            {LIFE_PATHS.map(({ lp, label }) => {
              const f = data.fortunes[lp];
              if (!f) return null;
              return (
                <article key={lp} className="bg-white rounded-2xl shadow-sm p-5 space-y-2">
                  <h3 className="font-bold text-amber-700">{label}の今日の運勢</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{f.overall}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>💕 恋愛：{f.love}</li>
                    <li>💼 仕事：{f.work}</li>
                    <li>💰 金運：{f.money}</li>
                    <li>🌿 健康：{f.health}</li>
                    <li>🌟 開運アクション：{f.action}</li>
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
