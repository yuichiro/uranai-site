// AIパーソナライズ鑑定文（scripts/generate-fortunes.mjs が public/data に生成）を
// クライアントから読むためのヘルパー。取得失敗時は null を返し、呼び出し側は
// 既存の固定文にフォールバックする。

export interface AiReading {
  intro: string;
  love: string;
  work: string;
  money: string;
  health: string;
  action: string;
}

export async function fetchAiReadings(): Promise<Record<string, AiReading> | null> {
  try {
    const res = await fetch("/data/angel-readings.json", { cache: "force-cache" });
    if (!res.ok) return null;
    const data = await res.json();
    // スタブ（実生成前のプレースホルダ）は使わず、既存の固定文にフォールバックさせる
    if (!data || data.model === "stub" || !data.readings) return null;
    return data.readings as Record<string, AiReading>;
  } catch {
    return null;
  }
}
