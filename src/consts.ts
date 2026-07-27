// サイト全体で使う定数。プロフィールやSNSリンクはここを書き換えれば全ページに反映される。

export const SITE_TITLE = "yuji";
export const SITE_DESCRIPTION =
	"yuji のポートフォリオ。制作物、技術記事、経歴をまとめています。";

/** 自己紹介・フッター・ランディングで共通利用するプロフィール */
export const PROFILE = {
	name: "yuji",
	// TODO: 実際の肩書きに差し替える
	role: "Web アプリケーションエンジニア",
	// ランディングのリード文
	tagline:
		"つくって、動かして、直す。その一周を自分の手で回せることを大事にしています。Web アプリケーションを中心に、設計から運用まで一通り触りながら開発しています。",
	location: "Japan",
	// TODO: 公開してよいアドレスに差し替える
	email: "yujikami0110@gmail.com",
} as const;

// TODO: 実際のアカウントURLに差し替える
export const SOCIAL_LINKS = [
	{ label: "GitHub", href: "https://github.com/yuji0276" },
	{ label: "X", href: "https://x.com/" },
] as const;

export const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/products", label: "Products" },
	{ href: "/blogs", label: "Blog" },
	{ href: "/introduction", label: "About" },
] as const;
