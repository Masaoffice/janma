# JANMA - 麻雀マッチング（デモサイト）

仕様書（`mahjong_matching_app_spec.md`）に基づく、麻雀マッチングWebサービスの **デモサイト** です。

⚠️ **デモ用途・UIプロトタイプであり、実際の課金・本人確認・チャット等の機能は実装されていません。**

---

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- 静的エクスポート（`output: 'export'`）→ GitHub Pages / Vercel / Netlify 等で配信可能

---

## ローカルで動かす

```bash
# 1. 依存パッケージのインストール
npm install

# 2. 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:3000 を開くとデモサイトが表示されます。

---

## ページ構成

| URL | 内容 |
|-----|------|
| `/` | トップページ（LP） |
| `/about` | サービスについて |
| `/threads` | スレッド一覧 |
| `/threads/[id]` | スレッド詳細・返信 |
| `/profile/[id]` | プロフィール |
| `/signup/student` | 学生登録（モック） |
| `/signup/pro` | 社会人登録（モック） |
| `/login` | ログイン（モック） |

---

## サンプルデータの差し替え

### 写真

1. 画像ファイルを `public/images/` に配置
2. `data/users.ts` の `photo` フィールドにパスを記入（例: `photo: '/images/user1.jpg'`）
3. 空文字 `''` のままだと、グレーのプレースホルダーアバターが表示されます

詳細は `public/images/README.md` を参照してください。

### プロフィール文・投稿文

- ユーザー: `data/users.ts` の `bio` 等を編集
- スレッド: `data/threads.ts` の `title` `body` を編集

---

## ビルドとデプロイ

### ビルド

```bash
npm run build
```

`out/` フォルダに静的HTMLが出力されます。

### GitHub Pages にデプロイ

#### 方法1: 手動アップロード（一番ラク）

1. GitHubで新規リポジトリを作成（例: `janma`）
2. このプロジェクト全体をコミットしてpush
3. GitHub Actionsで自動デプロイするには以下のワークフローを追加（`.github/workflows/deploy.yml`）:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. GitHubリポジトリの Settings → Pages → Source を「GitHub Actions」に設定

#### Project Page で公開する場合の追加設定

`https://username.github.io/janma/` の形式で公開する場合、`next.config.js` の以下のコメントを外してください:

```js
basePath: '/janma',
assetPrefix: '/janma/',
```

（`janma` の部分はあなたのリポジトリ名に置き換えてください）

### Vercel にデプロイ（より簡単）

1. https://vercel.com にGitHubアカウントでログイン
2. 「Add New Project」→ このリポジトリを選択
3. そのままDeploy（特に設定不要）

`https://janma-xxx.vercel.app` のようなURLが発行されます。

---

## 注意事項

このサイトはデモ目的のUIプロトタイプです。本番環境で運用する場合は、以下が別途必要です:

- バックエンドAPI（ユーザー管理・チャット・スレッド永続化）
- データベース（PostgreSQL等）
- 認証システム（Auth0 / Clerk / Firebase Auth等）
- 決済システム（Stripe）
- eKYCサービス（TRUSTDOCK等）
- ファイルストレージ（S3 / R2）
- インターネット異性紹介事業の届出（必須）
- 利用規約・プライバシーポリシーの作成（弁護士監修推奨）
- 通報フォーム・運営体制の整備
