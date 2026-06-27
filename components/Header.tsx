import Link from "next/link";

const NAV = [
  { href: "/numerology", label: "数秘術" },
  { href: "/shichu-suimei", label: "四柱推命" },
  { href: "/angel-number", label: "エンジェルナンバー" },
];

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="text-xl font-bold tracking-wide">星の導き</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
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
