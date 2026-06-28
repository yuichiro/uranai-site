"use client";

import { useState } from "react";
import { calcLifePathNumber, calcExpressionNumber, calcSoulNumber, NUMBER_MEANINGS } from "@/lib/numerology";

interface Result {
  lifePath: number;
  expression: number;
  soul: number;
}

export default function NumerologyPage() {
  const [birthdate, setBirthdate] = useState("");
  const [kana, setKana] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!birthdate) { setError("生年月日を入力してください"); return; }
    if (!kana) { setError("名前（ひらがな）を入力してください"); return; }
    if (!/^[぀-ゟー]+$/.test(kana)) {
      setError("名前はひらがなで入力してください");
      return;
    }
    setResult({
      lifePath: calcLifePathNumber(birthdate),
      expression: calcExpressionNumber(kana),
      soul: calcSoulNumber(kana),
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <div className="text-5xl">🔢</div>
        <h1 className="text-3xl font-bold text-indigo-900">数秘術</h1>
        <p className="text-gray-600">生年月日と名前から、あなたの運命数を読み解きます</p>
      </div>


      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">生年月日</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            フルネーム（ひらがな）
          </label>
          <input
            type="text"
            placeholder="例：やまだたろう"
            value={kana}
            onChange={(e) => setKana(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <p className="text-xs text-gray-500 mt-1">姓名をひらがなで続けて入力してください（スペース不要）</p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-full hover:shadow-lg transition-all"
        >
          運命数を算出する ✨
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          <NumberCard
            label="ライフパスナンバー"
            number={result.lifePath}
            description="あなたの人生の目的と使命を示す最も重要な数字。生年月日から算出されます。"
          />
          <NumberCard
            label="表現数"
            number={result.expression}
            description="あなたが持つ才能と能力、外の世界への表現の仕方を示します。名前から算出されます。"
          />
          <NumberCard
            label="ソウルナンバー"
            number={result.soul}
            description="あなたの魂の奥深くにある欲求と動機を示します。名前の母音から算出されます。"
          />
        </div>
      )}

      {!result && (
        <section className="bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">数秘術とは？</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            数秘術（ニューメロロジー）は、生年月日や名前の数字からその人の運命や性格を読み解く占術です。
            古代から世界各地で研究されてきた伝統的な知恵に基づいています。
            あなたの数字があなた自身を知るきっかけになれば幸いです。
          </p>
        </section>
      )}
    </div>
  );
}

function NumberCard({ label, number, description }: { label: string; number: number; description: string }) {
  const meaning = NUMBER_MEANINGS[number];
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 text-white flex items-center gap-4">
        <div className="text-5xl font-bold">{number}</div>
        <div>
          <div className="text-xs opacity-80">{label}</div>
          {meaning && <div className="font-bold">{meaning.keyword}</div>}
        </div>
      </div>
      <div className="px-6 py-4 space-y-2">
        <p className="text-xs text-gray-500">{description}</p>
        {meaning && <p className="text-gray-700 text-sm leading-relaxed">{meaning.description}</p>}
      </div>
    </div>
  );
}
