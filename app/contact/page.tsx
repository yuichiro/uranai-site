"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 実際の送信処理はFormspreeやメールサービスと連携してください
    setSubmitted(true);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-indigo-900 mb-8">お問い合わせ</h1>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-3">
          <div className="text-4xl">✅</div>
          <p className="font-bold text-green-800">お問い合わせを受け付けました</p>
          <p className="text-sm text-green-700">内容を確認の上、順次ご返信いたします。</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="山田 太郎"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="example@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              件名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="お問い合わせ件名"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メッセージ <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              placeholder="お問い合わせ内容をご記入ください"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-full hover:shadow-lg transition-all"
          >
            送信する
          </button>
          <p className="text-xs text-gray-400 text-center">
            送信内容は<a href="/privacy" className="underline">プライバシーポリシー</a>に基づき取り扱います。
          </p>
        </form>
      )}
    </div>
  );
}
