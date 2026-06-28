import Link from "next/link";

const NAV = [
  { href: "/lucky", label: "今日の運勢" },
  { href: "/horoscope", label: "星座占い" },
  { href: "/numerology", label: "数秘術" },
  { href: "/shichu-suimei", label: "四柱推命" },
  { href: "/angel-number", label: "エンジェルナンバー" },
  { href: "/compatibility", label: "相性占い" },
  { href: "/column", label: "コラム" },
];

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold tracking-wide">星の導き</span>
          </Link>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-sm font-medium">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-purple-300 transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
