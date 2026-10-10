import type { Metadata } from "next";
import Link from "next/link";
import MyAngelClient from "./MyAngelClient";
import { getAngelReadings } from "@/lib/serverData";
import { myAngelNumber } from "@/lib/angel";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "あなた専用エンジェルナンバー診断｜生年月日でわかる守護ナンバー（無料）",
  description:
    "生年月日から数秘術のライフパスナンバーを求め、あなたが生まれ持った「守護エンジェルナンバー」を無料で診断。ライフパス別に恋愛・仕事・金運のメッセージを解説します。",
  alternates: { canonical: "https://uranai.moritaro.com/my-angel-number" },
};

const LIFE_PATHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

export default function MyAngelNumberPage() {
  const readings = getAngelReadings();

  return (
    <>
      <MyAngelClient aiReadings={readings} />

      {/* ライフパス別の守護エンジェルナンバー一覧（サーバー描画＝検索エンジンが読める本文） */}
      <section className="max-w-3xl mx-auto px-4 pb-12 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">ライフパスナンバー別・守護エンジェルナンバー一覧</h2>
        <p className="text-sm text-gray-600">
          守護エンジェルナンバーは、生年月日から求めるライフパスナンバーに対応しています。
          自分の数字がわからない方は、上のフォームで生年月日を入れると自動で診断できます。
        </p>
        <div className="space-y-3">
          {LIFE_PATHS.map((lp) => {
            const angel = myAngelNumber(lp);
            if (!angel) return null;
            const ai = readings?.[angel.number];
            const hasColumn = ["111", "222", "333", "444", "555", "666", "777", "888", "999", "1111"].includes(angel.number);
            return (
              <article key={lp} className="bg-white rounded-2xl shadow-sm p-5 space-y-2">
                <h3 className="font-bold text-pink-700">
                  ライフパス{lp}の守護エンジェルナンバーは「{angel.number}」（{angel.title}）
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{ai?.intro ?? angel.message}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>💕 恋愛：{ai?.love ?? angel.love}</li>
                  <li>💼 仕事：{ai?.work ?? angel.work}</li>
                  {ai && <li>💰 金運：{ai.money}</li>}
                </ul>
                {hasColumn && (
                  <Link href={`/column/angel-${angel.number}`} className="text-sm text-indigo-600 underline">
                    {angel.number}の詳しい意味 →
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
