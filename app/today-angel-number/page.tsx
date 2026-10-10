import Link from "next/link";
import { getDailyAngelFor } from "@/lib/dailyAngel";
import { getAngelReadings, todayJstParts } from "@/lib/serverData";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";
import ShareButtons from "@/components/ShareButtons";

// サーバーで描画してAI鑑定文をHTMLに含める（Googleが読める）。日付が変わっても1時間以内に更新。
export const revalidate = 3600;

export default function TodayAngelNumberPage() {
  const { y, m, d } = todayJstParts();
  const daily = getDailyAngelFor(y, m, d);
  const ai = getAngelReadings()?.[daily.angel.number] ?? null;

  const shareText = `今日のエンジェルナンバーは「${daily.angel.number}」（${daily.angel.title}）✨`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">🔮👼</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-700">今日のエンジェルナンバー</h1>
        <p className="text-gray-600">毎日変わる、今日あなたに届く天使からのメッセージ</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className={`bg-gradient-to-r ${daily.angel.color} p-8 text-white text-center space-y-2`}>
            <div className="text-sm opacity-90">{daily.dateLabel}のエンジェルナンバー</div>
            <div className="text-7xl font-bold">{daily.angel.number}</div>
            <div className="text-xl font-bold">{daily.angel.title}</div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">{ai?.intro ?? daily.angel.message}</p>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-xs font-bold text-amber-600 mb-1">🌟 今日のヒント</div>
              <p className="text-sm text-gray-700">{ai?.action ?? daily.hint}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-pink-50 rounded-xl p-4">
                <div className="text-xs font-bold text-pink-600 mb-1">💕 恋愛・人間関係</div>
                <p className="text-sm text-gray-700">{ai?.love ?? daily.angel.love}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-xs font-bold text-blue-600 mb-1">💼 仕事・目標</div>
                <p className="text-sm text-gray-700">{ai?.work ?? daily.angel.work}</p>
              </div>
              {ai && (
                <>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="text-xs font-bold text-yellow-700 mb-1">💰 金運</div>
                    <p className="text-sm text-gray-700">{ai.money}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-xs font-bold text-green-700 mb-1">🌿 心身のケア</div>
                    <p className="text-sm text-gray-700">{ai.health}</p>
                  </div>
                </>
              )}
            </div>
            {["111", "222", "333", "444", "555", "666", "777", "888", "999", "1111"].includes(daily.angel.number) && (
              <p className="text-sm">
                <Link href={`/column/angel-${daily.angel.number}`} className="text-indigo-600 underline">
                  エンジェルナンバー{daily.angel.number}の詳しい意味を読む →
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* LINE友だち追加（毎朝配信で習慣化） */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-md p-6 text-white text-center space-y-3">
          <p className="font-bold text-lg">📱 毎朝、今日のエンジェルナンバーをLINEで</p>
          <p className="text-sm opacity-90">友だち追加すると、毎日あなたに届く天使のメッセージを受け取れます</p>
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 font-bold px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all"
          >
            LINEで友だち追加する →
          </a>
        </div>

        {/* シェア */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center space-y-4">
          <p className="text-sm font-medium text-gray-700">今日のナンバーをシェアする</p>
          <ShareButtons
            text={shareText}
            url="https://uranai.moritaro.com/today-angel-number"
            hashtags="今日のエンジェルナンバー,星の導き"
          />
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
    </div>
  );
}
