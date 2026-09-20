// 「今日の運勢」用のAI鑑定文を、ライフパスナンバー別に日次生成するスクリプト（Haiku 4.5）。
//
// 使い方:
//   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-daily-fortunes.mjs
//   （キー未設定ならスタブ生成でE2E確認できる）
//
// 出力: public/data/daily-fortunes.json { date, model, fortunes: { "<lifePath>": {...} } }
// 星の数・ラッキーカラー等は lib/daily.ts の決定論ロジックのまま（本スクリプトは"文章"だけを担当）。

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(here, "..", "public", "data", "daily-fortunes.json");
const MODEL = "claude-haiku-4-5";

// lib/numerology.ts の NUMBER_MEANINGS と同じ性質（生成の種）
const LIFE_PATHS = [
  { lp: "1", nature: "リーダーシップ・独立・開拓" },
  { lp: "2", nature: "協調・感受性・パートナーシップ" },
  { lp: "3", nature: "創造・表現・コミュニケーション" },
  { lp: "4", nature: "安定・努力・堅実" },
  { lp: "5", nature: "自由・変化・冒険" },
  { lp: "6", nature: "愛情・責任・調和" },
  { lp: "7", nature: "探求・内省・分析" },
  { lp: "8", nature: "達成・豊かさ・実行力" },
  { lp: "9", nature: "博愛・完成・奉仕" },
  { lp: "11", nature: "直感・感受性・スピリチュアル（マスターナンバー）" },
  { lp: "22", nature: "大きな夢の実現・現実化（マスターナンバー）" },
  { lp: "33", nature: "無償の愛・奉仕・癒し（マスターナンバー）" },
];

function todayJst() {
  const jst = new Date(Date.now() + 9 * 3600 * 1000);
  return `${jst.getUTCFullYear()}-${String(jst.getUTCMonth() + 1).padStart(2, "0")}-${String(jst.getUTCDate()).padStart(2, "0")}`;
}

const SYSTEM = `あなたは、優しく寄り添う占いライターです。数秘術のライフパスナンバー別に「今日の運勢」の文章を日本語で書きます。

【トーン】
- 温かく前向きで、読み手が「今日の自分に語りかけられている」と感じる一人称の語り
- その日1日の指針になるよう、具体的で軽やかに。断定しすぎず余白を残す

【安全・品質の厳守事項】
- 健康・病気について診断や断定をしない。体調の不安は専門家への相談を促す姿勢を保つ
- 金銭・投資について「儲かる」「必ず入る」等の断定や具体的な投資助言をしない
- 恐怖や不安を煽らない
- 各項目1〜2文、簡潔に

【出力形式】
必ず次のキーだけを持つJSONオブジェクトのみを出力（前後に説明やコードフェンスを付けない）:
{"overall": "...", "love": "...", "work": "...", "money": "...", "health": "...", "action": "..."}
- overall: 今日1日の総合的な運勢と過ごし方のメッセージ（2文程度）
- love: 今日の恋愛・人間関係のアドバイス
- work: 今日の仕事・目標のアドバイス
- money: 今日の金運のアドバイス（断定回避）
- health: 今日の心身の整え方（診断しない、セルフケアの励まし）
- action: 今日試したい小さな開運アクション（具体的に）`;

function stub(lp) {
  return {
    overall: `今日は、ライフパス${lp.lp}のあなたらしさ（${lp.nature}）が活きる一日です。自分のペースを大切に、心穏やかに過ごしましょう。`,
    love: "素直な気持ちを大切に。あたたかい一言が、関係をより良くしてくれます。",
    work: "焦らず一歩ずつ。丁寧な取り組みが、今日の信頼につながります。",
    money: "お金の使い方を少し見直すと、心が軽くなりそうです。",
    health: "深呼吸とちょっとした休憩を。自分をいたわる時間を持ちましょう。",
    action: "今日はひとつ、小さな「ありがとう」を伝えてみましょう。",
    _stub: true,
  };
}

async function generate() {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();
  const date = todayJst();
  const fortunes = {};
  for (const lp of LIFE_PATHS) {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1200,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `今日（${date}）の、ライフパスナンバー${lp.lp}（性質: ${lp.nature}）の人向けの「今日の運勢」を、指定のJSON形式で書いてください。`,
        },
      ],
    });
    const text = res.content.find((b) => b.type === "text")?.text ?? "";
    try {
      const s = text.indexOf("{");
      const e = text.lastIndexOf("}");
      fortunes[lp.lp] = JSON.parse(text.slice(s, e + 1));
    } catch {
      console.warn(`  [warn] LP${lp.lp}: JSON parse失敗、スタブで代替`);
      fortunes[lp.lp] = stub(lp);
    }
    console.log(`  ✓ LP${lp.lp} 生成完了`);
  }
  return fortunes;
}

async function main() {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  console.log(hasKey ? `AI生成モード (model=${MODEL})` : "スタブモード（APIキー未設定）");
  const fortunes = hasKey
    ? await generate()
    : Object.fromEntries(LIFE_PATHS.map((lp) => [lp.lp, stub(lp)]));

  const out = { date: todayJst(), generatedAt: new Date().toISOString(), model: hasKey ? MODEL : "stub", fortunes };
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`書き出し: ${OUT_PATH}（date=${out.date}）`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
