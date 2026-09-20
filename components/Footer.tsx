import Link from "next/link";
import { LINE_ADD_FRIEND_URL } from "@/lib/line";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm mt-16 py-8">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
        <p className="text-purple-400 font-medium">✨ 星の導き</p>
        <div className="py-2">
          <p className="text-gray-300 mb-2">📱 毎朝、今日のエンジェルナンバーをLINEでお届け</p>
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white font-bold px-6 py-2 rounded-full hover:bg-green-400 transition-colors"
          >
            LINEで友だち追加する →
          </a>
        </div>
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
