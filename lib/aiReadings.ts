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
    // 日付をクエリに付けて「その日のうちはキャッシュ・日が変われば最新取得」にする
    // （生成物を更新しても古い版が居座らないようにするため）
    const day = new Date().toISOString().slice(0, 10);
    const res = await fetch(`/data/angel-readings.json?d=${day}`, { cache: "force-cache" });
    if (!res.ok) return null;
    const data = await res.json();
    // スタブ（実生成前のプレースホルダ）は使わず、既存の固定文にフォールバックさせる
    if (!data || data.model === "stub" || !data.readings) return null;
    return data.readings as Record<string, AiReading>;
  } catch {
    return null;
  }
}
