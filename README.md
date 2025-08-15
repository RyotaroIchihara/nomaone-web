了解です。現状の体制を“明日から迷わないための実務メモ”としてまとめます。

# 開発・デプロイ体制サマリー（nomaone-web）

## 全体像

* **開発場所**：Windows 11 の VS Code（Dev Containers 拡張）
  ↳ **WSL2 Ubuntu 上の開発コンテナ**で作業
  ↳ **作業ディレクトリ**：`/workspaces/hello-devcontainer/nomaone-web`（バインドマウント＝コンテナ終了でも消えない）
* **リポジトリ**：`https://github.com/RyotaroIchihara/nomaone-web`（Public）
* **CI/CD**：GitHub Actions → GitHub Pages 自動公開
  ↳ `main` に push すると **Actions が build** → `dist/` が **Pages に反映**
  ↳ 公開URL：`https://<GitHubユーザー名>.github.io/nomaone-web/`（※`astro.config.mjs` の `base` が `/nomaone-web/` になっていること）

---

## 毎回の開発手順（スタート〜終了）

1. **VS Code を開く → Dev Container へ入る**

* VS Code: 「**Remote Explorer**」または「**Dev Containers: Reopen in Container**」
* ワークスペースが `/workspaces/hello-devcontainer/nomaone-web` になっていることを確認

2. **依存関係 & 開発サーバ**

```bash
pnpm install
pnpm pnpm run dev --host --port 43223     # 開発サーバ（ポートはプロジェクト設定に合わせる）
```

3. **作業 → コミット → push**

```bash
git add -A
git commit -m "feat: 変更内容メモ"
git push origin main
```

→ push されると **自動で Actions が走る**（build → Pages 反映）

4. **公開確認**

* GitHub → **Actions** タブでワークフロー成功を確認
* GitHub → **Settings → Pages** で公開URLを確認
* ブラウザで `https://<GitHubユーザー名>.github.io/nomaone-web/` を開く

---

## 一度きりの設定（すでに完了していればOK）

* **astro.config.mjs**

  * `site: 'https://<GitHubユーザー名>.github.io'`
  * `base: '/nomaone-web/'`
  * `trailingSlash: 'always'`（任意だが相対リンクが安定）

* **GitHub Actions ワークフロー**（`.github/workflows/deploy.yml`）

  * Node 20 / pnpm で `pnpm run build` → `dist` を Pages へデプロイ
  * リポジトリ **Settings → Pages** の **Source = GitHub Actions** に設定

* **Git ユーザー情報**（未設定なら）

```bash
git config --global user.name "RyotaroIchihara"
git config --global user.email "<GitHubのメール or noreply>"
```

---

## よくあるハマり & 回避

* **`base` 設定忘れ**：CSSや画像が 404 になりやすい。`/nomaone-web/` を必ず設定。
* **コンテナ内の `/root/...` に保存**：コンテナ削除で消える恐れ。**必ず `/workspaces/...`** を使う。
* **ポートが開かない**：Dev Container の `forwardPorts`、VS Code のポート転送を確認。
* **巨大プロジェクトのバックアップ**：`git push` が基本。ローカルへ退避が必要なら `tar` で固めて `/mnt/c/...` へ。

---

## 新規端末/再セットアップ時の最短フロー

1. VS Code + Dev Containers を用意（WSL2 Ubuntu & Docker 準備）
2. 開発コンテナでワークスペースを作成し、**GitHub から clone**：

   ```bash
   cd /workspaces/hello-devcontainer
   git clone https://github.com/RyotaroIchihara/nomaone-web.git
   cd nomaone-web
   pnpm install
   pnpm pnpm run dev --host --port 43223
   ```
3. 以降は通常どおり `git add/commit/push` で **自動デプロイ**。

---

## 運用ミニTips

* 画像/リンクはルート絶対（`/img/...`）より **相対パス** か `new URL('./img', import.meta.url)` が安全。
* `node_modules` や `dist` は `.gitignore` で除外済みにする。
* 変更が大きいときは **Draft PR → Merge** で、Actions の実行を可視化しつつ運用できる。

---

この形なら、**VS Code でコードを書く → push** だけで、**自動で公開**まで進みます。
何か詰まったら、Actions のログか `astro.config.mjs` の `base` をまず疑う、が合言葉です。
