// サーバー側（ビルド時・ISR時）にAI生成物を読むヘルパー。
// ページをサーバーで描画すれば、AI鑑定文がHTMLに入りGoogleが読める。
import fs from "node:fs";
import path from "node:path";
import type { AiReading, DailyFortuneText } from "./aiReadings";

function readData(file: string) {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "data", file), "utf8"));
  } catch {
    return null;
  }
}

export function getAngelReadings(): Record<string, AiReading> | null {
  const d = readData("angel-readings.json");
  if (!d || d.model === "stub" || !d.readings) return null;
  return d.readings;
}

export function getDailyFortunesData(): { date: string; fortunes: Record<string, DailyFortuneText> } | null {
  const d = readData("daily-fortunes.json");
  if (!d || d.model === "stub" || !d.fortunes) return null;
  return { date: d.date, fortunes: d.fortunes };
}

// 実行環境のタイムゾーンに依存せず、日本時間の暦日を返す
export function todayJstParts() {
  const j = new Date(Date.now() + 9 * 3600 * 1000);
  return { y: j.getUTCFullYear(), m: j.getUTCMonth() + 1, d: j.getUTCDate() };
}
