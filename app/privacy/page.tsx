import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜星の導き",
  description: "星の導きのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-indigo-900 mb-8">プライバシーポリシー</h1>

      <div className="bg-white rounded-2xl shadow-md p-8 space-y-8 text-sm text-gray-700 leading-relaxed">

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">1. 基本方針</h2>
          <p>星の導き（以下「当サイト」）は、ユーザーの個人情報の保護を重要な責務と考え、個人情報保護法をはじめとする関連法令を遵守します。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">2. 収集する情報</h2>
          <p>当サイトでは以下の情報を収集する場合があります。</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>お問い合わせフォームにご入力いただいた氏名・メールアドレス・メッセージ内容</li>
            <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時など）</li>
            <li>Cookie および類似技術により収集される情報</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">3. 情報の利用目的</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>お問い合わせへの回答</li>
            <li>サービスの改善・統計分析</li>
            <li>不正アクセスの防止</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">4. Google AdSense について</h2>
          <p>当サイトでは、Google AdSense を利用して広告を配信しています。Google は Cookie を使用して、ユーザーがそのサイトや他のサイトに以前アクセスした際の情報に基づいて広告を配信します。</p>
          <p>Google による広告 Cookie の使用を無効にするには、<a href="https://www.google.com/settings/ads" className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">Google 広告設定</a>をご覧ください。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">5. Google Analytics について</h2>
          <p>当サイトでは、アクセス解析のために Google Analytics を使用する場合があります。Google Analytics は Cookie を使用してデータを収集しますが、個人を特定する情報は含まれません。詳細は <a href="https://policies.google.com/privacy" className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">Google プライバシーポリシー</a>をご参照ください。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">6. 第三者への提供</h2>
          <p>当サイトは、法令に基づく場合を除き、ユーザーの個人情報を第三者に提供することはありません。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">7. 免責事項</h2>
          <p>当サイトの占い結果はエンターテインメント目的のものであり、結果の正確性・完全性を保証するものではありません。占い結果を根拠とした行動により生じた損害について、当サイトは一切の責任を負いません。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">8. プライバシーポリシーの変更</h2>
          <p>当サイトは、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは本ページに掲載した時点で効力を生じます。</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800">9. お問い合わせ</h2>
          <p>本ポリシーに関するお問い合わせは、<a href="/contact" className="text-indigo-600 underline">お問い合わせページ</a>よりご連絡ください。</p>
        </section>

        <p className="text-xs text-gray-400 pt-4">制定日：2025年1月1日</p>
      </div>
    </div>
  );
}
