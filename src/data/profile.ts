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
    period: "2024 — 現在",
    title: "個人開発 / CLIツール",
    body: "普段の生活で困ったことを題材に、小さなアプリを設計から公開まで一人でつくっています。つくったものは制作物ページにまとめています。",
  },
  {
    period: "2023 — 2024",
    title: "プログラミング学習",
    body: "Web の基礎から始めて、実際に動くものを公開するところまでを繰り返しました。学んだことは記事として残しています。",
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
