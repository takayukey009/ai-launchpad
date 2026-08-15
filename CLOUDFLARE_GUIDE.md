# 🌐 Cloudflareで自作AIサービスを1ドメインに集約・コマンド一発デプロイする完全ガイド

AIで作成したWebツール・スライド・ゲーム・LPなどを、**「自分専用の1ドメイン配下でサブドメインとして量産＆コマンド1発で公開」**するための手順書です。

Cloudflareを利用することで、**ドメイン原価のみ・サーバー代/SSL証明書代/帯域幅すべて無料（0円）**で運用できます。

---

## 🚀 全体アーキテクチャ

```
[ あなたの独自ドメイン (例: yourdomain.dev) ]
  ├── hub.yourdomain.dev (またはルート) -> このAIポータルサイト (AI Creations Hub)
  ├── diff-lab.yourdomain.dev           -> LLM出力比較ツール
  ├── spark-deck.yourdomain.dev         -> HTMLスライド
  ├── cyber-rogue.yourdomain.dev        -> ブラウザゲーム
  └── cost-sim.yourdomain.dev           -> API料金シミュレータ
```

---

## 1. 独自ドメインの取得（Cloudflare Registrar）

1. [Cloudflare](https://dash.cloudflare.com/) にログイン（無料アカウント作成）。
2. 左メニュー **「Domain Registration」 > 「Register Domains」** を開く。
3. 好きなドメイン名（例: `takaya-lab.dev`, `my-studio.xyz` 等）を検索して購入。
   - ※ Cloudflare Registrarは仲介マージンゼロ（原価提供）のため、世界最安クラスで取得・更新できます。

---

## 2. このポータルサイト（Hub）のデプロイ

### 初回のみ：Cloudflareにログイン
```bash
npx wrangler login
```
※ ブラウザが開くので「許可」をクリックするだけです。

### コマンド一発デプロイ
```bash
cd ai-creations-hub
npm run deploy
```
ビルドが走り、自動的にCloudflare Pagesへアップロードされます。

---

## 3. サブドメインの紐付け（30秒）

1. Cloudflareダッシュボード > **Workers & Pages** を開く。
2. デプロイされたプロジェクト（`ai-creations-hub`）をクリック。
3. **Custom domains（カスタムドメイン）** タブ > **「Set up a custom domain」** をクリック。
4. 割り当てたいドメインを入力（例: `hub.yourdomain.dev` または `yourdomain.dev`）。
5. 「Continue」を押せば、**DNSレコードとSSL証明書が完全自動で生成**されます。

---

## 4. 新しいAIサービスを作ったときの最短運用フロー

AIで新しいツールやゲーム、スライドを作ったときは、以下の3ステップで完了します：

1. **サービスをビルドしてPagesにデプロイ**:
   ```bash
   npx wrangler pages deploy dist --project-name=my-new-tool
   ```
2. **Cloudflare Pagesの「Custom domains」でサブドメインを登録**:
   - 例: `my-new-tool.yourdomain.dev`
3. **このポータル（AI Creations Hub）で「+ 新規サービス登録」をクリックして追加！**
   - タイトル・URL・タグを入力して登録すれば、ポータルからいつでも1クリックで起動できます。
