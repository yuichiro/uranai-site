import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm mt-16 py-8">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
        <p className="text-purple-400 font-medium">✨ 星の導き</p>
        <p>占い結果はエンターテインメント目的です。実生活の重要な判断は専門家にご相談ください。</p>
        <div className="flex justify-center gap-6 text-xs text-gray-500">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">プライバシーポリシー</Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">お問い合わせ</Link>
        </div>
        <p className="text-xs text-gray-600">© 2025 星の導き. All rights reserved.</p>
      </div>
    </footer>
  );
}
