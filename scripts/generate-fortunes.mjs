// AIパーソナライズ鑑定文の生成スクリプト（Claude Haiku 4.5）
//
// 有限の12エンジェルナンバー分の「温かい1:1鑑定文」を生成し、
// public/data/angel-readings.json に保存する。サイト本体はこのJSONを読むだけで、
// APIキーもLLM実行コストも本番に乗らない。
//
// 使い方:
//   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-fortunes.mjs
//   （キー未設定なら、既存の固定文からスタブを生成してE2E確認できる）

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(here, "..", "public", "data", "angel-readings.json");

const MODEL = "claude-haiku-4-5";

// 生成対象＝有限の12ナンバー（テーマの種を与えて品質と一貫性を担保）
const NUMBERS = [
  { number: "111", theme: "新しい始まり・思考の現実化" },
  { number: "222", theme: "信頼・バランス・種まきの時期" },
  { number: "333", theme: "創造・自己表現・喜び" },
  { number: "444", theme: "天使の保護・安心・基盤" },
  { number: "555", theme: "大きな変化・転換・自由" },
  { number: "666", theme: "愛と調和・バランス回復（※不吉ではない、恐怖を煽らない）" },
  { number: "777", theme: "幸運・正しい道・達成" },
  { number: "888", theme: "豊かさ・成功・収穫" },
  { number: "999", theme: "完結・手放し・次の始まり" },
  { number: "1111", theme: "覚醒・使命・願いの実現（警告ではなく前向きな注意喚起）" },
  { number: "1212", theme: "前進・成長・目的への歩み" },
  { number: "2222", theme: "調和・信念・穏やかな深まり" },
];

const SYSTEM = `あなたは、優しく寄り添う占いライターです。エンジェルナンバーの鑑定文を日本語で書きます。

【トーン】
- 温かく、前向きで、読み手が「自分に語りかけられている」と感じる一人称の語り
- スピリチュアルだが地に足のついた表現。断定しすぎず「〜かもしれません」「〜してみましょう」の余白を残す

【安全・品質の厳守事項】
- 健康・病気について診断や断定をしない（「治る」「悪化する」等は禁止）。体調の不安は専門家への相談を促す姿勢を保つ
- 金銭・投資について「儲かる」「必ず入る」等の断定や具体的な投資助言をしない
- 恐怖や不安を煽らない。特に666・1111は「不吉」「警告」と怖がらせず、前向きな気づきとして書く
- 各項目は2〜3文、簡潔に。誇張しすぎない

【出力形式】
必ず次のキーだけを持つJSONオブジェクトのみを出力する（前後に説明文やコードフェンスを付けない）:
{"intro": "...", "love": "...", "work": "...", "money": "...", "health": "...", "action": "..."}
- intro: その数字の総合的な意味（3文程度）
- love: 恋愛・人間関係のメッセージ
- work: 仕事・目標のメッセージ
- money: 金運のメッセージ（断定回避）
- health: 心身の整え方（診断しない、セルフケアの励まし）
- action: 今日踏み出せる小さな一歩（具体的で軽やかに）`;

function stubReading(n) {
  return {
    intro: `${n.number}は「${n.theme}」を象徴するエンジェルナンバーです。繰り返し目にするとき、天使があなたにやさしくメッセージを届けています。今の自分の心に静かに耳を傾けてみましょう。`,
    love: "素直な気持ちを大切に。あなたのあたたかさが、良い縁と関係を育てていきます。",
    work: "あなたの努力は見られています。焦らず、今できることを丁寧に積み重ねていきましょう。",
    money: "お金への不安は少し脇に置いて。感謝の気持ちが、豊かさの流れを穏やかに整えてくれます。",
    health: "がんばりすぎていませんか。十分な休息と深呼吸で、心と体をやさしくいたわってあげてください。",
    action: "今日はひとつ、小さな「ありがとう」を伝えてみましょう。",
    _stub: true,
  };
}

async function generateWithAI(numbers) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();
  const readings = {};
  for (const n of numbers) {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `エンジェルナンバー「${n.number}」（テーマ: ${n.theme}）の鑑定文を、指定のJSON形式で書いてください。`,
        },
      ],
    });
    const text = res.content.find((b) => b.type === "text")?.text ?? "";
    let parsed;
    try {
      // まれに前後にテキストが付く場合に備え、最初の { 〜 最後の } を抽出
      const s = text.indexOf("{");
      const e = text.lastIndexOf("}");
      parsed = JSON.parse(text.slice(s, e + 1));
    } catch (err) {
      console.warn(`  [warn] ${n.number}: JSON parse失敗、スタブで代替`);
      parsed = stubReading(n);
    }
    readings[n.number] = parsed;
    console.log(`  ✓ ${n.number} 生成完了`);
  }
  return readings;
}

async function main() {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  console.log(hasKey ? `AI生成モード (model=${MODEL})` : "スタブモード（APIキー未設定）");

  let readings;
  if (hasKey) {
    readings = await generateWithAI(NUMBERS);
  } else {
    readings = Object.fromEntries(NUMBERS.map((n) => [n.number, stubReading(n)]));
  }

  const out = {
    generatedAt: new Date().toISOString(),
    model: hasKey ? MODEL : "stub",
    readings,
  };
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`書き出し: ${OUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
