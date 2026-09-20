// 今日のエンジェルナンバー鑑定文をLINEで一斉配信するスクリプト。
//
// 使い方:
//   LINE_CHANNEL_ACCESS_TOKEN=xxxx node scripts/broadcast-line.mjs   … 実配信
//   node scripts/broadcast-line.mjs                                  … ドライラン（本文を表示のみ）
//
// 「今日のナンバー」の選定は lib/dailyAngel.ts と同一ロジック（日本時間の暦日ベース）。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const READINGS_PATH = path.join(here, "..", "public", "data", "angel-readings.json");
const SITE_URL = "https://uranai.moritaro.com";

// lib/angel.ts の ANGEL_NUMBERS と同じ順序・タイトル（indexが一致するよう固定）
const NUMBERS = [
  { number: "111", title: "新しい始まりのサイン" },
  { number: "222", title: "信頼とバランスのサイン" },
  { number: "333", title: "成長と表現のサイン" },
  { number: "444", title: "安定と保護のサイン" },
  { number: "555", title: "変化と転換のサイン" },
  { number: "666", title: "バランスと内省のサイン" },
  { number: "777", title: "幸運と達成のサイン" },
  { number: "888", title: "豊かさと無限のサイン" },
  { number: "999", title: "完了と解放のサイン" },
  { number: "1111", title: "覚醒と願望実現のサイン" },
  { number: "1212", title: "前進と覚醒のサイン" },
  { number: "2222", title: "調和と信念のサイン" },
];

// lib/dailyAngel.ts と同一の日付シード
function dateSeed(y, m, d) {
  const key = `${y}-${m}-${d}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function todayJst() {
  // 実行環境のTZに依存せず日本時間の暦日を得る
  const jst = new Date(Date.now() + 9 * 3600 * 1000);
  return { y: jst.getUTCFullYear(), m: jst.getUTCMonth() + 1, d: jst.getUTCDate() };
}

function buildMessage() {
  const { y, m, d } = todayJst();
  const idx = dateSeed(y, m, d) % NUMBERS.length;
  const pick = NUMBERS[idx];

  let intro = `${pick.number}は、天使からのメッセージが込められた数字です。`;
  let action = "今日はひとつ、小さな「ありがとう」を伝えてみましょう。";
  try {
    const data = JSON.parse(fs.readFileSync(READINGS_PATH, "utf8"));
    const r = data?.readings?.[pick.number];
    if (r && data.model !== "stub") {
      intro = r.intro ?? intro;
      action = r.action ?? action;
    }
  } catch {
    // 読めなければ既定文で配信
  }

  const text =
    `🔮 今日のエンジェルナンバー（${m}月${d}日）\n` +
    `【${pick.number}】${pick.title}\n\n` +
    `${intro}\n\n` +
    `🌟 今日の一歩\n${action}\n\n` +
    `▼あなた専用の守護ナンバーを調べる\n${SITE_URL}/my-angel-number`;

  return { text, pick, dateLabel: `${y}/${m}/${d}` };
}

async function broadcast(text, token) {
  const res = await fetch("https://api.line.me/v2/bot/message/broadcast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ messages: [{ type: "text", text }] }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LINE API error ${res.status}: ${body}`);
  }
}

async function main() {
  const { text, pick, dateLabel } = buildMessage();
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  console.log(`日付(JST): ${dateLabel} / 今日のナンバー: ${pick.number}（${pick.title}）`);
  console.log("────── 配信本文 ──────");
  console.log(text);
  console.log("──────────────────────");

  if (!token) {
    console.log("[ドライラン] LINE_CHANNEL_ACCESS_TOKEN 未設定のため配信しませんでした。");
    return;
  }
  await broadcast(text, token);
  console.log("✅ LINE配信を実行しました。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
