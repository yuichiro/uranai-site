import Link from "next/link";
import AdBanner from "@/components/AdBanner";

const FEATURES = [
  {
    href: "/numerology",
    icon: "🔢",
    title: "数秘術",
    subtitle: "Numerology",
    description: "生年月日と名前のひらがなから、あなたの「ライフパスナンバー」「表現数」「ソウルナンバー」を算出し、運命を紐解きます。",
    color: "from-purple-500 to-indigo-600",
  },
  {
    href: "/shichu-suimei",
    icon: "🏮",
    title: "四柱推命",
    subtitle: "Shichu Suimei",
    description: "生年月日時から命式を算出。年柱・月柱・日柱・時柱の四つの柱があなたの本質と運勢を映し出します。",
    color: "from-red-500 to-orange-500",
  },
  {
    href: "/angel-number",
    icon: "👼",
    title: "エンジェルナンバー",
    subtitle: "Angel Number",
    description: "111、222、777... 繰り返し目にする数字にはメッセージが込められています。天使からのサインを読み解きましょう。",
    color: "from-pink-500 to-rose-500",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="text-6xl">✨</div>
        <h1 className="text-4xl font-bold text-indigo-900">星の導き</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          数字と星があなたの運命を語りかける。<br />
          無料で試せる本格占いで、あなたの本質と可能性を発見しましょう。
        </p>
        <Link
          href="/numerology"
          className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all"
        >
          今すぐ占う →
        </Link>
      </section>

      <AdBanner format="horizontal" />

      {/* Feature Cards */}
      <section>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">占いメニュー</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className="group block">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full">
                <div className={`bg-gradient-to-br ${f.color} p-6 text-white text-center`}>
                  <div className="text-5xl mb-2">{f.icon}</div>
                  <div className="text-xl font-bold">{f.title}</div>
                  <div className="text-sm opacity-80">{f.subtitle}</div>
                </div>
                <div className="p-5 text-sm text-gray-600 leading-relaxed">{f.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-white rounded-2xl shadow-md p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">占いについて</h2>
        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
          「星の導き」は数秘術・四柱推命・エンジェルナンバーをブラウザ上で手軽に体験できる無料占いサービスです。
          結果はエンターテインメントとしてお楽しみください。
          重要な人生の決断は、専門の占い師や専門家にご相談されることをお勧めします。
        </p>
      </section>

      <AdBanner format="horizontal" />
    </div>
  );
}
