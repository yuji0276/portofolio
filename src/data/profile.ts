// 自己紹介ページの内容。ここを書き換えれば /introduction に反映される。
// TODO: 全項目を実際の経歴・スキルに差し替える。

export const INTRO_LEAD = `始めましてyujiです。
インフラ領域に興味があり、自宅サーバーの運用を行っています。
AIに頼りすぎず自力で実装できるエンジニアを目指しています。`;

export type SkillGroup = {
  category: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  {
    category: "Language",
    items: ["TypeScript", "JavaScript", "Go", "Python", "SQL"],
  },
  {
    category: "Frontend",
    items: ["Astro", "React"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PostgreSQL"],
  },
  {
    category: "Infra / Tools",
    items: ["GCP", "Cloudflare", "Docker", "CI/CD", "Git"],
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  body: string;
};

export const TIMELINE: TimelineEntry[] = [
  {
    period: "2026年3月",
    title: "ハッカソン初出場",
    body: "初めてインフラを触ってインフラの面白さに気づく",
  },
  {
    period: "2025年夏",
    title: "プログラミング再入門",
    body: "時間ができたため再挑戦する。選んだ言語はPython",
  },
  {
    period: "2024年4月",
    title: "大阪公立大学 理学部 数学科に入学",
    body: "数学者になりたくて入学",
  },
  {
    period: "2020年夏",
    title: "初めてプログラミングする",
    body: "実家の共用PCにRubyを入れる。Railsの環境構築ができなくて挫折する",
  },
];

export type ValueItem = {
  heading: string;
  body: string;
};

export const VALUES: ValueItem[] = [
  {
    heading: "動くものを早く出す",
    body: "完璧な設計を待つより、小さく動かして確かめる方が学びが早い。まず動かして、そこから直していく進め方をとっています。",
  },
  {
    heading: "理由を残す",
    body: "なぜその技術を選んだのか、なぜその設計にしたのかを言語化して残すようにしています。記事を書いているのもその延長です。",
  },
  {
    heading: "運用まで考える",
    body: "つくって終わりではなく、動かし続けられるかまで含めて考えます。CI/CD やログの整備も最初から手を入れます。",
  },
];
