export interface AngelNumber {
  number: string;
  title: string;
  message: string;
  love: string;
  work: string;
  color: string;
}

export const ANGEL_NUMBERS: AngelNumber[] = [
  { number: "111", title: "新しい始まりのサイン", message: "あなたの思考が現実化しやすい時期です。ポジティブな思考を持ち続けてください。宇宙があなたの願いに耳を傾けています。", love: "新しい出会いのチャンス。気になる人に積極的に話しかけて。", work: "新しいプロジェクトや挑戦を始める絶好のタイミング。", color: "from-yellow-400 to-orange-400" },
  { number: "222", title: "信頼とバランスのサイン", message: "今は種まきの時期。すぐに結果が見えなくても、焦らずに続けることが大切です。", love: "パートナーシップに注目。信頼関係を深める時。", work: "チームワークが成功のカギ。周囲と協力して。", color: "from-pink-400 to-rose-400" },
  { number: "333", title: "成長と表現のサイン", message: "あなたの創造性と表現力が輝いています。自分の才能を世界に見せる時が来ました。", love: "自分らしさを大切に。ありのままの自分で愛を引き寄せて。", work: "クリエイティブな仕事や発信が吉。アイデアを形に。", color: "from-purple-400 to-violet-400" },
  { number: "444", title: "安定と保護のサイン", message: "天使があなたのそばで見守っています。安心して前に進んでください。", love: "安定した関係を築く好機。誠実さが愛を育む。", work: "地道な努力が実る時。基盤づくりを怠らずに。", color: "from-blue-400 to-indigo-400" },
  { number: "555", title: "変化と転換のサイン", message: "大きな変化が訪れます。変化を恐れず、新しい流れに乗りましょう。", love: "恋愛に大きな転機。新展開を楽しんで。", work: "転職・独立・新事業など変化を前向きに受け入れて。", color: "from-green-400 to-teal-400" },
  { number: "666", title: "バランスと内省のサイン", message: "物質的なことより精神的なバランスを整える時。自分の内側に目を向けて。", love: "相手の気持ちに寄り添うことで絆が深まる。", work: "焦りを手放し、じっくりと取り組むことで道が開ける。", color: "from-emerald-400 to-cyan-400" },
  { number: "777", title: "幸運と達成のサイン", message: "宇宙からの最高の祝福。あなたは正しい道を歩んでいます。幸運が連鎖します。", love: "運命的な出会いや深まり。スピリチュアルな繋がりも。", work: "努力が認められ、大きな成果が得られる予兆。", color: "from-amber-400 to-yellow-400" },
  { number: "888", title: "豊かさと無限のサイン", message: "金銭的・物質的な豊かさが流れ込んできます。感謝の気持ちで受け取って。", love: "愛が豊かに満ち溢れる。与え、受け取るバランスを大切に。", work: "収入アップや昇進のサイン。積極的に行動を。", color: "from-gold-400 to-yellow-500" },
  { number: "999", title: "完了と解放のサイン", message: "一つの章が終わりを迎えます。手放すことで新たな可能性が開きます。", love: "過去の縁が完結し、新しい愛へ向かう転換点。", work: "長期プロジェクトの完成、または新たな使命へのシフト。", color: "from-violet-400 to-purple-500" },
  { number: "1111", title: "覚醒と願望実現のサイン", message: "意識の扉が開いています。強く願ったことが現実になりやすい特別な瞬間。", love: "ツインフレームや魂の伴侶との出会いのサイン。", work: "天職や使命に気づく転機。直感に従って動いて。", color: "from-rose-400 to-pink-500" },
  { number: "1212", title: "前進と覚醒のサイン", message: "人生の目的に向かって前進する時。過去のパターンを手放し、新しい自分へ。", love: "お互いを高め合えるパートナーとの縁が深まる。", work: "リーダーシップを発揮する場面。自信を持って。", color: "from-cyan-400 to-blue-500" },
  { number: "2222", title: "調和と信念のサイン", message: "信じ続けることが大切。もうすぐ努力が報われます。バランスを保って。", love: "穏やかで深い愛情関係が育まれる時期。", work: "長期的な視点で物事を進めることで安定が得られる。", color: "from-teal-400 to-green-500" },
];

export function findAngelNumber(query: string): AngelNumber | undefined {
  return ANGEL_NUMBERS.find((a) => a.number === query.trim());
}
