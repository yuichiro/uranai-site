"use client";

// Xシェアとリンクコピー。コピーはブラウザAPIが要るのでここだけクライアント部品にする。
export default function ShareButtons({ text, url, hashtags }: { text: string; url: string; hashtags: string }) {
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white font-bold px-6 py-2 rounded-full hover:opacity-80 transition-opacity"
      >
        𝕏 でシェア
      </a>
      <button
        onClick={() => navigator.clipboard?.writeText(`${text} ${url}`)}
        className="bg-gray-100 text-gray-700 font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        🔗 コピー
      </button>
    </div>
  );
}
