// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	// canonical URL / sitemap / RSS に使われる。Worker には
	// portofolio.yujikami0110.workers.dev でもアクセスできるが、
	// 正規URLはカスタムドメインの方に統一する。
	site: "https://yuji0276.dev",
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
