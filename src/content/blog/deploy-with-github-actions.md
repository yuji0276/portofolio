---
title: "GitHub Actions で Cloudflare Workers に自動デプロイする"
description: "main への push でビルドとデプロイが走るようにするまでの設定と、つまずいた点。"
pubDate: 2026-07-18
tags: ["Cloudflare", "CI/CD", "GitHub Actions"]
---

手元から `wrangler deploy` を叩く運用をやめて、main への push で自動デプロイされるようにしました。

## ワークフロー

`.github/workflows/deploy.yml` に置きます。やることはビルドしてデプロイするだけです。

```yaml
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

## API トークンの権限

Cloudflare のダッシュボードでトークンを発行するとき、テンプレートの **Edit Cloudflare Workers** を使うのが早いです。権限を絞りすぎると、アセットのアップロードで失敗します。

発行したトークンはリポジトリの Settings → Secrets and variables → Actions に `CLOUDFLARE_API_TOKEN` として登録します。トークンをリポジトリに直接書かないよう気をつけます。

## つまずいたところ

最初、`npm install` を使っていて、ローカルと CI で依存のバージョンがずれてビルドが通らないことがありました。CI では `npm ci` を使って lockfile 通りに入れるのが確実です。

また、Pull Request でもデプロイが走らないよう、トリガーは `push` の main ブランチだけに絞っています。PR では型チェックとビルドだけを回しています。

<!-- TODO: 実際の記事に書き換える -->
