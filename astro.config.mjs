// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	// TODO: 独自ドメインを設定したら差し替える(canonical URL / sitemap / RSS に使われる)
	site: "https://portofolio.yuji0276.workers.dev",
	integrations: [mdx(), sitemap()],
	markdown: {
		// 既定の暗いテーマだとアイボリー背景から浮くので明るいテーマにする。
		// 背景色は global.css 側でパレットに合わせて上書きしている。
		shikiConfig: {
			theme: "github-light",
		},
	},
	// design.md に書かれた綴り(/producs, /introdution)と、
	// スターターの旧URLからの受け皿。dist/_redirects として 301 が出力される。
	redirects: {
		"/producs": "/products",
		"/introdution": "/introduction",
		"/blog": "/blogs",
		"/about": "/introduction",
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
