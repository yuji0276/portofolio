# portfolio

yuji のポートフォリオサイト。Astro で構築し、Cloudflare Workers に静的サイトとして配信している。
仕様は [design.md](./design.md) を参照。

## 画面

| パス                  | 内容                                             |
| :-------------------- | :----------------------------------------------- |
| `/`                   | ランディング(制作物・記事の抜粋と連絡先)       |
| `/products`           | 制作物一覧(GitHub / 紹介ページへのリンク付き)  |
| `/products/<slug>`    | 制作物の紹介ページ                               |
| `/blogs`              | 記事一覧(タグで絞り込み可能)                  |
| `/blogs/<slug>`       | 記事本文                                         |
| `/introduction`       | 自己紹介                                         |
| `/rss.xml`            | RSS フィード                                     |

バックエンドは持たない。コンテンツはすべてリポジトリ内の Markdown と TypeScript で管理している。

## コマンド

| コマンド        | 内容                                              |
| :-------------- | :------------------------------------------------ |
| `npm install`   | 依存関係をインストール                            |
| `npm run dev`   | 開発サーバーを `localhost:4321` で起動            |
| `npm run build` | `./dist/` に本番ビルド                            |
| `npm run check` | ビルド + 型チェック + wrangler の設定検証         |
| `npm run preview` | ビルドして Workers ランタイムでローカル確認      |
| `npm run deploy`  | 手動デプロイ(通常は CI に任せる)              |

## コンテンツの追加

### 記事

`src/content/blog/` に Markdown を追加する。frontmatter は `src/content.config.ts` の
スキーマで検証されるので、必須項目が欠けているとビルドが失敗する。

```yaml
---
title: "記事タイトル"
description: "一覧とOGPに出る一行説明"
pubDate: 2026-07-01
tags: ["Astro", "TypeScript"] # 一覧の絞り込みに使われる
draft: false # true の間は公開されない
---
```

### 制作物

`src/content/products/` に Markdown を追加する。`src/content/products/sample-web-app.md`
がテンプレートになっている(`draft: true` なので公開されない)。

```yaml
---
title: "プロダクト名"
description: "一覧カードに出る一行説明"
date: 2026-04-01
stack: ["TypeScript", "React"]
github: "https://github.com/..." # 省略可
demo: "https://..." # 省略可
role: "個人開発"
order: 1 # 小さいほど一覧の先頭に出る
---
```

### プロフィール

- 名前・肩書き・SNS リンク: `src/consts.ts`
- 自己紹介ページのスキル / 経歴 / 価値観: `src/data/profile.ts`

## デザイン

配色とフォントは `src/styles/global.css` の `:root` にトークンとしてまとめてある。

| トークン     | 値        | 用途                        |
| :----------- | :-------- | :-------------------------- |
| 白           | `#FFFFFF` | 背景                        |
| チャコール黒 | `#4A4A4A` | 本文・見出し                |
| クールグレー | `#CBCBCB` | 罫線・タグの枠              |
| ブルーグレー | `#6D8196` | アクセント(リンク・ボタン) |

カード等の面には、クールグレーを薄めた寒色グレー(`--surface: #F8F9FA` /
`--surface-sunken: #F1F3F5`)を使う。design.md のソフトアイボリー `#FFFFE3` は
背景が白のため面には使っていない。

フォントは Google Fonts から読み込んでいる(見出し: Space Grotesk / 本文: Inter /
コード: JetBrains Mono)。日本語はシステムフォントにフォールバックする。

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が動き、ビルドして Cloudflare Workers に
公開される。Pull Request では `ci.yml` がビルドと型チェックだけを回す。

初回だけ、GitHub リポジトリの **Settings → Secrets and variables → Actions** に以下を登録する。

| Secret                  | 取得元                                                              |
| :---------------------- | :------------------------------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare ダッシュボード → My Profile → API Tokens → **Edit Cloudflare Workers** テンプレート |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare ダッシュボードの Workers & Pages 画面の右側に表示される  |

デプロイ先の Worker 名は `wrangler.json` の `name`、公開 URL は `astro.config.mjs` の
`site` で設定する。独自ドメインを割り当てたら `site` を必ず書き換える(canonical URL、
sitemap、RSS のリンクに使われる)。
