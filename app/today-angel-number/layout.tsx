import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "今日のエンジェルナンバー｜毎日変わる天使からのメッセージ",
  description: "今日あなたに届くエンジェルナンバーを毎日お届け。日替わりの数字に込められた天使からのメッセージ・恋愛・仕事の運勢をチェックしましょう。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
