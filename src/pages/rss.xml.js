import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

// ビルド時に生成する(Worker 側で動的に組み立てる必要がない)
export const prerender = true;

export async function GET(context) {
	const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			link: `/blogs/${post.id}/`,
		})),
	});
}
