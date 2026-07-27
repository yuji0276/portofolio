---
title: "Astro のコンテンツコレクションで frontmatter を型安全にする"
description: "Zod スキーマで frontmatter を検証すると、書き忘れがビルド時に落ちるようになります。"
pubDate: 2026-07-10
tags: ["Astro", "TypeScript"]
---

記事が増えてくると、frontmatter の項目を書き忘れたり、日付の書式がファイルごとにばらついたりします。Astro のコンテンツコレクションは、これをビルド時に検出できます。

## スキーマを定義する

`src/content.config.ts` でコレクションごとにスキーマを書きます。

```ts
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

`z.coerce.date()` を使うと、frontmatter に書いた文字列が `Date` に変換されます。並び替えのたびに `new Date()` する必要がなくなります。

## 効いてくるところ

`title` を書き忘れたままビルドすると、その場でエラーになります。公開してから気づく、ということがなくなります。

`default([])` を付けておくと、既存の記事に `tags` を後から足すときに、全ファイルを一括修正しなくて済みます。

## 下書きを除外する

`getCollection` の第 2 引数でフィルタできます。

```ts
const posts = await getCollection("blog", ({ data }) => !data.draft);
```

一覧ページと詳細ページの `getStaticPaths` の両方で同じフィルタをかけるのを忘れないようにします。片方だけだと、一覧に出ないだけで URL を直接叩けば読めてしまいます。

<!-- TODO: 実際の記事に書き換える -->
