import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

/** 記事: src/content/blog/*.md(x) */
const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		/** 一覧ページの絞り込みに使うタグ */
		tags: z.array(z.string()).default([]),
		/** 下書きは一覧・詳細ともに出力しない */
		draft: z.boolean().default(false),
	}),
});

/** 制作物: src/content/products/*.md(x) */
const products = defineCollection({
	loader: glob({ base: "./src/content/products", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		/** 一覧カードに出す一行説明 */
		description: z.string(),
		/** 制作時期。表示にも並び替えにも使う */
		date: z.coerce.date(),
		/** 使用技術。一覧のフィルタとしても機能する */
		stack: z.array(z.string()).default([]),
		/** リポジトリURL(非公開なら省略可) */
		github: z.string().url().optional(),
		/** 公開中のサービスURL */
		demo: z.string().url().optional(),
		/** 「個人開発」「チーム開発 / 4名」など */
		role: z.string().optional(),
		/** 一覧での並び順。小さいほど先頭 */
		order: z.number().default(100),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, products };
